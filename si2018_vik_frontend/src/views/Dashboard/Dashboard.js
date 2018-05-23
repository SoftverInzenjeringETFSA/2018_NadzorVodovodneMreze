import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    FormGroup,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Table, Input, Label,
} from 'reactstrap';


import Widget02 from '../../views/Widgets/Widget02'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Polyline, Circle } from "react-google-maps";
import PipeApi from "../../api/PipeApi";
import { Pipe } from "../../api/model/Pipe";
import VodostajApi from "../../api/VodostajApi";
import { Vodostaj } from "../../api/model/Vodostaj";
import SectionApi from '../../api/SectiionApi';
import SectiionApi from '../../api/SectiionApi';

const vikMapStyle = require("./vikMapStyle.json");

var iconURL = require("../../rezervoar.jpg");
//var markers = [];
const pathCoordinates=[ 
    {lat:43.8405067, lng:18.3337751}, 
    {lat:43.8409089,lng: 18.3337829}, 
    

  ]

const MainMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 43.843151, lng: 18.339907 }}
        defaultOptions={{ styles: vikMapStyle }}
        disableDefaultUI={true}
    >
        {/*props.isMarkerShown && <Marker position={{ lat: 43.8407031, lng: 18.3337828}} icon={{url: iconURL}} />*/}
        {/*props.isMarkerShown && <Marker position={{ lat: 43.8507051, lng: 18.3337878}} icon={{url: iconURL}} />*/}

        {props.pipes}
        {props.vodostaji}
        {props.circle}
        {props.ikona}
    </GoogleMap>
));

class Dashboard extends Component {
  selectedPipe = null;
  selectedVodostaj = null;
  selectedSection = null;

  pipeClick(pipe) {
    
      this.selectedPipe = this.pipes[this.pipes.findIndex((val, i) => {  return val.key === pipe; })];

      this.forceUpdate();
  }
  vodostajClick(vodostaj) {
      console.log(vodostaj);
    this.selectedVodostaj = this.vodostaji[this.vodostaji.findIndex((val, i) => { return val.key === vodostaj; })];
    console.log(this.selectedVodostaj);
    this.forceUpdate();
}
  sectionClick(section) {
    console.log("TUU");
    this.selectedSection = this.krugovi[this.krugovi.findIndex((val, i) => {  return val.key === section; })];
    console.log(this.selectedSection);
    var active = null;
      if(this.selectedSection.props.options.fillColor === "#add8e6")
        active = true;
      else
        active = false;

      SectiionApi.PatchSectionById(section,active).subscribe(
          vals => {
              console.log("opet crtam");
            this.crtajKrugove();
          }
      );
    
}

    pipeStyleOptions = {
    strokeColor: '#00eeff',
    strokeWeight: 10,
    geodesic: true
    };

    brokenPipeStyleOptions = {
    strokeColor: '#ff0000',
    strokeWeight: 10,
    geodesic: true
    }

    workInProgressPipeStyleOptions = {
    strokeColor: '#ffff00',
    strokeWeight: 10,
    geodesic: true
    }

    circleOptions={	
        strokeColor: '#add8e6',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#add8e6',
        fillOpacity: 0.65,
    }

    notActiveCircleOptions={	
        strokeColor: '#888888',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#888888',
        fillOpacity: 0.65,
    }

    pipes = [];
    vodostaji = [];
    krugovi = [];
    citymap=[];
    marker=[];
  ikone=[];

    constructor(props) {
    super(props);

  
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.oznaciRad = this.oznaciRad.bind(this);
    this.dodavanje = this.dodavanje.bind(this);
    this.crtajCijevi = this.crtajCijevi.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };

    this.citymap = {
           nedzarici: {
             center: {lat: 43.8361844, lng: 18.33682090000002},
             population: 27
           },
           halilovici: {
             center: {lat: 43.8482425, lng: 18.33485589999998},
             population: 20
           },
           alipasinopolje: {
             center: {lat: 43.8436494, lng: 18.348418000000038},
             population: 25
           },
           otoka: {
             center: {lat: 43.84850350000001, lng: 18.36161029999994},
             population: 60
           }
         };

