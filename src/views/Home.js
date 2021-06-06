import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Home extends Component {
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
                        <button type="button" className="btn btn-primary btn-squared mt-3 mx-1">Sign Up <i className="fal fa-chevron-double-right"></i></button>
                        <button type="button" className="btn btn-outline-dark btn-squared mt-3 mx-1">See Features <i className="fal fa-angle-right"></i></button>
                        <p className='my-2 sign-in'>Already using R++? <Link to='/'>Sign In</Link></p>
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
                            <h4 className='text-center my-3'>Explore Revenue++</h4>
                            <h6 className='text-center'>A more straightforward way to keep track of your relationships. Get more meetings, stay on top of your opportunities, and close more business.</h6>
                        </div>
                    </div>
                </Row>
                <Row className='mt-5 d-flex flex-row mb-5'>
                    <div className='col-12 col-md-6 col-lg-3 my-2 d-flex justify-content-center'>
                        <div className="card banner-card card-block">
                            <div className="card-body">
                            <i className="fas fa-user banner-icon"></i>
                                <h5 className='text-center mt-4'>Connect</h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-3 my-2 d-flex justify-content-center'>
                        <div className="card banner-card">
                            <div className="card-body">
                            <i className="fas fa-comments banner-icon"></i>
                                <h5 className='text-center mt-4'>Convert</h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-3 my-2 d-flex justify-content-center'>
                        <div className="card banner-card">
                            <div className="card-body">
                            <i className="fas fa-chart-line banner-icon"></i>
                                <h5 className='text-center mt-4'>Retain</h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-3 my-2 d-flex justify-content-center'>
                        <div className="card banner-card">
                            <div className="card-body">
                            <i className="far fa-chart-bar banner-icon"></i>
                                <h5 className='text-center mt-4'>Analyze</h5>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row className="row my-5">
                    <div className="col-12">
                        <div className="card text-white bg-dark">
                        <img className="card-img-top" src="https://res.cloudinary.com/dbqwjxuhv/image/upload/v1623012221/bizimg2_pwpji2.jpg" alt="..." />
                        <div className="card-body">
                            <Row>
                                <div className='col-12 col-md-6'>
                                    <h4 className="card-title text-white">Keep Up Activity With Ease</h4>
                                    <p className="card-text">Increase your output 30%, while delighting your clients</p>
                                    <p className='ml-3'>- Easily input your lead data<br />
                                    - Track your interactions and meetings<br />
                                    - Analyze trends<br />
                                    - Increase your revenue</p>
                                    <a href="/" className="btn btn-primary">Sign Up Now</a>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <img src="../Logo/logowhite.png" alt="..." className='card-logo' />
                                </div>
                            </Row>
                        </div>
                    </div>
                </div>
            </Row>
            <Row>
                <div className='col-12'>
                    <h6 className='text-center mb-4'>Designed in Maine 2021 <i className="far fa-copyright"></i> <a href="https://github.com/davidparker333" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a></h6>
                </div>
            </Row>
        </div>
        )
    }
}
