import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import VodostajApi from "../../../api/VodostajApi";
import moment from 'moment';

class VodostajiList extends Component {
    constructor(props){
        super(props);
        this.state={vals: []};

        VodostajApi.GetVodostaji().subscribe(
            vals => {
                this.setState({vals:vals});
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
                                    <th>Visina vodostaja</th>
                                    <th>Vrijeme unosa</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.vals.map((item)=><tr>
                                        <td>{item._id}</td>
                                        <td>{item.value}</td>
                                        <td>{moment(item.createdAt).format('HH:mm:ss DD/MM/YYYY')}</td>
                                        <td>{item.lat}</td>
                                        <td>{item.lng}</td>
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

export default VodostajiList;