         this.marker = {
            nedzarici: {
              center: {lat: 43.8361844, lng: 18.33682090000002}
             
            },
            halilovici: {
              center: {lat: 43.8482425, lng: 18.33485589999998}
              
            },
            alipasinopolje: {
              center: {lat: 43.8436494, lng: 18.348418000000038}
              
            },
            otoka: {
              center: {lat: 43.84850350000001, lng: 18.36161029999994}
              }
          };
          this.crtajKrugove();
    this.crtajCijevi();
    this.crtajRezervoare();
    



   
  }

  crtajRezervoare(){
    VodostajApi.GetVodostaji().subscribe(
        vals => {

           // console.log(vals);
            this.vodostaji = [];
            for ( let vodostaj of vals ) {
                var vodostajOptions = null;
                vodostajOptions = this.workInProgressPipeStyleOptions;
                //this.vodostaji.push(vodostaj);

                this.vodostaji.push(
                    <Marker
                    key={vodostaj._id}
                    vodostajObj={vodostaj}
                   // path={pathCoordinates}
                   options={{ icon: iconURL}}
                   position={{lat: vodostaj.lat, lng: vodostaj.lng}}
                   onClick={(event) => this.vodostajClick(vodostaj._id)}
                    />);
                /*<Polyline
                    key={vodostaj._id}
                    vodostajObj={vodostaj}
                    path={pathCoordinates}
                    options={vodostajOptions}
                    onClick={(event) => this.vodostajClick(vodostaj._id)}
                />);*/
            }
            console.log(this.vodostaji);
            
            this.forceUpdate();
        }
    );
  }

  crtajCijevi(){
    PipeApi.GetPipes().subscribe(
        vals => {
           console.log(vals);
            this.pipes = [];
            for ( let pipe of vals ) {
                var pipeOptions = null;
                if(pipe.hasOwnProperty("status") && pipe.status==="critical")
                    pipeOptions=this.brokenPipeStyleOptions;
                else if(pipe.hasOwnProperty("status") && pipe.status==="workInProgress")
                    pipeOptions=this.workInProgressPipeStyleOptions;
                else
                pipeOptions=this.pipeStyleOptions;

                this.pipes.push(
                <Polyline
                    key={pipe.name}
                    pipeObj={pipe}
                    path={[
                        {lat: pipe.start_lat, lng: pipe.start_lng },
                        {lat: pipe.end_lat, lng: pipe.end_lng }
                    ]}
                    options={pipeOptions}
                    onClick={(event) => this.pipeClick(pipe.name)}
                />);
            }
            this.forceUpdate();
        }
    );
  }

  crtajKrugove(){
    	SectiionApi.GetSections().subscribe(
            vals => {
                var circleoptions = null;
                 this.krugovi = [];
                console.log(vals);
                 for ( let city of vals ) {
                    if(city.active === true)
                        circleoptions=this.circleOptions;
                    else
                        circleoptions=this.notActiveCircleOptions;
                  this.krugovi.push(
                      <Circle
                    key={city._id}
                    center={{lat: city.lat,lng: city.lng}}
                    options={circleoptions}
                    radius= {Math.sqrt(city.population) * 100}
                    />);
                    
                    this.ikone.push(
                        <Marker
                       key={city._id}
                       position={{lat: city.lat,lng: city.lng}}
                       options={{ icon: { url: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.15752-9/33216287_1657290641017054_7396686277946376192_n.png?_nc_cat=0&oh=189661427d96a59ab4350f786bb20be8&oe=5B7C2AB6', scale:3 }}}
                       onClick={(event) => this.sectionClick(city._id)}
                      />); 
                }
                console.log(this.krugovi);
                
     
     
      
            }
        );
       
        	
         

        
     }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }
  oznaciRad(e){
    PipeApi.PatchPipeById(this.selectedPipe.props.pipeObj._id,this.selectedPipe.props.pipeObj.status).subscribe(

        vals => {
          this.crtajCijevi();
        });
   
  }

  iskljuciSection(id){
      var active = null;
      if(this.selectedSection.props.options.fillColor === "#add8e6")
        active = true;
      else
        active = false;

      SectiionApi.PatchSectionById(id,active).subscribe(
          vals => {
              console.log("opet crtam");
            this.crtajKrugove();
          }
      );
  }

  dodavanje(i){
      var id = this.selectedVodostaj.props.vodostajObj._id;
      var name = this.selectedVodostaj.props.vodostajObj.name;
      var value = document.getElementById("novaVodostajValue").value;
      var created_by = this.selectedVodostaj.props.vodostajObj.created_by;
      var deleted = this.selectedVodostaj.props.vodostajObj.deleted;
      var lat = this.selectedVodostaj.props.vodostajObj.lat;
      var lng = this.selectedVodostaj.props.vodostajObj.lng;
    var ajax = new XMLHttpRequest();
     ajax.onreadystatechange = function() {// Anonimna funkcija
           if (ajax.readyState == 4 && ajax.status == 200){
               console.log("Uspjesno azuriranje vodostaja");
               alert("Uspjesno azuriranje vodostaja");
              
           }
               
           else if (ajax.readyState == 4)
           console.log(ajax.status,ajax.responseText);
        };
       ajax.open("PUT","http://localhost:8080/api/vodostaji/" +id,true);
       ajax.setRequestHeader("Content-Type", "application/json");
       ajax.send(JSON.stringify({
          name, 
          value,
          created_by,
          deleted,
          lat,
          lng
       })

       );

  }
  

  render() {
    return (
      <div className="animated fadeIn">
          <Row>
              <Col xs="12" sm="6" lg="3">
                  <Widget02 header="250" mainText="Cijevi" footerText="Vidi sve" icon="fa fa-cogs" color="primary" footer link="#/charts" />
              </Col>
              <Col xs="12" sm="6" lg="3">
                  <Widget02 header="30" mainText="Mjerna mjesta" footerText="Vidi sve" icon="fa fa-laptop" color="info" footer />
              </Col>
              <Col xs="12" sm="6" lg="3">
                  <Widget02 header="5" mainText="Kvarovi" footerText="Vidi sve" icon="fa fa-exclamation-triangle" color="danger" footer />
              </Col>
              <Col xs="12" sm="6" lg="3">
                  <Widget02 header="3" mainText="Radovi" footerText="Vidi sve" icon="fa fa-wrench" color="warning" footer />
              </Col>
          </Row>


          <Row>
            <Col md={12}>
              <Card>
                  <CardHeader>
                      Mapa
                  </CardHeader>
                  <CardBody>
                      <MainMapComponent isMarkerShown={true}
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFMi8xu6sTPt579TzweGFVX4Dlu2hE4n8&v=3.exp&libraries=geometry,drawing,places"

                                        pipes={this.pipes}
                                        vodostaji={this.vodostaji}
                                        circle={this.krugovi}
                                        ikona={this.ikone}
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `400px` }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                      >
                      </MainMapComponent>
                  </CardBody>
              </Card>
            </Col>
          </Row>
          {this.selectedVodostaj !== null &&
          <Row>
          <Col md={12}>

              <Card>
                  <CardHeader>
                      Vodostaj - {this.selectedVodostaj.props.vodostajObj.name} <br/>
                      Sifra vodostaja - {this.selectedVodostaj.props.vodostajObj._id}
                  </CardHeader>
                  <CardBody>
                      <FormGroup>
                          <Label htmlFor="vodostajVisina">Trenutna visina vodostaja</Label>
                          <Input type="number" id="vodostajValue" value={this.selectedVodostaj.props.vodostajObj.value} />
                          <Label htmlFor="novaVodostajVisina">Nova visina vodostaja</Label>
                          <Input type="number" id="novaVodostajValue" />
                      </FormGroup>


                      <Label htmlFor="from_pos">Lokacija vodostaja</Label>
                      <FormGroup id="from_pos" row className="my-0">
                          <Col xs="6">
                              <FormGroup>
                                  <Label htmlFor="from_lat">Latitude</Label>
                                  <Input type="text" id="from_lat" value={this.selectedVodostaj.props.vodostajObj.lat}/>
                              </FormGroup>
                          </Col>
                          <Col xs="6">
                              <FormGroup>
                                  <Label htmlFor="from_lng">Longitude</Label>
                                  <Input type="text" id="from_lng" value={this.selectedVodostaj.props.vodostajObj.lng}/>
                              </FormGroup>
                          </Col>
                      </FormGroup>


                      <FormGroup id="buttoni" row className="my-0">
                      <Col xs ="4">
                          <Button onClick={this.dodavanje}>Azuriraj podatke o vodostaju</Button>
                      </Col>
                  </FormGroup>
                  </CardBody>
              </Card>
          </Col>
          </Row>}

          {this.selectedPipe !== null && // kad se klikne na cijev
              <Row>
                <Col md={12}>

                    <Card>
                        <CardHeader>
                            Cijev - {this.selectedPipe.props.pipeObj.name}
                        </CardHeader>
                        <CardBody>
                            <FormGroup>
                                <Label htmlFor="pipeId">Šifra</Label>
                                <Input type="text" id="pipeId" readonly value={this.selectedPipe.props.pipeObj.id} />
                            </FormGroup>


                            <Label htmlFor="from_pos">Početna tačka</Label>
                            <FormGroup id="from_pos" row className="my-0">
                                <Col xs="6">
                                    <FormGroup>
                                        <Label htmlFor="from_lat">Latitude</Label>
                                        <Input type="text" id="from_lat" value={this.selectedPipe.props.pipeObj.start_lat}/>
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label htmlFor="from_lng">Longitude</Label>
                                        <Input type="text" id="from_lng" value={this.selectedPipe.props.pipeObj.start_lng}/>
                                    </FormGroup>
                                </Col>
                            </FormGroup>


                            <Label htmlFor="to_pos">Krajnja tačka</Label>
                            <FormGroup id="to_pos" row className="my-0">
                                <Col xs="6">
                                    <FormGroup>
                                        <Label htmlFor="to_lat">Latitude</Label>
                                        <Input type="text" id="from_lat" value={this.selectedPipe.props.pipeObj.end_lat}/>
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label htmlFor="to_lng">Longitude</Label>
                                        <Input type="text" id="from_lng" value={this.selectedPipe.props.pipeObj.end_lng}/>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup id="buttoni" row className="my-0">
                            <Col xs ="4">
                                <Button>Dodaj podatke o cijevi</Button>
                            </Col>
                            <Col xs ="4">
                                <Button onClick={this.oznaciRad}>Označi rad</Button>
                            </Col>
                            
                        </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
              </Row>}

      </div>
    );
  }
}

export default Dashboard;
