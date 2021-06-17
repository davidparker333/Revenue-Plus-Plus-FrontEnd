import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavbarLoggedIn extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <img src="../Logo/minlogowhite.png" alt="R++ Logo" className="mr-2" height="45" />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown-6" aria-controls="navbarNavDropdown-6"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mr-auto" id="navbarNavDropdown-6">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/home" data-toggle="collapse" data-target=".navbar-collapse.show">Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/leads" data-toggle="collapse" data-target=".navbar-collapse.show">Leads
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/opportunities" data-toggle="collapse" data-target=".navbar-collapse.show">Opportunities
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/events" data-toggle="collapse" data-target=".navbar-collapse.show">Events
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/reports" data-toggle="collapse" data-target=".navbar-collapse.show">Reports
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav">
            <li className="nav-item">
            <div className="btn-group">
              <button type="button" className="btn btn-light dropdown-toggle btn-squared mx-1 my-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-plus-square add-button"></i>
              </button>
              <div className="dropdown-menu">
                <Link to='/addlead' className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show">New Lead</Link>
              </div>
            </div>
                </li>
                <li className="nav-item">
                    <button type="button" className="btn btn-secondary btn-squared mx-1 my-1" onClick={this.props.handleLogout} data-toggle="collapse" data-target=".navbar-collapse.show">Log Out</button>
                </li>
            </ul>
          </div>
        </nav>
        )
    }
}
