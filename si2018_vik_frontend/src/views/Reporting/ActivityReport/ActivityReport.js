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
    items: ActivityReportEntry[] = [];
    itemsPerPage = 5;
    currentPage = 1;
    total = 0;

    fetchList() {
        ReportApi.GenerateActivityReport(this.currentPage, this.itemsPerPage, null).subscribe( items => {
            this.total = items.total;
            this.items = items.data;
            if ( this.items.length === 0 && this.currentPage > 1 ) {
                this.currentPage --;
                this.fetchList();
                return;
            }

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

    setPage(n) {
        this.currentPage = n;
        this.fetchList();
    }

    makePagination() {
        var pagination = [];

        for ( var i = Math.max(-2 + this.currentPage, 1); i <= Math.min(Math.ceil(this.total / this.itemsPerPage), Math.max(-2 + this.currentPage, 1) + 5); ++ i ) {
            var paginator = function(instance, i) {
                return function() {
                    instance.setPage(i);
                }
            };

            pagination.push(
                <PaginationItem key={i}>
                    <PaginationLink onClick={paginator(this, i)} tag="button">{i}</PaginationLink>
                </PaginationItem>
            );

            if ( i === this.currentPage ) {
                pagination[pagination.length - 1] = <PaginationItem active key={i}>
                    <PaginationLink tag="button">{i}</PaginationLink>
                </PaginationItem>
            }
        }

        return <Pagination>
            {pagination}
        </Pagination>;
    }

    render() {
        const items: ActivityReportEntry[] = [];
        let k = (this.itemsPerPage * (this.currentPage - 1)) + 1;
        for ( const i of this.items ) {
            items.push(<tr key={k}>
                <td>{k}</td>
                <td>{ReportApi.LocalizedActivityLabel(i.activity)}</td>
                <td>{i.user_id}</td>
                <td>{new Date(i.timestamp).toLocaleString()}</td>
            </tr>);
            ++k;
        }
        return <div className="animated fadeIn">
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Izvještaj današnjih aktivnosti
                        </CardHeader>
                        <CardBody>
                            <div className="pr-2 pt-2 pb-2">
                                <span className="pr-2 pt-2 pb-2">
                                    Ukupno {this.total} unosa, broj prikazanih unosa po stranici:
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
                                {this.makePagination()}
                            </nav>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    }
}

export default ActivityReport;
