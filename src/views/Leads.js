import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import Lead from '../components/Lead'

export default class Leads extends Component {

    test = (e) => {
        console.log(e.target.checked)
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
                                <h4 className="card-title">Open Leads</h4>
                            </div>
                            <div className='col-6 col-md-4 col-lg-2'>
                            <div className="btn-group">
                                <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    View Options
                                </button>
                                <div className="dropdown-menu">
                                    <div className="dropdown-item">
                                        <div className="custom-control custom-toggle my-2">
                                            <input type="checkbox" id="customToggle2" name="customToggle2" className="custom-control-input" onClick={(e) => this.test(e)} />
                                            <label className="custom-control-label" htmlFor="customToggle2">Last 30 Days</label>
                                        </div>
                                    </div>
                                    <div className="dropdown-item">
                                        <div className="custom-control custom-toggle my-2">
                                            <input type="checkbox" id="customToggle3" name="customToggle3" className="custom-control-input" />
                                            <label className="custom-control-label" htmlFor="customToggle3">Hot</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </Row>
                        <table className="table">
                            <thead className="thead">
                                 <tr>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Phone #</th>
                                <th scope="col">Company</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Lead />
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
