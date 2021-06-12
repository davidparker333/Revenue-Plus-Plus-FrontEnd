import React, { Component } from 'react'
import { Row } from 'react-bootstrap'

export default class EventDetail extends Component {

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

    render() {
        return (
            <div>
                <Row className='mt-4'>
                <div className="col-12">
                    <div className="card">
                    <div className="card-body">
                        <Row className='mb-2'>
                            <div className='col-6 col-md-8 col-lg-10'>
                                <h4 className="card-title">Meeting @ Jensen's</h4>
                                <small>In 2 days</small>
                            </div>
                            <div className='col-6 col-md-4 col-lg-2'>
                            <div className="btn-group">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Event Options
                                </button>
                                <div class="dropdown-menu">
                                    <button className="dropdown-item" href="/" onClick={(e) => this.edit(e)}>Edit</button>
                                    <a className="dropdown-item" href="/">Delete</a>
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
                        <h5 class="card-title">Event Time</h5>
                        <form>
                            <fieldset id='contact-info-group' disabled>
                            <div class="form-group">
                                <label for="firstName">Date</label>
                                <input type="text" id="firstName" class="form-control" defaultValue="6/16/21" />
                            </div>
                            <div class="form-group">
                                <label for="lastName">Time</label>
                                <input type="text" id="lastName" class="form-control" defaultValue="10:30AM" />
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
                            <fieldset id='lead-info-group' disabled>
                            <div class="form-group">
                                <label for="businessName">Event Name</label>
                                <input type="text" id="businessName" class="form-control" defaultValue="Meeting @ Jensen's" />
                            </div>
                            <div class="form-group">
                                <label for="address">Contact</label>
                                <input type="text" id="address" class="form-control" defaultValue="Carl Munroe" />
                            </div>
                            </fieldset>
                        </form>
                        </div>
                    </div>
                    </div>
                </Row>
                <Row className='mb-4'>
                    <div className='col-12' id='save-button-space'>

                    </div>
                </Row>
            </div>
        )
    }
}
