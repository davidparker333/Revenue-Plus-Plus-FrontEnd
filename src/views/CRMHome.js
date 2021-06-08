import React, { Component } from 'react'
import { Row } from 'react-bootstrap'

export default class CRMHome extends Component {
    render() {
        return (
            <div>
                <Row className='mt-5'>
                    <div className='col-12 col-md-8'>
                        <div className="card mb-2">
                            {/* <img className="card-img-top" src="..." alt="..." /> */}
                            <div className="card-body">
                                <h4 className="card-title">Recent Leads</h4>
                                <p className="card-text">He seems sinking under the evidence could not only grieve and a visit. The father is to bless and placed in his length hid...</p>
                                <a href="/" className="btn btn-primary">Go to Leads</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-4'>
                        <div className="card mb-2">
                            {/* <img className="card-img-top" src="..." alt="..." /> */}
                            <div className="card-body">
                                <h4 className="card-title">Today's Events</h4>
                                <p className="card-text">He seems sinking under the evidence could not only grieve and a visit. The father is to bless and placed in his length hid...</p>
                                <a href="/" className="btn btn-primary">Go to Events</a>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row className='mt-5'>
                    <div className='col-12 col-md-4'>
                        <div className="card mb-2">
                            {/* <img className="card-img-top" src="..." alt="..." /> */}
                            <div className="card-body">
                                <h4 className="card-title">Closed Opportunities</h4>
                                <p className="card-text">He seems sinking under the evidence could not only grieve and a visit. The father is to bless and placed in his length hid...</p>
                                <a href="/" className="btn btn-primary">Go to Opportunities</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-8'>
                        <div className="card mb-2">
                            {/* <img className="card-img-top" src="..." alt="..." /> */}
                            <div className="card-body">
                                <h4 className="card-title">Open Opportunities</h4>
                                <p className="card-text">He seems sinking under the evidence could not only grieve and a visit. The father is to bless and placed in his length hid...</p>
                                <a href="/" className="btn btn-primary">Go to Opportunities</a>
                            </div>
                        </div>
                    </div>
                </Row>
            </div>
        )
    }
}
