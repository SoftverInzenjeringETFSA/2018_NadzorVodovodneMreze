import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PipeApi from "../../../api/PipeApi";


class PipesList extends Component {
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
