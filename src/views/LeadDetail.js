import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Activity from "../components/Activity";
import Moment from "react-moment";
import api from "../lib/api";

export default class LeadDetail extends Component {
  constructor() {
    super();

    this.state = {
      redirect: null,
      lead: "",
      activity: [],
    };
  }

  edit = (e) => {
    e.preventDefault();
    document.getElementById("contact-info-group").disabled = false;
    document.getElementById("lead-info-group").disabled = false;
    let btn = document.createElement("button");
    btn.classList.add("btn", "btn-primary", "save-btn", "my-3");
    btn.setAttribute("id", "save-btn");
    let t = document.createTextNode("Save");
    btn.appendChild(t);
    document.getElementById("save-button-space").appendChild(btn);
    document.getElementById("save-btn").addEventListener("click", this.save);
  };

  save = async () => {
    let id = this.props.match.params.id;
    let firstName = document.getElementById("leadDetailFirstName").value;
    let lastName = document.getElementById("leadDetailLastName").value;
    let phoneNumber = document.getElementById("leadDetailPhoneNumber").value;
    let cellPhoneNumber = document.getElementById(
      "leadDetailCellPhoneNumber"
    ).value;
    let businessName = document.getElementById("leadDetailBusinessName").value;
    let address = document.getElementById("leadDetailAddress").value;
    let status = document.getElementById("leadDetailStatus").value;
    let hot = document.getElementById("leadDetailHot").checked;
    const body = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      cell_phone_number: cellPhoneNumber,
      business_name: businessName,
      address: address,
      status: status,
      hot: hot,
    };
    await api
      .post(`/edit/lead/${id}`, body)
      .then((data) => {
        this.setState({
          lead: data,
        });
      })
      .catch((e) => {
        console.log(e);
        this.props.addMessage(
          "Something doesn't look right. Please try again",
          "danger"
        );
      });
    document.getElementById("contact-info-group").disabled = true;
    document.getElementById("lead-info-group").disabled = true;
    document.getElementById("save-button-space").innerHTML = "";
  };

  delete = async () => {
    let id = this.props.match.params.id;
    await api
      .post(`/delete/lead/${id}`)
      .then((data) => {
        if (data.status === "deleted") {
          this.props.addMessage("Lead has been closed.", "warning");
          this.setState({
            redirect: "/leads",
          });
        }
      })
      .catch((e) => {
        console.log(e);
        this.props.addMessage(
          "Something doesn't look right. Please try again",
          "danger"
        );
      });
  };

  convert = () => {
    this.setState({
      redirect: `/convert/lead/${this.props.match.params.id}`,
    });
  };

  getLead = async () => {
    let id = this.props.match.params.id;
    await api
      .get(`/leads/${id}`)
      .then((data) => {
        this.setState({
          lead: data,
        });
        this.hotOrNot();
      })
      .catch((e) => {
        console.log(e);
        this.props.addMessage(
          "Something doesn't look right. Please try again",
          "danger"
        );
      });
  };

  getActivity = async () => {
    let id = this.props.match.params.id;
    await api
      .get(`/getactivity/lead/${id}`)
      .then((data) => {
        this.setState({
          activity: data,
        });
      })
      .catch((e) => {
        console.log(e);
        this.props.addMessage(
          "Something doesn't look right. Please try again",
          "danger"
        );
      });
  };

  componentDidMount = () => {
    this.getLead();
    this.getActivity();
  };

  hotOrNot = () => {
    if (this.state.lead.hot === true) {
      document.getElementById("leadDetailHot").checked = true;
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
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
                    <h4 className="card-title">
                      {this.state.lead.business_name}
                    </h4>
                    {this.state.lead.date_created ? (
                      <small>
                        Created{" "}
                        <Moment fromNow>{this.state.lead.date_created}</Moment>
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-6 col-md-4 col-lg-2">
                    <div className="btn-group">
                      <button
                        type="button"
                        class="btn btn-primary dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Lead Options
                      </button>
                      <div class="dropdown-menu">
                        <button
                          className="dropdown-item"
                          onClick={(e) => this.edit(e)}
                        >
                          Edit
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={this.convert}
                        >
                          Convert to Opportunity
                        </button>
                        <button className="dropdown-item" onClick={this.delete}>
                          Closed Lost
                        </button>
                      </div>
                    </div>
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </Row>
        <Row className="mt-4">
          <div className="col-12 col-md-6 mb-2">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Contact Info</h5>
                <form>
                  <fieldset id="contact-info-group" disabled>
                    <div class="form-group">
                      <label htmlFor="leadDetailFirstName">First Name</label>
                      <input
                        type="text"
                        id="leadDetailFirstName"
                        class="form-control"
                        defaultValue={this.state.lead.first_name}
                      />
                    </div>
                    <div class="form-group">
                      <label htmlFor="leadDetailLastName">Last Name</label>
                      <input
                        type="text"
                        id="leadDetailLastName"
                        class="form-control"
                        defaultValue={this.state.lead.last_name}
                      />
                    </div>
                    <div class="form-group">
                      <label htmlFor="leadDetailPhoneNumber">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="leadDetailPhoneNumber"
                        class="form-control"
                        defaultValue={this.state.lead.phone_number}
                      />
                    </div>
                    <div class="form-group">
                      <label htmlFor="leadDetailCellPhoneNumber">
                        Cell Phone Number
                      </label>
                      <input
                        type="text"
                        id="leadDetailCellPhoneNumber"
                        class="form-control"
                        defaultValue={this.state.lead.cell_phone_number}
                      />
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-2">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Lead Info</h5>
                <form>
                  <fieldset id="lead-info-group" disabled>
                    <div class="form-group">
                      <label htmlFor="leadDetailBusinessName">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="leadDetailBusinessName"
                        class="form-control"
                        defaultValue={this.state.lead.business_name}
                      />
                    </div>
                    <div class="form-group">
                      <label htmlFor="leadDetailAddress">Address</label>
                      <input
                        type="text"
                        id="leadDetailAddress"
                        class="form-control"
                        defaultValue={this.state.lead.address}
                      />
                    </div>
                    <div class="form-group">
                      <label htmlFor="leadDetailStatus">Status</label>
                      <select id="leadDetailStatus" class="form-control">
                        <option hidden>{this.state.lead.status}</option>
                        <option>Pending</option>
                        <option>Contact Attempted</option>
                        <option>GK Reached</option>
                        <option>DM Reached</option>
                        <option>Meeting Pending</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="leadDetailHot"
                        />
                        <label
                          class="custom-control-label"
                          htmlFor="leadDetailHot"
                        >
                          Hot Lead
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <div className="col-12" id="save-button-space"></div>
        </Row>
        <Row className="mb-4">
          <div className="col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Activity</h5>
                <table className="table">
                  <thead className="thead">
                    <tr>
                      <th scope="col">Type</th>
                      <th scope="col">Date</th>
                      <th scope="col">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.activity.map((activity, index) => (
                      <Activity
                        key={index}
                        type={activity.type}
                        date={activity.date}
                        notes={activity.notes}
                      />
                    ))}
                  </tbody>
                </table>
                <Link
                  to={`/logactivity/lead/${this.props.match.params.id}`}
                  className="btn btn-primary"
                >
                  Log Activity
                </Link>
              </div>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}
