import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Features extends Component {
    render() {
        return (
            <div>
                <Row className='my-5'>
                    <div className='col-12 col-md-6'>
                        <h1 className='mt-5'>The Free CRM</h1>
                        <h2 className='mb-4'>For Increased Revenue</h2>
                        <div className='ml-3'>
                            <h5>Salespeople <i className="fal fa-check"></i></h5>
                            <h5>Small Business Owners <i className="fal fa-check"></i></h5>
                            <h5>Entrepreneurs <i className="fal fa-check"></i></h5>
                        </div>
                        <Link to='/register'><button type="button" className="btn btn-primary btn-squared mt-3 mx-1">Sign Up <i className="fal fa-chevron-double-right"></i></button></Link>
                        <button type="button" className="btn btn-outline-dark btn-squared mt-3 mx-1">See Features <i className="fal fa-angle-right"></i></button>
                        <p className='my-2 sign-in'>Already using R++? <Link to='/login'>Sign In</Link></p>
                    </div>
                    <div className='col-12 col-md-6'>
                        <img src="../Logo/logo.png" className="banner-img mt-5 ml-5" alt="r++ logo" />
                    </div>
                </Row>
                <Row>
                    <div className='col-12'>
                        <hr className='banner-hr my-5'/>
                    </div>
                </Row>
                <Row>
                    <div className='col-12'>
                        <div className='text-container'>
                            <h4 className='text-center my-3'>Easily Import Your Leads</h4>
                            <h6 className='text-center'>Take in your leads with speed. Revenue++ allows you to import a lead quickly and easily - even on your phone.</h6>
                        </div>
                    </div>
                    <div className='col-12'>
                        <img src="https://res.cloudinary.com/dbqwjxuhv/image/upload/v1623957586/leadcapture_o1klxe.png" className='mt-2 feature-img' alt="..." />
                    </div>
                </Row>
                <Row className='mt-5'>
                    <div className='col-12'>
                        <div className='text-container'>
                            <h4 className='text-center my-3'>Keep Tabs on your Opportunities</h4>
                            <h6 className='text-center'>Manage your opportunities with style. Always know where your relationship is at.</h6>
                        </div>
                    </div>
                    <div className='col-12'>
                        <img src="https://res.cloudinary.com/dbqwjxuhv/image/upload/v1623957935/oppstatus_jgxdzu.png" className='mt-2 feature-img' alt="..." />
                    </div>
                </Row>
                <Row className='mt-5 mb-5'>
                    <div className='col-12'>
                        <div className='text-container'>
                            <h4 className='text-center my-3'>Know Everything</h4>
                            <h6 className='text-center'>Keep the history of your relationships at your fingers, with activities that stay attached to your leads.</h6>
                        </div>
                    </div>
                    <div className='col-12'>
                        <img src="https://res.cloudinary.com/dbqwjxuhv/image/upload/v1623958130/activity_rtl2bl.png" className='mt-2 feature-img' alt="..." />
                    </div>
                </Row>
            </div>
        )
    }
}
