import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import EventPage from '../components/EventPage'
import { Link, Redirect } from 'react-router-dom';

export default class Events extends Component {
    render() {
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
                                <h4 className="card-title">Upcoming Events</h4>
                            </div>
                            <div className='col-6 col-md-4 col-lg-2'>
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Event Options
                                </button>
                                <div class="dropdown-menu">
                                    <div class="dropdown-item">
                                        <div className="custom-control custom-toggle my-2">
                                            <input type="checkbox" id="customToggle2" name="customToggle2" className="custom-control-input" />
                                            <label className="custom-control-label" for="customToggle2">This Week</label>
                                        </div>
                                    </div>
                                    <Link to='/addevent'><button className="dropdown-item">Add Event</button></Link>
                                </div>
                            </div>
                            </div>
                        </Row>
                        <table className="table">
                            <thead className="thead">
                                <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Event</th>
                                <th scope="col">With</th>
                                </tr>
                            </thead>
                            <tbody>
                                <EventPage />
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </Row>
            </div>
        )
    }
}
