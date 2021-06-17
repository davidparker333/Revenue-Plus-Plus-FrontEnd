import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';

export default class Reports extends Component {
    render() {
        if (this.props.isLoggedIn === false) {
            return <Redirect to='/login' />
        }
        return (
            <div>
                <Row className='mt-4'>
                <div className="col-12">
                    <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Lead Reports</h4>
                        <Row className='mt-4'>
                            <div className='col-12 col-md-3'>
                                <div class="card mt-2">
                                    <div class="card-body">
                                        <Link to='/reports/leads/closed'><h6>All Closed Leads</h6></Link>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-3'>
                                <div class="card mt-2">
                                    <div class="card-body">
                                        <h6>Filter by Date</h6>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-3'>
                                <div class="card mt-2">
                                    <div class="card-body">
                                        <h6>Closed Hot Leads</h6>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-3'>
                                <div class="card mt-2">
                                    <div class="card-body">
                                        <h6>Quantity by Date</h6>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </div>
                    </div>
                </div>
                </Row>
                <Row className='mt-4'>
                <div className="col-12">
                    <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Opportunity Reports</h4>
                        <Row className='mt-4'>
                            <div className='col-12 col-md-3'>
                                <div class="card mt-2">
                                    <div class="card-body">
                                        <Link to='/reports/opportunities/closedwon'><h6>All Closed Won</h6></Link>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-3'>
                                <div class="card mt-2">
                                    <div class="card-body">
                                        <h6>All Closed Lost</h6>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-3'>
                                <div class="card mt-2">
                                    <div class="card-body">
                                        <h6>High Value</h6>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-3'>
                                <div class="card mt-2">
                                    <div class="card-body">
                                        <h6>Low Value</h6>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </div>
                    </div>
                </div>
                </Row>
            </div>
        )
    }
}
