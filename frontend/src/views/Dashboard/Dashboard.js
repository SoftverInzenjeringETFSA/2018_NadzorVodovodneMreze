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

const vikMapStyle = require("./vikMapStyle.json");



const MainMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 43.843151, lng: 18.339907 }}
        defaultOptions={{ styles: vikMapStyle }}
        disableDefaultUI={true}
    >
        {props.isMarkerShown && <Marker position={{ lat: 43.8407031, lng: 18.3337828 }} />}

        {props.pipes}
    </GoogleMap>
));

class Dashboard extends Component {
  selectedPipe = null;

  pipeClick(pipe) {
      this.selectedPipe = this.pipes[this.pipes.findIndex((val, i) => { return val.key === pipe; })];

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


  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.oznaciRad = this.oznaciRad.bind(this);
    this.crtajCijevi = this.crtajCijevi.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };

   this.crtajCijevi();
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
            console.log(this.selectedPipe);
            this.crtajCijevi();
        });
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
                      <MainMapComponent isMarkerShown={false}
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFMi8xu6sTPt579TzweGFVX4Dlu2hE4n8&v=3.exp&libraries=geometry,drawing,places"

                                        pipes={this.pipes}
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `400px` }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                      >
                      </MainMapComponent>
                  </CardBody>
              </Card>
            </Col>
          </Row>

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
