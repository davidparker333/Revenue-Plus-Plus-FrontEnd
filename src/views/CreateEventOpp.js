import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom';

export default class CreateEventOpp extends Component {
    constructor() {
        super();

        this.state = {
            date: new Date(),
            redirect: null,
            opportunity: "",
            contact: "",
            eventName: ""
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
        let id = this.props.match.params.id;
        let eventName = document.getElementById('oppEventName').value;
        if (document.getElementById('oppContactName').value.split(" ")[0] !== null) {
            var firstName = document.getElementById('oppContactName').value.split(" ")[0];
        } else {
            //eslint-disable-next-line
            var firstName = document.getElementById('oppContactName').value;
        }
        if (document.getElementById('oppContactName').value.split(" ").slice(1) !== null) {
            var lastName = document.getElementById('oppContactName').value.split(" ").slice(1).join(' ').toString();
        } else {
            //eslint-disable-next-line
            var lastName = ""
        }
        fetch(`http://localhost:5000/api/addevent/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "event_name": eventName,
                "date_time": this.state.date,
                "first_name": firstName,
                "last_name": lastName,
                "opportunity_id": this.props.match.params.id
            })
            }).then(res => res.json())
                .then(() => {
                    this.props.addMessage("Event Created Successfully", 'success');
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
        fetch(`http://localhost:5000/api/opportunities/${id}`, {
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
                    let name = data.first_name + " " + data.last_name;
                    this.setState({
                        contact: name
                    })
                    let eventName = "Meeting @ " + data.business_name;
                    this.setState({
                        eventName: eventName
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
                                <h4 className="card-title">New Event</h4>
                                <small>{this.state.opportunity.business_name}</small>
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
                                <label for="oppEventDate">Date</label><br />
                                <DatePicker selected={this.state.date} className='form-control date-picker' id="oppEventDate" dateFormat="MM/dd/yyyy" onChange={(date) => this.setDateTime(date)} />
                            </div>
                            <div class="form-group">
                                <label for="oppEventTime">Time</label>
                                <DatePicker selected={this.state.date} className='form-control' id="oppEventTime" showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa" onChange={(date) => this.setDateTime(date)} />
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
                                <label for="oppEventName">Event Name</label>
                                <input type="text" id="oppEventName" class="form-control" defaultValue={this.state.eventName} />
                            </div>
                            <div class="form-group">
                                <label for="oppContactName">Contact</label>
                                <input type="text" id="oppContactName" class="form-control" defaultValue={this.state.contact} />
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
