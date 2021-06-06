import React from 'react'

export default function Navbar() {
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
                <a className="nav-link" href="/">Home
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Features</a>
              </li>
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="https://designrevision.com" id="navbarDropdownMenuLink-6" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  Services
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink-6">
                  <a className="dropdown-item" href="/">Design</a>
                  <a className="dropdown-item" href="/">Development</a>
                  <a className="dropdown-item" href="/">Marketing</a>
                </div>
              </li> */}
            </ul>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <button type="button" className="btn btn-secondary btn-squared mx-1 my-1">Sign In</button>
                </li>
                <li className="nav-item">
                    <button type="button" className="btn btn-light btn-squared mx-1 my-1">Sign Up</button>
                </li>
            </ul>
          </div>
        </nav>
    )
}
