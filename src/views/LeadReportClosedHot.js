import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import Lead from '../components/Lead';

export default class LeadReportClosedHot extends Component {
    constructor() {
        super();

        this.state = {
            leads: [],
            loading: false
        }
    }

    getLeads = async () => {
        this.setState({
            loading: true
        })
        await fetch('https://revenue-plus-plus.herokuapp.com/api/reports/closedhotleads', {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(data => {
                this.setState({
                    leads: data
                })
            })
        .catch(e => {
            console.log(e)
            this.props.addMessage("Something doesn't look right. Please try again", 'danger')
        })
        .finally(() => {
            this.setState({
                loading: false
            })
        })
    }

    componentDidMount = () => {
        this.getLeads();
    }

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
                        <Row className='mb-2'>
                            <div className='col-6 col-md-8 col-lg-10'>
                                <h4 className="card-title">Closed Hot Leads</h4>
                            </div>
                        </Row>
                        <table className="table">
                            <thead className="thead">
                                 <tr>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Phone #</th>
                                <th scope="col">Company</th>
                                <th scope="col" className='d-none d-lg-block'>Hot Lead</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.leads.map((lead, index) => <Lead key={index} firstName={lead.first_name} lastName={lead.last_name} phoneNumber={lead.phone_number} company={lead.business_name} hot={lead.hot} id={lead.id} />)}
                            </tbody>
                        </table>
                        {!this.state.leads.length && !this.state.loading ? <div className="text-center my-2"><h5>No Leads</h5></div> : ''}
                    </div>
                    </div>
                </div>
                </Row>
            </div>
        )
    }
}
