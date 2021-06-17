import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import ClosedOpportunity from '../components/ClosedOpportunity'
import ClosedOpportunityFooter from '../components/ClosedOpportunityFooter'
import Event from '../components/Event'
import LeadPreview from '../components/LeadPreview'
import Opportunity from '../components/Opportunity'

export default class CRMHome extends Component {
    constructor() {
        super();

        this.state = {
            leads: [],
            opportunities: [],
            closed_opps: [],
            value: 0
        }
    }

    dashInfo = () => {
        fetch('http://localhost:5000/api/crmhome', {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
            }).then(res => res.json())
                .then(data => {
                    this.setState({
                        leads: data[0],
                        opportunities: data[1],
                        closed_opps: data[2]
                    })
                    var value = 0
                    for (let i=0; i<data[2].length; i++) {
                        value = value + data[2][i].value
                    }
                    this.setState({
                        value: value
                    })
                })
            .catch(e => {
                console.log(e)
                this.props.addMessage("Something doesn't look right. Please try again", 'danger')
            })
    }

    componentDidMount = () => {
        this.dashInfo();
    }

    render() {
        if (this.props.isLoggedIn === false) {
            return <Redirect to='/login' />
        }
        return (
            <div>
                <Row className='mt-4'>
                    <div className='col-12 col-md-12 col-lg-8'>
                        <div className="card mb-2">
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
                                        {this.state.leads.map((lead, index) => <LeadPreview key={index} firstName={lead.first_name} lastName={lead.last_name} phoneNumber={lead.phone_number} company={lead.business_name} id={lead.id} />)}
                                    </tbody>
                                </table>
                                <Link to="/leads" className="btn btn-primary">Go to Leads</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-12 col-lg-4'>
                        <div className="card mb-2">
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
                                <Link to="/events" className="btn btn-primary">Go to Events</Link>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row className='lg-mt-5'>
                    <div className='col-12 col-md-12 col-lg-4'>
                        <div className="card mb-2">
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
                                        {this.state.closed_opps.map((opp, index) => <ClosedOpportunity key={index} value={opp.value} company={opp.business_name} id={opp.id} />)}
                                    </tbody>
                                    <tfoot>
                                        <ClosedOpportunityFooter total={this.state.value} />
                                    </tfoot>
                                </table>
                                <Link to="/reports" className="btn btn-primary">Go to Reports</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-12 col-lg-8'>
                        <div className="card mb-2">
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
                                        {this.state.opportunities.map((opp, index) => <Opportunity key={index} firstName={opp.first_name} lastName={opp.last_name} value={opp.value} company={opp.business_name} id={opp.id} status={opp.status} />)}
                                    </tbody>
                                </table>
                                <Link to="/opportunities" className="btn btn-primary">Go to Opportunities</Link>
                            </div>
                        </div>
                    </div>
                </Row>
            </div>
        )
    }
}
