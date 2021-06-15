import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom';

export default class CreateEvent extends Component {
    constructor() {
        super();

        this.state = {
            date: new Date(),
            redirect: null
        }
    }

    setDateTime = (date) => {
        let time = date.toString().split(" ").slice(4, 6).join(" ");
        date = date.toString().split(" ").slice(0,4).join(" ");
        let datetime = date + " " + time;
        let selected = new Date(datetime)
        this.setState({
            date: selected
        })
    }

    save = () => {
        this.props.addMessage("Event Created Successfully", 'success');
        this.setState({
            redirect: '/home'
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
                                <h4 className="card-title">New Event</h4>
                            </div>
                            <div className='col-6 col-md-4 col-lg-2'>
                            <button className='btn btn-primary' onClick={this.save}>Create Event</button>
                            </div>
                        </Row>
                    </div>
                    </div>
                </div>
                </Row>
                <Row className='mt-4'>
                    <div className='col-12 col-md-6 mb-2'>
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">Event Time</h5>
                        <form>
                            <fieldset id='contact-info-group'>
                            <div class="form-group">
                                <label for="firstName">Date</label><br />
                                <DatePicker selected={this.state.date} className='form-control date-picker' id="event-date-picker" dateFormat="MM/dd/yyyy" onChange={(date) => this.setDateTime(date)} />
                            </div>
                            <div class="form-group">
                                <label for="lastName">Time</label>
                                <DatePicker selected={this.state.date} className='form-control' showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa" onChange={(date) => this.setDateTime(date)} />
                            </div>
                            </fieldset>
                        </form>
                        </div>
                    </div>
                    </div>
                    <div className='col-12 col-md-6 mb-2'>
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">Event Details</h5>
                        <form>
                            <fieldset id='lead-info-group'>
                            <div class="form-group">
                                <label for="businessName">Event Name</label>
                                <input type="text" id="businessName" class="form-control" defaultValue="" />
                            </div>
                            <div class="form-group">
                                <label for="address">Contact</label>
                                <input type="text" id="address" class="form-control" defaultValue="" />
                            </div>
                            </fieldset>
                        </form>
                        </div>
                    </div>
                    </div>
                </Row>
            </div>
        )
    }
}
