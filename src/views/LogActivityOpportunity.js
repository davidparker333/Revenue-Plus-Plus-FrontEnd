import React, { Component } from 'react'
import { Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom';

export default class LogActivityOpportunity extends Component {
    constructor() {
        super();

        this.state = {
            date: new Date(),
            redirect: null
        }
    }

    setDate = (date) => {
        let selected = new Date(date)
        this.setState({
            date: selected
        })
    }

    saveActivity = () => {
        this.props.addMessage("Activity Saved", 'success');
        this.setState({
            redirect: '/opportunities/1'
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
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
                            <h4 className="card-title">Central Provisions</h4>
                            <small>Last updated 4 days ago</small>
                        </div>
                        <div className='col-6 col-md-4 col-lg-2'>
                        <button className='btn btn-primary' onClick={this.saveActivity}>Save Activity</button>
                        </div>
                    </Row>
                </div>
                </div>
            </div>
            </Row>
            <Row className='mb-4 mt-4'>
                    <div className='col-12'>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Activity</h5>
                            <Row className='mt-3'>
                                <div className='col-12 col-md-3 mb-3'>
                                    <h6>Type</h6>
                                    <select class="custom-select">
                                        <option selected hidden>Choose Type</option>
                                        <option value="1">Call</option>
                                        <option value="2">Text</option>
                                        <option value="3">Email</option>
                                        <option value="4">Meeting</option>
                                        <option value="5">Follow Up Meeting</option>
                                        <option value="6">Proposal</option>
                                        <option value="7">Other</option>
                                    </select>
                                </div>
                                <div className='col-12 col-md-2 mb-3'>
                                    <h6>Date</h6>
                                    <DatePicker selected={this.state.date} className='form-control date-picker' id="lead-activity-date-picker" dateFormat="MM/dd/yyyy" onChange={(date) => this.setDate(date)} />
                                </div>
                                <div className='col-12 col-md-7 mb-3'>
                                    <h6>Notes</h6>
                                    <textarea class="form-control" aria-label="With textarea"></textarea>
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
