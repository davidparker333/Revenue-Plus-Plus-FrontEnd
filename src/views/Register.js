import React, { Component } from 'react'
import { Row } from 'react-bootstrap';
import { Redirect } from 'react-router';

export default class Register extends Component {
    constructor() {
        super();

        this.state = {
            redirect: null
        }
    }

    validateEmail = (email) => {
        // eslint-disable-next-line
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validateUsername = (username) => {
        // eslint-disable-next-line
        const re = /^[0-9a-zA-Z_.-]+$/;
        return re.test(username)
    }

    validateForm = (email, username, password, confirmPassword) => {
        if (this.validateEmail(email) === false) {
            this.props.addMessage('Please check your email address and try again.', 'danger');
            return false
        } else if (this.validateUsername(username) === false) {
            this.props.addMessage('Please check your username and try again.', 'danger');
            return false
        } else if (password !== confirmPassword) {
            this.props.addMessage('Please make sure your passwords match and try again.', 'danger');
            return false
        } else {
            return true
        }
    }

    handleRegister = (e) => {
        e.preventDefault();
        let email = e.target.email.value.toLowerCase();
        let username = e.target.username.value.toLowerCase();
        let password = e.target.password.value;
        let confirmPassword = e.target.confirmpassword.value;
        if (this.validateForm(email, username, password, confirmPassword)) {
            this.setState({
                redirect: '/login'
            })
            this.props.addMessage('You have successfully registered! Please log in.', 'success')
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <Row className="d-flex flex-row justify-content-center mt-5">
                    <div className='col-12 col-sm-6 col-md-4 d-flex justify-content-center flex-column'>
                        <img src="https://res.cloudinary.com/dbqwjxuhv/image/upload/v1623086022/Register-Logo_met5jl.png" alt="..." className='login-logo mt-5' />
                    </div>
                </Row>
                <Row className="d-flex flex-row justify-content-center mt-2">
                    <div className='col-12 col-sm-6 col-md-4 d-flex justify-content-center flex-column'>
                    <form onSubmit={(e) => this.handleRegister(e)} action="" method="">
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" name="email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" id="usernameInput" name="username" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" id="passwordInput" name="password" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPasswordInput" name="confirmpassword" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-squared">Submit</button>
                        </form>
                    </div>
                </Row>
            </div>
        )
    }
}
