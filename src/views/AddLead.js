import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export default class AddLead extends Component {
    constructor() {
        super();

        this.state = {
            redirect: null
        }
    }

    addLead = () => {
        this.setState({
            redirect: '/leads'
        })
    }

    render() {
        if (this.state.redirect) {
            this.props.addMessage('Lead Added Successfully', 'success')
            return <Redirect to={this.state.redirect}></Redirect>
        }
        return (
            <div>
                <Row className='mt-4'>
                <div className="col-12">
                    <div className="card">
                    <div className="card-body">
                        <Row className='mb-2'>
                            <div className='col-6 col-md-8 col-lg-10'>
                                <h4 className="card-title">New Lead</h4>
                                <small>Created Now</small>
                            </div>
                            <div className='col-6 col-md-4 col-lg-2'>
                            <button className='btn btn-primary' onClick={this.addLead}>Save Lead</button>
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
                            <fieldset id='contact-info-group'>
                            <div class="form-group">
                                <label for="disabledTextInput">First Name</label>
                                <input type="text" id="disabledTextInput" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="disabledTextInput">Last Name</label>
                                <input type="text" id="disabledTextInput" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="disabledTextInput">Phone Number</label>
                                <input type="text" id="disabledTextInput" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="disabledTextInput">Cell Phone Number</label>
                                <input type="text" id="disabledTextInput" class="form-control" />
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
                            <fieldset id='lead-info-group'>
                            <div class="form-group">
                                <label for="disabledTextInput">Business Name</label>
                                <input type="text" id="disabledTextInput" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="disabledTextInput">Address</label>
                                <input type="text" id="disabledTextInput" class="form-control" />
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
            </div>
        )
    }
}
