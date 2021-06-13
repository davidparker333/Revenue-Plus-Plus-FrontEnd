import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';
import Activity from '../components/Activity'

export default class LeadDetail extends Component {
    constructor() {
        super();

        this.state = {
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
    }

    delete = () => {
        this.props.addMessage('Lead has been deleted.', 'warning');
        this.setState({
            redirect: '/leads'
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
                                <h4 className="card-title">The Saco Deli & Co</h4>
                                <small>Last updated 4 days ago</small>
                            </div>
                            <div className='col-6 col-md-4 col-lg-2'>
                            <div className="btn-group">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Lead Options
                                </button>
                                <div class="dropdown-menu">
                                    <button className="dropdown-item" onClick={(e) => this.edit(e)}>Edit</button>
                                    <a className="dropdown-item" href="/">Convert to Opportunity</a>
                                    <button className="dropdown-item" onClick={this.delete}>Delete</button>
                                </div>
                            </div>
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
                                <label for="disabledTextInput">First Name</label>
                                <input type="text" id="disabledTextInput" class="form-control" defaultValue="Mark" />
                            </div>
                            <div class="form-group">
                                <label for="disabledTextInput">Last Name</label>
                                <input type="text" id="disabledTextInput" class="form-control" defaultValue="Otto" />
                            </div>
                            <div class="form-group">
                                <label for="disabledTextInput">Phone Number</label>
                                <input type="text" id="disabledTextInput" class="form-control" defaultValue="(207)957-8375" />
                            </div>
                            <div class="form-group">
                                <label for="disabledTextInput">Cell Phone Number</label>
                                <input type="text" id="disabledTextInput" class="form-control" defaultValue="(207)837-8364" />
                            </div>
                            </fieldset>
                        </form>
                        </div>
                    </div>
                    </div>
                    <div className='col-12 col-md-6 mb-2'>
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">Lead Info</h5>
                        <form>
                            <fieldset id='lead-info-group' disabled>
                            <div class="form-group">
                                <label for="disabledTextInput">Business Name</label>
                                <input type="text" id="disabledTextInput" class="form-control" defaultValue="The Saco Deli & Co" />
                            </div>
                            <div class="form-group">
                                <label for="disabledTextInput">Address</label>
                                <input type="text" id="disabledTextInput" class="form-control" defaultValue="57 Main St Saco, ME 04072" />
                            </div>
                            <div class="form-group">
                                <label for="disabledSelect">Status</label>
                                <select id="disabledSelect" class="form-control">
                                    <option hidden>DM Reached</option>
                                    <option>Pending</option>
                                    <option>Contact Attempted</option>
                                    <option>GK Reached</option>
                                    <option>DM Reached</option>
                                    <option>Meeting Pending</option>
                                    <option>Closed Lost</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                    <label class="custom-control-label" for="customCheck1">Hot Lead</label>
                                </div>
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
                            <Link to="/logactivity/lead/1" className="btn btn-primary">Log Activity</Link>
                        </div>
                    </div>
                    </div>
                </Row>

            </div>
        )
    }
}
