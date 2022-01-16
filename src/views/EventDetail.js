import React, { Component } from "react";
import { Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";
import api from "../lib/api";

export default class EventDetail extends Component {
  constructor() {
    super();

    this.state = {
      date: "",
      redirect: null,
      event: "",
      contact: "",
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
    let eventName = document.getElementById("eventEventName").value;
    if (
      document.getElementById("eventContactName").value.split(" ")[0] !== null
    ) {
      var firstName = document
        .getElementById("eventContactName")
        .value.split(" ")[0];
    } else {
      //eslint-disable-next-line
      var firstName = document.getElementById("eventContactName").value;
    }
    if (
      document.getElementById("eventContactName").value.split(" ").slice(1) !==
      null
    ) {
      var lastName = document
        .getElementById("eventContactName")
        .value.split(" ")
        .slice(1)
        .join(" ")
        .toString();
    } else {
      //eslint-disable-next-line
      var lastName = "";
    }
    const body = {
      date_time: this.state.date,
      first_name: firstName,
      last_name: lastName,
      event_name: eventName,
    };
    await api
      .post(`/edit/event/${id}`, body)
      .then((data) => {
        this.setState({
          event: data,
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

  setDateTime = (date) => {
    let time = date.toString().split(" ").slice(4, 6).join(" ");
    date = date.toString().split(" ").slice(0, 4).join(" ");
    let datetime = date + " " + time;
    if (document.getElementById("contact-info-group").disabled === false) {
      let selected = new Date(datetime);
      this.setState({
        date: selected,
      });
    }
  };

  delete = async () => {
    let id = this.props.match.params.id;
    await api
      ._delete(`/delete/event/${id}`)
      .then((data) => {
        if (data.status === "deleted") {
          this.props.addMessage("Event has been deleted.", "warning");
          this.setState({
            redirect: "/events",
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

  getEvent = async () => {
    let id = this.props.match.params.id;
    await api
      .get(`/events/${id}`)
      .then((data) => {
        this.setState({
          event: data,
          date: new Date(data.date_time),
          contact: data.first_name + " " + data.last_name,
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
    this.getEvent();
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
                      {this.state.event.event_name}
                    </h4>
                    {this.state.event.date_time ? (
                      <small>
                        <Moment fromNow>
                          {new Date(this.state.event.date_time)}
                        </Moment>
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
                        Event Options
                      </button>
                      <div class="dropdown-menu">
                        <button
                          className="dropdown-item"
                          href="/"
                          onClick={(e) => this.edit(e)}
                        >
                          Edit
                        </button>
                        <button className="dropdown-item" onClick={this.delete}>
                          Delete
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
                <h5 class="card-title">Event Time</h5>
                <form>
                  <fieldset id="contact-info-group" disabled>
                    <div class="form-group">
                      <label for="firstName">Date</label>
                      <br />
                      <DatePicker
                        selected={this.state.date}
                        className="form-control date-picker"
                        id="event-date-picker"
                        dateFormat="MM/dd/yyyy"
                        onChange={(date) => this.setDateTime(date)}
                      />
                    </div>
                    <div class="form-group">
                      <label for="lastName">Time</label>
                      <DatePicker
                        selected={this.state.date}
                        className="form-control"
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        onChange={(date) => this.setDateTime(date)}
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
                <h5 class="card-title">Event Details</h5>
                <form>
                  <fieldset id="lead-info-group" disabled>
                    <div class="form-group">
                      <label for="eventEventName">Event Name</label>
                      <input
                        type="text"
                        id="eventEventName"
                        class="form-control"
                        defaultValue={this.state.event.event_name}
                      />
                    </div>
                    <div class="form-group">
                      <label for="eventContactName">Contact</label>
                      <input
                        type="text"
                        id="eventContactName"
                        class="form-control"
                        defaultValue={this.state.contact}
                      />
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </Row>
        <Row className="mb-4">
          <div className="col-12" id="save-button-space"></div>
        </Row>
      </div>
    );
  }
}
