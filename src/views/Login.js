import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  validateForm = (e) => {
    if (e.target.username.value && e.target.password.value) {
      return true;
    } else {
      this.props.addMessage(
        "Check your username / password and try again.",
        "danger"
      );
      return false;
    }
  };

  loginHelper = async (e) => {
    e.preventDefault();
    this.props.isLoading();
    if (this.validateForm(e)) {
      await this.props.handleLogin(e);
    }
    this.props.isNotLoading();
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        <Row className="d-flex flex-row justify-content-center mt-5">
          <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center flex-column">
            <img
              src="https://res.cloudinary.com/dbqwjxuhv/image/upload/v1623086023/Login-Logo_fj5l58.png"
              alt="..."
              className="login-logo mt-5"
            />
          </div>
        </Row>
        <Row className="d-flex flex-row justify-content-center mt-2 mb-4">
          <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center flex-column">
            <form onSubmit={(e) => this.loginHelper(e)} action="" method="">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="usernameInput"
                  name="username"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  name="password"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-squared">
                Submit
              </button>
            </form>
          </div>
        </Row>
      </div>
    );
  }
}
