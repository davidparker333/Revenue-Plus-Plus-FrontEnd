import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';
import Activity from '../components/Activity'

export default class OpportunityDetail extends Component {
    constructor() {
        super();

        this.state = {
            progress: {"width": "50%"},
            redirect: null
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
        document.getElementById('contact-info-group').disabled = true;
        document.getElementById('lead-info-group').disabled = true;
        document.getElementById('save-button-space').innerHTML = "";
        let status = document.getElementById('statusSelect');
        status = status.options[status.selectedIndex].text;
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

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
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
                            <div className="btn-group">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Opportunity
                                </button>
                                <div class="dropdown-menu">
                                    <button className="dropdown-item" href="/" onClick={(e) => this.edit(e)}>Edit</button>
                                    <a className="dropdown-item" href="/">Meeting Held</a>
                                    <a className="dropdown-item" href="/">Create Event</a>
                                    <button className="dropdown-item" onClick={this.delete}>Delete</button>
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
                                <label for="firstName">First Name</label>
                                <input type="text" id="firstName" class="form-control" defaultValue="Mark" />
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" id="lastName" class="form-control" defaultValue="Otto" />
                            </div>
                            <div class="form-group">
                                <label for="phoneNumber">Phone Number</label>
                                <input type="text" id="phoneNumber" class="form-control" defaultValue="(207)957-8375" />
                            </div>
                            <div class="form-group">
                                <label for="cellPhoneNumber">Cell Phone Number</label>
                                <input type="text" id="cellPhoneNumber" class="form-control" defaultValue="(207)837-8364" />
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
                                <label for="businessName">Business Name</label>
                                <input type="text" id="businessName" class="form-control" defaultValue="The Saco Deli & Co" />
                            </div>
                            <div class="form-group">
                                <label for="address">Address</label>
                                <input type="text" id="address" class="form-control" defaultValue="57 Main St Saco, ME 04072" />
                            </div>
                            <div class="form-group">
                                <label for="statusSelect">Status</label>
                                <select id="statusSelect" class="form-control">
                                    <option hidden>Meeting Held</option>
                                    <option>Meeting Scheduled</option>
                                    <option>Meeting Held</option>
                                    <option>Negotiating</option>
                                    <option>Closed Won</option>
                                    <option>Closed Lost</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="value">Value</label>
                                <input type="text" id="value" class="form-control" defaultValue="$450" />
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
                                <Activity />
                            </tbody>
                            </table>
                            <Link to="/logactivity/opportunity/1" className="btn btn-primary">Log Activity</Link>
                        </div>
                    </div>
                    </div>
                </Row>
            </div>
        )
    }
}
