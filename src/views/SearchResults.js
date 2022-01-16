import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row } from "react-bootstrap";
import Lead from "../components/Lead";
import Opportunity from "../components/Opportunity";
import api from "../lib/api";

export default class SearchResults extends Component {
  constructor() {
    super();

    this.state = {
      leadResults: [],
      oppResults: [],
      search: "",
    };
  }

  search = async () => {
    let params = this.props.match.match.params.search;
    this.setState({
      search: params,
    });
    await api
      .get(`/search?search=${params}`)
      .then((data) => {
        this.setState({
          leadResults: data[0],
          oppResults: data[1],
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
    this.search();
  };

  componentDidUpdate = () => {
    if (this.props.match.match.params.search !== this.state.search) {
      this.search();
    }
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
                <h4 className="card-title">Lead Results</h4>
                <table className="table mt-3">
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
                    {this.state.leadResults.map((lead, index) => (
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
              </div>
            </div>
          </div>
        </Row>
        <Row className="mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Opportunity Results</h4>
                <table className="table mt-3">
                  <thead className="thead">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Company</th>
                      <th scope="col">Value</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.oppResults.map((opp, index) => (
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
              </div>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}
