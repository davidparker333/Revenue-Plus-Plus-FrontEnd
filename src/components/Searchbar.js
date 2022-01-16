import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";

export default class Searchbar extends Component {
  constructor() {
    super();

    this.state = {
      redirect: null,
      search: "",
    };
  }

  search = () => {
    let params = document.getElementById("searchBar").value;
    this.setState({
      search: params,
    });
  };

  clearBar = () => {
    document.getElementById("searchBar").value = "";
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Row>
        <div className="col-12">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="searchBar"
              onChange={this.search}
              placeholder="Search by Business Name"
              autoComplete="none"
            />
            <div className="input-group-append">
              <Link to={`/search/${this.state.search}`}>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={this.clearBar}
                >
                  <i className="fa fa-search"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Row>
    );
  }
}
