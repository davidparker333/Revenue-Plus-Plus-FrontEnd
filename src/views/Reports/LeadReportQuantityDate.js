import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Lead from "../../components/Lead";
import api from "../../lib/api";

export default class LeadReportQuantityDate extends Component {
  constructor() {
    super();

    this.state = {
      quantity: 0,
      startDate: "",
      endDate: "",
      leads: [],
      endDateDisplay: "",
      loading: false,
    };
  }

  setStartDate = (date) => {
    let newDate = new Date(date);
    this.setState({
      startDate: newDate,
    });
  };

  setEndDate = (date) => {
    let newDate = new Date(date);
    newDate = new Date(newDate.getTime() + 1 * 24 * 60 * 60 * 1000);
    this.setState({
      endDate: newDate,
      endDateDisplay: date,
    });
  };

  getLeads = async (e) => {
    this.setState({
      loading: true,
    });
    e.preventDefault();
    let startDate = this.state.startDate
      .toString()
      .split(" ")
      .slice(0, 4)
      .join(" ");
    let endDate = this.state.endDate
      .toString()
      .split(" ")
      .slice(0, 4)
      .join(" ");
    await api
      .get(`/reports/leadquantity?start_date=${startDate}&end_date=${endDate}`)
      .then((data) => {
        this.setState({
          leads: data[0],
          quantity: data[1],
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

  render() {
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
                    <h4 className="card-title">Lead Quantity by Date</h4>
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
                <form onSubmit={(e) => this.getLeads(e)}>
                  <fieldset id="lead-report-info-group">
                    <div class="form-group">
                      <label for="start-date">Start Date</label>
                      <br />
                      <DatePicker
                        selected={this.state.startDate}
                        className="form-control date-picker"
                        id="start-date"
                        dateFormat="MM/dd/yyyy"
                        onChange={(date) => this.setStartDate(date)}
                      />
                    </div>
                    <div class="form-group">
                      <label for="end-date">End Date</label>
                      <DatePicker
                        selected={this.state.endDateDisplay}
                        id="end-date"
                        className="form-control date-picker"
                        dateFormat="MM/dd/yyyy"
                        onChange={(date) => this.setEndDate(date)}
                      />
                    </div>
                  </fieldset>
                  <button className="btn btn-primary submit-btn" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-2">
            <div class="card">
              <div class="card-body">
                <h4>{this.state.quantity}</h4>
                <h5>Leads Created</h5>
              </div>
            </div>
          </div>
        </Row>
        <Row className="mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <Row className="mb-2">
                  <div className="col-6 col-md-8 col-lg-10">
                    <h4 className="card-title">Leads</h4>
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
