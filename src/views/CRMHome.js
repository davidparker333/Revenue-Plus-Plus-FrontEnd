import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import ClosedOpportunity from '../components/ClosedOpportunity'
import ClosedOpportunityFooter from '../components/ClosedOpportunityFooter'
import Event from '../components/Event'
import Lead from '../components/Lead'
import Opportunity from '../components/Opportunity'

export default class CRMHome extends Component {
    render() {
        return (
            <div>
                <Row className='mt-5'>
                    <div className='col-12 col-md-12 col-lg-8'>
                        <div className="card mb-2">
                            {/* <img className="card-img-top" src="..." alt="..." /> */}
                            <div className="card-body">
                                <h4 className="card-title">Recent Leads</h4>
                                <table className="table">
                                    <thead className="thead">
                                        <tr>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Phone #</th>
                                        <th scope="col">Company</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Lead />
                                    </tbody>
                                </table>
                                <a href="/" className="btn btn-primary">Go to Leads</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-12 col-lg-4'>
                        <div className="card mb-2">
                            {/* <img className="card-img-top" src="..." alt="..." /> */}
                            <div className="card-body">
                                <h4 className="card-title">Today's Events</h4>
                                <table className="table">
                                    <thead className="thead">
                                        <tr>
                                        <th scope="col">Time</th>
                                        <th scope="col">Event Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Event />
                                    </tbody>
                                </table>
                                <a href="/" className="btn btn-primary">Go to Events</a>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row className='lg-mt-5'>
                    <div className='col-12 col-md-12 col-lg-4'>
                        <div className="card mb-2">
                            {/* <img className="card-img-top" src="..." alt="..." /> */}
                            <div className="card-body">
                                <h4 className="card-title">Closed Opportunities</h4>
                                <table className="table">
                                    <thead className="thead">
                                        <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <ClosedOpportunity />
                                    </tbody>
                                    <tfoot>
                                        <ClosedOpportunityFooter />
                                    </tfoot>
                                </table>
                                <a href="/" className="btn btn-primary">Go to Opportunities</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-12 col-lg-8'>
                        <div className="card mb-2">
                            {/* <img className="card-img-top" src="..." alt="..." /> */}
                            <div className="card-body">
                                <h4 className="card-title">Open Opportunities</h4>
                                <table className="table">
                                    <thead className="thead">
                                        <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Company</th>
                                        <th scope="col">Value</th>
                                        <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Opportunity />
                                    </tbody>
                                </table>
                                <a href="/" className="btn btn-primary">Go to Opportunities</a>
                            </div>
                        </div>
                    </div>
                </Row>
            </div>
        )
    }
}
