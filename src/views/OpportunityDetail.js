import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Activity from '../components/Activity';
import Moment from 'react-moment';

export default class OpportunityDetail extends Component {
    constructor() {
        super();

        this.state = {
            progress: {"width": "25%"},
            redirect: null,
            opportunity: "",
            value: "",
            activity: []
        }
    }

    edit = (e) => {
        e.preventDefault();
        document.getElementById('contact-info-group').disabled = false;
        document.getElementById('lead-info-group').disabled = false;
        let btn = document.createElement('button');
        btn.classList.add('btn', 'btn-primary', 'save-btn', 'my-3');
        btn.setAttribute('id', 'save-btn')
        let t = document.createTextNode("Save");
        btn.appendChild(t);
        document.getElementById("save-button-space").appendChild(btn);
        document.getElementById('save-btn').addEventListener('click', this.save)
        };

    save = () => {
        let id = this.props.match.params.id;
        let status = document.getElementById('statusSelect');
        status = status.options[status.selectedIndex].text;
        let firstName = document.getElementById('oppFirstName').value;
        let lastName = document.getElementById('oppLastName').value;
        let phoneNumber = document.getElementById('oppPhoneNumber').value;
        let cellPhoneNumber = document.getElementById('oppCellPhoneNumber').value;
        let businessName = document.getElementById('oppBusinessName').value;
        let address = document.getElementById('oppAddress').value;
        let value = document.getElementById('oppValue').value.replace('$', "");
        fetch(`http://localhost:5000/api/edit/opportunity/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "first_name": firstName,
                "last_name": lastName,
                "phone_number": phoneNumber,
                "cell_phone_number": cellPhoneNumber,
                "business_name": businessName,
                "address": address,
                "status": status,
                "value": value
            })
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
        document.getElementById('contact-info-group').disabled = true;
        document.getElementById('lead-info-group').disabled = true;
        document.getElementById('save-button-space').innerHTML = "";
        this.setProgressBar(status)
    }

    setProgressBar = (status) => {
        if (status === 'Meeting Scheduled') {
            this.setState({
                progress: {"width": "25%"}
            })
        } else if (status === 'Meeting Held') {
            this.setState({
                progress: {"width": "50%"}
            })
        } else if (status === 'Negotiating') {
            this.setState({
                progress: {"width": "75%"}
            })
        } else if (status === 'Closed Won' || status === 'Closed Lost') {
            this.setState({
                progress: {"width": "100%"}
            })
        }
    }

    delete = () => {
        this.props.addMessage('Opportunity has been deleted.', 'warning');
        this.setState({
            redirect: '/opportunities'
        })
    }

    meetingHeld = () => {
        let id = this.props.match.params.id;
        fetch(`https://revenue-plus-plus.herokuapp.com/api/edit/opportunity/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "status": "Meeting Held"
            })
            })
            .catch(e => {
                console.log(e)
                this.props.addMessage("Something doesn't look right. Please try again", 'danger')
            })
        this.setState({
            redirect: `/meetingheld/${this.state.opportunity.id}`
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
                        opportunity: data,
                        value: "$" + data.value
                    })
                    this.setProgressBar(data.status);
                })
            .catch(e => {
                console.log(e)
                this.props.addMessage("Something doesn't look right. Please try again", 'danger')
            })
    }

    getActivity = () => {
        let id = this.props.match.params.id;
        fetch(`https://revenue-plus-plus.herokuapp.com/api/getactivity/opportunity/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
            }).then(res => res.json())
                .then(data => {
                    this.setState({
                        activity: data
                    })
                })
            .catch(e => {
                console.log(e)
                this.props.addMessage("Something doesn't look right. Please try again", 'danger')
            })
    }

    closedWon = () => {
        let id = this.props.match.params.id;
        fetch(`https://revenue-plus-plus.herokuapp.com/api/close/won/opportunity/${id}`, {
            method: 'POST',
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
                    this.setProgressBar(data.status);
                    this.props.addMessage('Congrats! Opportunity saved as closed won!', 'success')
                })
            .catch(e => {
                console.log(e)
                this.props.addMessage("Something doesn't look right. Please try again", 'danger')
            })
    }

    closedLost = () => {
        let id = this.props.match.params.id;
        fetch(`https://revenue-plus-plus.herokuapp.com/api/close/lost/opportunity/${id}`, {
            method: 'POST',
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
                    this.setProgressBar(data.status);
                    this.props.addMessage('Opportunity saved as closed lost.', 'warning')
                })
            .catch(e => {
                console.log(e)
                this.props.addMessage("Something doesn't look right. Please try again", 'danger')
            })
    }

    componentDidMount = () => {
        this.getOpp();
        this.getActivity();
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
                            <div className="btn-group">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Opportunity
                                </button>
                                <div class="dropdown-menu">
                                    <button className="dropdown-item" onClick={(e) => this.edit(e)}>Edit</button>
                                    <button className="dropdown-item" onClick={this.meetingHeld}>Meeting Held</button>
                                    <button className="dropdown-item"  onClick={this.closedWon}>Closed Won</button>
                                    <button className="dropdown-item" onClick={this.closedLost}>Closed Lost</button>
                                    <Link className="dropdown-item" to={`/addevent/${this.props.match.params.id}`}>Create Event</Link>
                                </div>
                            </div>
                            </div>
                        </Row>
                    </div>
                    </div>
                </div>
                </Row>
                <Row className='mt-2'>
                    <div className='col-12'>
                        <div class="card">
                            <div class="card-body">
                                <div class="progress">
                                    <div className="progress-bar" role="progressbar" style={this.state.progress} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <Row className='d-flex flex-row justify-content-center mt-1'>
                                    <div className='col-3 d-flex flex-column justify-content-center'>
                                    <h6 className='text-center d-none d-lg-block'>Meeting Scheduled</h6>
                                    </div>
                                    <div className='col-3 d-flex flex-column justify-content-center'>
                                    <h6 className='text-center d-none d-lg-block'>Meeting Held</h6>
                                    </div>
                                    <div className='col-3 d-flex flex-column justify-content-center'>
                                    <h6 className='text-center d-none d-lg-block'>Negotiating</h6>
                                    </div>
                                    <div className='col-3 d-flex flex-column justify-content-center'>
                                    <h6 className='text-center d-none d-lg-block'>Closed</h6>
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
                        <h5 class="card-title">Contact Info</h5>
                        <form>
                            <fieldset id='contact-info-group' disabled>
                            <div class="form-group">
                                <label for="oppFirstName">First Name</label>
                                <input type="text" id="oppFirstName" class="form-control" defaultValue={this.state.opportunity.first_name} />
                            </div>
                            <div class="form-group">
                                <label for="oppLastName">Last Name</label>
                                <input type="text" id="oppLastName" class="form-control" defaultValue={this.state.opportunity.last_name} />
                            </div>
                            <div class="form-group">
                                <label for="oppPhoneNumber">Phone Number</label>
                                <input type="text" id="oppPhoneNumber" class="form-control" defaultValue={this.state.opportunity.phone_number} />
                            </div>
                            <div class="form-group">
                                <label for="oppCellPhoneNumber">Cell Phone Number</label>
                                <input type="text" id="oppCellPhoneNumber" class="form-control" defaultValue={this.state.opportunity.cell_phone_number} />
                            </div>
                            </fieldset>
                        </form>
                        </div>
                    </div>
                    </div>
                    <div className='col-12 col-md-6 mb-2'>
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">Opportunity Info</h5>
                        <form>
                            <fieldset id='lead-info-group' disabled>
                            <div class="form-group">
                                <label for="oppBusinessName">Business Name</label>
                                <input type="text" id="oppBusinessName" class="form-control" defaultValue={this.state.opportunity.business_name} />
                            </div>
                            <div class="form-group">
                                <label for="oppAddress">Address</label>
                                <input type="text" id="oppAddress" class="form-control" defaultValue={this.state.opportunity.address} />
                            </div>
                            <div class="form-group">
                                <label for="statusSelect">Status</label>
                                <select id="statusSelect" class="form-control">
                                    <option hidden>{this.state.opportunity.status}</option>
                                    <option>Meeting Scheduled</option>
                                    <option>Meeting Held</option>
                                    <option>Negotiating</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="oppValue">Value</label>
                                <input type="text" id="oppValue" class="form-control" defaultValue={this.state.value} />
                            </div>
                            </fieldset>
                        </form>
                        </div>
                    </div>
                    </div>
                </Row>
                <Row>
                    <div className='col-12' id='save-button-space'>

                    </div>
                </Row>
                <Row className='mb-4'>
                    <div className='col-12'>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Activity</h5>
                            <table className="table">
                            <thead className="thead">
                                 <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Date</th>
                                <th scope="col">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.activity.map((activity, index) => <Activity key={index} type={activity.type} date={activity.date} notes={activity.notes} />)}
                            </tbody>
                            </table>
                            <Link to={`/logactivity/opportunity/${this.props.match.params.id}`} className="btn btn-primary">Log Activity</Link>
                        </div>
                    </div>
                    </div>
                </Row>
            </div>
        )
    }
}
