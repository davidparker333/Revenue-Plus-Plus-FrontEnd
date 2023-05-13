import React, { Component } from "react";
import { Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from "react-router-dom";
import api from "../../lib/api";

export default class LeadConvert extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date(),
      redirect: null,
      lead: "",
      contact: "",
      eventName: "",
    };
  }

  setDateTime = (date) => {
    let time = date.toString().split(" ").slice(4, 6).join(" ");
    date = date.toString().split(" ").slice(0, 4).join(" ");
    let datetime = date + " " + time;
    let selected = new Date(datetime);
    this.setState({
      date: selected,
    });
  };

  save = async () => {
    let id = this.props.match.params.id;
    let eventName = document.getElementById("convertEventName").value;
    if (
      document.getElementById("convertContactName").value.split(" ")[0] !== null
    ) {
      var firstName = document
        .getElementById("convertContactName")
        .value.split(" ")[0];
    } else {
      //eslint-disable-next-line
      var firstName = document.getElementById("convertContactName").value;
    }
    if (
      document
        .getElementById("convertContactName")
        .value.split(" ")
        .slice(1) !== null
    ) {
      var lastName = document
        .getElementById("convertContactName")
        .value.split(" ")
        .slice(1)
        .join(" ")
        .toString();
    } else {
      //eslint-disable-next-line
      var lastName = "";
    }
    const body = {
      event_name: eventName,
      date_time: this.state.date,
      first_name: firstName,
      last_name: lastName,
    };
    await api
      .post(`/convert/${id}`, body)
      .then((data) => {
        this.props.addMessage("Lead Converted Successfully", "success");
        this.setState({
          redirect: `/opportunities/${data[0].id}`,
        });
      })
      .catch((e) => {
        this.props.addMessage(
          "Something doesn't look right. Please try again",
          "danger"
        );
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
        let name = data.first_name + " " + data.last_name;
        this.setState({
          contact: name,
        });
        let eventName = "Meeting @ " + data.business_name;
        this.setState({
          eventName: eventName,
        });
      })
      .catch((e) => {
        this.props.addMessage(
          "Something doesn't look right. Please try again",
          "danger"
        );
      });
  };

  componentDidMount = () => {
    this.getLead();
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
                    <h4 className="card-title">Convert Lead</h4>
                    {this.state.lead.business_name ? (
                      <small>{this.state.lead.business_name}</small>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-6 col-md-4 col-lg-2">
                    <button className="btn btn-primary" onClick={this.save}>
                      Create Opportunity
                    </button>
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
                <h5 class="card-title">Meeting Time</h5>
                <form>
                  <fieldset id="contact-info-group">
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
                <h5 class="card-title">Meeting Details</h5>
                <form>
                  <fieldset id="lead-info-group">
                    <div class="form-group">
                      <label for="convertEventName">Event Name</label>
                      <input
                        type="text"
                        id="convertEventName"
                        class="form-control"
                        defaultValue={this.state.eventName}
                      />
                    </div>
                    <div class="form-group">
                      <label for="convertContactName">Contact</label>
                      <input
                        type="text"
                        id="convertContactName"
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
      </div>
    );
  }
}
