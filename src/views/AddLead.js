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
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let phoneNumber = document.getElementById('phoneNumber').value;
        let cellPhoneNumber = document.getElementById('cellPhoneNumber').value;
        let businessName = document.getElementById('businessName').value;
        let address = document.getElementById('address').value;
        let status = document.getElementById('status').value;
        let hot = document.getElementById('hot').checked;
        fetch('https://revenue-plus-plus.herokuapp.com/api/newlead',{
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
                "hot": hot
            })
        }).then(res => res.json())
            .then(() => {
                this.props.addMessage('Lead Added Successfully', 'success')
                this.redirect('/leads')
            })
            .catch(e => {
                console.log(e)
                this.props.addMessage("Something doesn't look right. Please try again", 'danger')
            })
    }

    redirect = (location) => {
        this.setState({
            redirect: location
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}></Redirect>
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
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" class="form-control" autoComplete="none" />
                            </div>
                            <div class="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" class="form-control" autoComplete="none" />
                            </div>
                            <div class="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="text" id="phoneNumber" name="phoneNumber" class="form-control" autoComplete="none" />
                            </div>
                            <div class="form-group">
                                <label htmlFor="cellPhoneNumber">Cell Phone Number</label>
                                <input type="text" id="cellPhoneNumber" name="cellPhoneNumber" class="form-control" autoComplete="none" />
                                <input className='invisible' />
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
                        <form autoComplete="off">
                            <fieldset id='lead-info-group'>
                            <div class="form-group">
                                <label htmlFor="businessName">Business Name</label>
                                <input type="text" id="businessName" name="businessname" class="form-control" autoComplete="none" />
                            </div>
                            <div class="form-group">
                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" name="address" class="form-control" autoComplete="none" />
                                <input className='invisible' />
                            </div>
                            <div class="form-group">
                                <label htmlFor="status">Status</label>
                                <select id="status" name="status" class="form-control">
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
                                    <input type="checkbox" class="custom-control-input" id="hot" name="hot" />
                                    <label class="custom-control-label" htmlFor="hot">Hot Lead</label>
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
