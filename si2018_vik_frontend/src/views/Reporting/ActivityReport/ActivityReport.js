import React, { Component } from 'react';
import {
    Badge, Button, ButtonDropdown,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Col, DropdownItem, DropdownMenu, DropdownToggle,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table
} from 'reactstrap';
import PipeApi from "../../../api/PipeApi";
import ReportApi from "../../../api/ReportApi";
import type {ActivityReportEntry} from "../../../api/model/ActivityReportEntry";


class ActivityReport extends Component {
    items: ActivityReportEntry = [];
    itemsPerPage = 5;

    fetchList() {
        ReportApi.GenerateActivityReport(1, this.itemsPerPage, null).subscribe( items => {
            this.items = items;
            this.forceUpdate();
        } );
    }


    constructor() {
        super();

        this.fetchList();

        this.state = {
            itemsPerPageDropdownOpen: false
        };
    }

    setItemsPerPage(num: number) {
        this.itemsPerPage = num;
        this.fetchList();
    }

    render() {
        const items: ActivityReportEntry[] = [];
        let k = 1;
        for ( const i of this.items ) {
            items.push(<tr key={k}>
                <td>{k}</td>
                <td>{ReportApi.LocalizedActivityLabel(i.activity)}</td>
                <td>{i.user_id}</td>
                <td>{i.timestamp}</td>
            </tr>);
            ++k;
        }
        return <div className="animated fadeIn">
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Combined All Table
                        </CardHeader>
                        <CardBody>
                            <div className="pr-2 pt-2 pb-2">
                                <span className="pr-2 pt-2 pb-2">
                                    Broj unosa po stranici:
                                </span>
                                <ButtonDropdown className="mr-1" isOpen={this.state.itemsPerPageDropdownOpen} toggle={() => { this.setState( { itemsPerPageDropdownOpen: !this.state.itemsPerPageDropdownOpen }); } }>
                                    <DropdownToggle caret color="secondary">
                                        {this.itemsPerPage}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => this.setItemsPerPage(5)}>5</DropdownItem>
                                        <DropdownItem onClick={() => this.setItemsPerPage(10)}>10</DropdownItem>
                                        <DropdownItem onClick={() => this.setItemsPerPage(15)}>15</DropdownItem>
                                        <DropdownItem onClick={() => this.setItemsPerPage(20)}>20</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                                <Button onClick={() => this.fetchList()}>Osvježi</Button>
                            </div>

                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Aktivnost</th>
                                    <th>Korisnik</th>
                                    <th>Vrijeme aktivnosti</th>
                                </tr>
                                </thead>
                                <tbody>

                                {items}

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

export default ActivityReport;
