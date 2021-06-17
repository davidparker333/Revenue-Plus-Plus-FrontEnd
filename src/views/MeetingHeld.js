import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';

export default class MeetingHeld extends Component {
    constructor() {
        super();

        this.state = {
            date: new Date(),
            redirect: null,
            opportunity: ""
        }
    }

    setDate = (date) => {
        let selected = new Date(date)
        this.setState({
            date: selected
        })
    }

    saveActivity = () => {
        let id = this.props.match.params.id;
        let type = document.getElementById('logActivityOppType').value;
        let notes = document.getElementById('oppActivityNotes').value;
        fetch(`https://revenue-plus-plus.herokuapp.com/api/newactivity/opportunity/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "type": type,
                "date": this.state.date,
                "notes": notes
            })
            }).then(res => res.json())
                .then(() => {
                    this.props.addMessage("Activity Saved", 'success');
                    this.setState({
                        redirect: `/opportunities/${this.props.match.params.id}`
                    })  
                })
            .catch(e => {
                console.log(e)
                this.props.addMessage("Something doesn't look right. Please try again", 'danger')
            })
    }

    getOpp = () => {
        let id = this.props.match.params.id;
        fetch(`https://revenue-plus-plus.herokuapp.com/api/opportunities/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
            }).then(res => res.json())
                .then(data => {
                    this.setState({
                        opportunity: data
                    })
                })
            .catch(e => {
                console.log(e)
                this.props.addMessage("Something doesn't look right. Please try again", 'danger')
            })
    }

    componentDidMount = () => {
        this.getOpp();
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
                            <h4 className="card-title">{this.state.opportunity.business_name}</h4>
                            {this.state.opportunity.date_created ? <small>Created <Moment fromNow>{this.state.opportunity.date_created}</Moment></small> : ""}
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
                                    <select class="custom-select" id="logActivityOppType">
                                        <option selected hidden>Choose Type</option>
                                        <option value="Call">Call</option>
                                        <option value="Text">Text</option>
                                        <option value="Email">Email</option>
                                        <option value="Meeting" selected>Meeting</option>
                                        <option value="Follow Up Meeting">Follow Up Meeting</option>
                                        <option value="Proposal">Proposal</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className='col-12 col-md-2 mb-3'>
                                    <h6>Date</h6>
                                    <DatePicker selected={this.state.date} className='form-control date-picker' id="lead-activity-date-picker" dateFormat="MM/dd/yyyy" onChange={(date) => this.setDate(date)} />
                                </div>
                                <div className='col-12 col-md-7 mb-3'>
                                    <h6>Notes</h6>
                                    <textarea class="form-control" id="oppActivityNotes" aria-label="With textarea"></textarea>
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
