import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PipeApi from "../../../api/PipeApi";
import moment from 'moment';
import geolib from 'geolib';

class PipesList extends Component {

    constructor(props) {
        super(props);
        this.state = {vals: []};

        PipeApi.GetPipes().subscribe(
            vals => {
                this.setState({vals: vals});
            }
        );
    }

    render() {
        return <div className="animated fadeIn">
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Combined All Table
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Šifra</th>
                                    <th>Naziv cijevi</th>
                                    <th>Duzina</th>
                                    <th>Vrijeme unosa</th>
                                    <th>Trenutni pritisak</th>
                                    <th>Lokacija</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.vals.map((item)=><tr>
                                            <td>{item._id}</td>
                                            <td>{item.pipe_detail_id}</td>
                                            <td>{item.name}</td>
                                            <td>
                                            {   geolib.getDistance({
                                                    latitude: item.start_lat,
                                                    longitude: item.start_lng
                                                }, {
                                                    latitude: item.end_lat,
                                                    longitude: item.end_lng
                                                })} m
                                            </td>
                                            <td>{moment(item.updatedAt).format('HH:mm:ss DD/MM/YYYY')}</td>
                                            <td>{0}</td>
                                            <td>{item.start_lat}, {item.start_lng}</td>
                                            <td>{item.status}</td>
                                        </tr>)}
                                </tbody>
                            </Table>
                            <nav>
                                <Pagination>
                                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                                    <PaginationItem active>
                                        <PaginationLink tag="button">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                                </Pagination>
                            </nav>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    }
}

export default PipesList;
