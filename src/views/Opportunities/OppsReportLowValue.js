import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row } from "react-bootstrap";
import Opportunity from "../../components/Opportunity";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import api from "../../lib/api";

export default class OppsReportLowValue extends Component {
  constructor() {
    super();

    this.state = {
      opps: [],
      value: 150,
      loading: false,
    };
  }

  updateValue = (e) => {
    let value = parseInt(e[0]);
    this.setState({
      value: value,
    });
    this.getOpps();
  };

  getOpps = async () => {
    this.setState({
      loading: true,
    });
    await api
      .get(`/reports/lowvalueopps?value=${this.state.value}`)
      .then((data) => {
        this.setState({
          opps: data,
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

  componentDidMount = () => {
    this.getOpps();
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
                    <h4 className="card-title">Low Value Opportunities</h4>
                  </div>
                </Row>
                <Row className="my-3">
                  <div className="col-12">
                    <h6>Threshold:</h6>
                  </div>
                </Row>
                <Row>
                  <div className="col-12">
                    <Nouislider
                      range={{ min: 0, max: 500 }}
                      start={[150]}
                      tooltips={true}
                      step={50}
                      connect
                      onChange={(e) => this.updateValue(e)}
                      id="slider"
                      className="mx-4"
                    />
                  </div>
                </Row>
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
                    {this.state.opps.map((opp, index) => (
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
                {!this.state.opps.length && !this.state.loading ? (
                  <div className="text-center my-2">
                    <h5>No Opportunities</h5>
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
