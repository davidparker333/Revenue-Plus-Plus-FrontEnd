import React, { Component } from "react";
import { Row } from "react-bootstrap";
import Lead from "../../components/Lead";
import { Link, Redirect } from "react-router-dom";
import api from "../../lib/api";

export default class Leads extends Component {
  constructor() {
    super();

    this.state = {
      redirect: null,
      leads: [],
      loading: false,
    };
  }

  componentDidMount = () => {
    this.allOpenLeads();
  };

  allOpenLeads = async () => {
    await api
      .get("/allopenleads")
      .then((data) => {
        this.setState({
          leads: data,
        });
      })
      .catch((e) => {
        this.props.addMessage(
          "Something doesn't look right. Please try again",
          "danger"
        );
      });
  };

  thisMonthLeads = async () => {
    this.setState({
      loading: true,
    });
    await api
      .get("/openleadsthismonth")
      .then((data) => {
        this.setState({
          leads: data,
        });
      })
      .catch((e) => {
        this.props.addMessage(
          "Something doesn't look right. Please try again",
          "danger"
        );
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  hotLeads = async () => {
    this.setState({
      loading: true,
    });
    await api
      .get("/openhotleads")
      .then((data) => {
        this.setState({
          leads: data,
        });
      })
      .catch((e) => {
        this.props.addMessage(
          "Something doesn't look right. Please try again",
          "danger"
        );
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  hotLeadsThisMonth = async () => {
    this.setState({
      loading: true,
    });
    await api
      .get("/hotleadsthismonth")
      .then((data) => {
        this.setState({
          leads: data,
        });
      })
      .catch((e) => {
        this.props.addMessage(
          "Something doesn't look right. Please try again",
          "danger"
        );
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  toggle30Day = (e) => {
    if (
      e.target.checked &&
      document.getElementById("hottoggle").checked === false
    ) {
      this.thisMonthLeads();
    } else if (
      e.target.checked &&
      document.getElementById("hottoggle").checked === true
    ) {
      this.hotLeadsThisMonth();
    } else if (
      e.target.checked === false &&
      document.getElementById("hottoggle").checked === true
    ) {
      this.hotLeads();
    } else {
      this.allOpenLeads();
    }
  };

  toggleHot = (e) => {
    if (
      e.target.checked &&
      document.getElementById("30daytoggle").checked === false
    ) {
      this.hotLeads();
    } else if (
      e.target.checked &&
      document.getElementById("30daytoggle").checked === true
    ) {
      this.hotLeadsThisMonth();
    } else if (
      e.target.checked === false &&
      document.getElementById("30daytoggle").checked === true
    ) {
      this.thisMonthLeads();
    } else {
      this.allOpenLeads();
    }
  };

  redirect = (location) => {
    this.setState({
      redirect: location,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    if (this.props.isLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Row className="mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <Row className="mb-2">
                  <div className="col-6 col-md-8 col-lg-10">
                    <h4 className="card-title">Open Leads</h4>
                  </div>
                  <div className="col-6 col-md-4 col-lg-2">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-primary dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Lead Options
                      </button>
                      <div className="dropdown-menu">
                        <div className="dropdown-item">
                          <div className="custom-control custom-toggle my-2">
                            <input
                              type="checkbox"
                              id="30daytoggle"
                              name="30daytoggle"
                              className="custom-control-input"
                              onClick={(e) => this.toggle30Day(e)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="30daytoggle"
                            >
                              Last 30 Days
                            </label>
                          </div>
                        </div>
                        <div className="dropdown-item">
                          <div className="custom-control custom-toggle my-2">
                            <input
                              type="checkbox"
                              id="hottoggle"
                              name="hottoggle"
                              className="custom-control-input"
                              onClick={(e) => this.toggleHot(e)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="hottoggle"
                            >
                              Hot
                            </label>
                          </div>
                        </div>
                        <div className="dropdown-item">
                          <Link to="/addlead">New Lead</Link>
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
                      <th scope="col" className="d-none d-lg-block">
                        Hot Lead
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.leads.map((lead, index) => (
                      <Lead
                        key={index}
                        firstName={lead.first_name}
                        lastName={lead.last_name}
                        phoneNumber={lead.phone_number}
                        company={lead.business_name}
                        hot={lead.hot}
                        id={lead.id}
                      />
                    ))}
                  </tbody>
                </table>
                {!this.state.leads.length && !this.state.loading ? (
                  <div className="text-center my-2">
                    <h5>No Leads</h5>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}
