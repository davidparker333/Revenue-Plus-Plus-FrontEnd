import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import Opportunity from '../components/Opportunity'

export default class Opportunities extends Component {
    render() {
        return (
            <div>
                <Row className='mt-4'>
                <div className="col-12">
                    <div className="card">
                    <div className="card-body">
                        <Row className='mb-2'>
                            <div className='col-8 col-md-10'>
                                <h4 className="card-title">Open Opportunities</h4>
                            </div>
                            <div className='col-4 col-md-2'>
                                <div className="custom-control custom-toggle my-2">
                                    <input type="checkbox" id="customToggle2" name="customToggle2" className="custom-control-input" />
                                    <label className="custom-control-label" for="customToggle2">Last 30 Days</label>
                                </div>
                            </div>
                        </Row>
                        <table className="table">
                            <thead className="thead">
                                <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Company</th>
                                <th scope="col">Value</th>
                                <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Opportunity />
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
