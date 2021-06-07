import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            redirect: null
        }
    }

    loginHelper = (e) => {
        e.preventDefault();
        this.props.handleLogin(e)
        this.setState({
            redirect: '/'
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <Row className="d-flex flex-row justify-content-center mt-5">
                    <div className='col-12 col-sm-6 col-md-4 d-flex justify-content-center flex-column'>
                        <img src="https://res.cloudinary.com/dbqwjxuhv/image/upload/v1623086023/Login-Logo_fj5l58.png" alt="..." className='login-logo mt-5' />
                    </div>
                </Row>
                <Row className="d-flex flex-row justify-content-center mt-2">
                    <div className='col-12 col-sm-6 col-md-4 d-flex justify-content-center flex-column'>
                    <form onSubmit={(e) => this.loginHelper(e)} action="" method="">
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" id="passwordInput" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-squared">Submit</button>
                        </form>
                    </div>
                </Row>
            </div>
        )
    }
}
