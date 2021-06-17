import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import Opportunity from '../components/Opportunity'
import { Redirect } from 'react-router-dom';

export default class Opportunities extends Component {
    constructor() {
        super();

        this.state = {
            opportunities: []
        }
    }

    getOpportunities = () => {
        fetch('https://revenue-plus-plus.herokuapp.com/api/allopenopportunities', {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(data => {
                this.setState({
                    opportunities: data
                })
            })
        .catch(e => {
            console.log(e)
            this.props.addMessage("Something doesn't look right. Please try again", 'danger')
        })
    }

    get30DayOpportunities = () => {
        fetch('https://revenue-plus-plus.herokuapp.com/api/openopportunitiesthismonth', {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(data => {
                this.setState({
                    opportunities: data
                })
            })
        .catch(e => {
            console.log(e)
            this.props.addMessage("Something doesn't look right. Please try again", 'danger')
        })
    }

    toggle30Day = (e) => {
        if (e.target.checked === false) {
            this.getOpportunities();
        } else {
            this.get30DayOpportunities();
        }
    }

    componentDidMount = () => {
        this.getOpportunities();
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
                                <h4 className="card-title">Open Opportunities</h4>
                            </div>
                            <div className='col-6 col-md-4 col-lg-2'>
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    View Options
                                </button>
                                <div class="dropdown-menu">
                                    <div class="dropdown-item">
                                        <div className="custom-control custom-toggle my-2">
                                            <input type="checkbox" id="opp30DayToggle" name="opp30DayToggle" className="custom-control-input" onClick={(e) => this.toggle30Day(e)} />
                                            <label className="custom-control-label" htmlFor="opp30DayToggle">Last 30 Days</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </Row>
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
                    </div>
                    </div>
                </div>
                </Row>
            </div>
        )
    }
}
