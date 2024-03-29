import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import ClosedOpportunity from "../../components/ClosedOpportunity";
import ClosedOpportunityFooter from "../../components/ClosedOpportunityFooter";
import Event from "../../components/Event";
import LeadPreview from "../../components/LeadPreview";
import Opportunity from "../../components/Opportunity";
import api from "../../lib/api";

export default class CRMHome extends Component {
  constructor() {
    super();

    this.state = {
      leads: [],
      opportunities: [],
      closed_opps: [],
      value: 0,
      events: [],
      loading: false,
    };
  }

  dashInfo = async () => {
    await api
      .get("/crmhome")
      .then((data) => {
        this.setState({
          leads: data[0],
          opportunities: data[1],
          closed_opps: data[2],
          events: data[3],
        });
        var value = 0;
        for (let i = 0; i < data[2].length; i++) {
          value = value + data[2][i].value;
        }
        this.setState({
          value: value,
        });
      })
      .catch((e) => {
        this.props.addMessage(
          "Something doesn't look right. Please try again",
          "danger"
        );
      });
  };

  componentDidMount = async () => {
    this.setState({
      loading: true,
    });
    await this.dashInfo();
    this.setState({
      loading: false,
    });
  };

  render() {
    if (this.props.isLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Row className="mt-4">
          <div className="col-12 col-md-12 col-lg-8">
            <div className="card mb-2">
              <div className="card-body">
                <h4 className="card-title">Recent Leads</h4>
                <table className="table">
                  <thead className="thead">
                    <tr>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Phone #</th>
                      <th scope="col">Company</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.leads.map((lead, index) => (
                      <LeadPreview
                        key={index}
                        firstName={lead.first_name}
                        lastName={lead.last_name}
                        phoneNumber={lead.phone_number}
                        company={lead.business_name}
                        id={lead.id}
                      />
                    ))}
                  </tbody>
                </table>
                {!this.state.leads.length && !this.state.loading ? (
                  <div className="text-center my-2">
                    <h6>No Leads</h6>
                  </div>
                ) : (
                  ""
                )}
                <Link to="/leads" className="btn btn-primary">
                  Go to Leads
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-4">
            <div className="card mb-2">
              <div className="card-body">
                <h4 className="card-title">Today's Events</h4>
                <table className="table">
                  <thead className="thead">
                    <tr>
                      <th scope="col">Time</th>
                      <th scope="col">Event Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.events.map((event, index) => (
                      <Event
                        key={index}
                        time={event.date_time}
                        eventName={event.event_name}
                        id={event.id}
                      />
                    ))}
                  </tbody>
                </table>
                {!this.state.events.length && !this.state.loading ? (
                  <div className="text-center my-2">
                    <h6>No Events</h6>
                  </div>
                ) : (
                  ""
                )}
                <Link to="/events" className="btn btn-primary">
                  Go to Events
                </Link>
              </div>
            </div>
          </div>
        </Row>
        <Row className="lg-mt-5">
          <div className="col-12 col-md-12 col-lg-4">
            <div className="card mb-2">
              <div className="card-body">
                <h4 className="card-title">Closed Opportunities</h4>
                <table className="table">
                  <thead className="thead">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.closed_opps.map((opp, index) => (
                      <ClosedOpportunity
                        key={index}
                        value={opp.value}
                        company={opp.business_name}
                        id={opp.id}
                      />
                    ))}
                    {!this.state.closed_opps.length && !this.state.loading ? (
                      <tr>
                        <td colSpan="2">
                          <div className="text-center">
                            <h6 className="mb-0">No Closed Opportunities</h6>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </tbody>
                  <tfoot>
                    <ClosedOpportunityFooter total={this.state.value} />
                  </tfoot>
                </table>
                <Link to="/reports" className="btn btn-primary">
                  Go to Reports
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-8">
            <div className="card mb-2">
              <div className="card-body">
                <h4 className="card-title">Open Opportunities</h4>
                <table className="table">
                  <thead className="thead">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Company</th>
                      <th scope="col">Value</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.opportunities.map((opp, index) => (
                      <Opportunity
                        key={index}
                        firstName={opp.first_name}
                        lastName={opp.last_name}
                        value={opp.value}
                        company={opp.business_name}
                        id={opp.id}
                        status={opp.status}
                      />
                    ))}
                  </tbody>
                </table>
                {!this.state.opportunities.length && !this.state.loading ? (
                  <div className="text-center my-2">
                    <h6>No Open Opportunities</h6>
                  </div>
                ) : (
                  ""
                )}
                <Link to="/opportunities" className="btn btn-primary">
                  Go to Opportunities
                </Link>
              </div>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}
