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
import { Polyline } from "react-google-maps";
import PipeApi from "../../api/PipeApi";
import { Pipe } from "../../api/model/Pipe";
import VodostajApi from "../../api/VodostajApi";
import { Vodostaj } from "../../api/model/Vodostaj";

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
        {props.isMarkerShown && <Marker position={{ lat: 43.8407031, lng: 18.3337828}} icon={{url: iconURL}} />}
        {/*props.isMarkerShown && <Marker position={{ lat: 43.8507051, lng: 18.3337878}} icon={{url: iconURL}} />*/}

        {props.pipes}
        {props.vodostaji}
    </GoogleMap>
));

class Dashboard extends Component {
  selectedPipe = null;
  selectedVodostaj = null;

  pipeClick(pipe) {
      console.log(pipe);
      this.selectedPipe = this.pipes[this.pipes.findIndex((val, i) => { console.log(val); return val.key === pipe; })];

      this.forceUpdate();
  }
  vodostajClick(vodostaj) {
      console.log(vodostaj);
    this.selectedVodostaj = this.vodostaji[this.vodostaji.findIndex((val, i) => { return val.key === vodostaj; })];
    console.log(this.selectedVodostaj);
    this.forceUpdate();
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

  pipes = [];
  vodostaji = [];


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

    this.crtajCijevi();

    VodostajApi.GetVodostaji().subscribe(
        vals => {

           // console.log(vals);
            this.vodostaji = [];
            for ( let vodostaj of vals ) {
                var vodostajOptions = null;
                vodostajOptions = this.workInProgressPipeStyleOptions;

                this.vodostaji.push(
                    /*<Marker
                    key={vodostaj._id}
                    vodostajObj={vodostaj}
                    path={pathCoordinates}
                    options={vodostajOptions}
                    onClick={(event) => this.vodostajClick(vodostaj._id)}
                    />);*/
                <Polyline
                    key={vodostaj._id}
                    vodostajObj={vodostaj}
                    path={pathCoordinates}
                    options={vodostajOptions}
                    onClick={(event) => this.vodostajClick(vodostaj._id)}
                />);
            }
            console.log(this.vodostaji);
            
            this.forceUpdate();
        }
    );

   
  }

  crtajCijevi(){
    PipeApi.GetPipes().subscribe(
        vals => {
           // console.log(vals);
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
            console.log(this.pipes);
            this.forceUpdate();
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
            console.log(vals);
            console.log("ovdje");
            this.crtajCijevi();
        });
   
  }

  dodavanje(i){
     // var id = this.selectedVodostaj.props.vodostajObj._id;
      var value = document.getElementById("vodostajValue").value;
      var created_by = this.selectedVodostaj.props.vodostajObj.created_by;
      var lat = this.selectedVodostaj.props.vodostajObj.lat;
      var lng = this.selectedVodostaj.props.vodostajObj.lng;
     // console.log(JSON.stringify (this.selectedVodostaj) +" kak "+ id +" kaaako");
    var ajax = new XMLHttpRequest();
     ajax.onreadystatechange = function() {// Anonimna funkcija
           if (ajax.readyState == 4 && ajax.status == 200)
               console.log("Uspjesno dodavanje vodostaja");
               
           else if (ajax.readyState == 4)
           console.log(ajax.status,ajax.responseText);
        };
       ajax.open("POST","http://localhost:8080/api/vodostaji",true);
       ajax.setRequestHeader("Content-Type", "application/json");
       ajax.send(JSON.stringify({
          value,
          created_by,
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
                      Vodostaj - {this.selectedVodostaj.props.vodostajObj._id}
                  </CardHeader>
                  <CardBody>
                      <FormGroup>
                          <Label htmlFor="vodostajVisina">Visina vodostaja</Label>
                          <Input type="number" id="vodostajValue" />
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
                          <Button onClick={this.dodavanje}>Dodaj podatke o vodostaju</Button>
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
                            <Col xs ="4">
                                <Button>1</Button>
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
