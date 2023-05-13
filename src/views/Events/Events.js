import React, { Component } from "react";
import { Row } from "react-bootstrap";
import EventPage from "../../components/EventPage";
import { Redirect } from "react-router-dom";
import api from "../../lib/api";

export default class Events extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      loading: false,
    };
  }

  getEvents = async () => {
    this.setState({
      loading: true,
    });
    await api
      .get("/allevents")
      .then((data) => {
        this.setState({
          events: data,
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

  get7DayEvents = async () => {
    this.setState({
      loading: true,
    });
    await api
      .get("/eventsthisweek")
      .then((data) => {
        this.setState({
          events: data,
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

  toggle7Day = (e) => {
    if (e.target.checked === true) {
      this.get7DayEvents();
    } else {
      this.getEvents();
    }
  };

  componentDidMount = () => {
    this.getEvents();
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
                    <h4 className="card-title">Upcoming Events</h4>
                  </div>
                  <div className="col-6 col-md-4 col-lg-2">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-primary dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        View Options
                      </button>
                      <div class="dropdown-menu">
                        <div class="dropdown-item">
                          <div className="custom-control custom-toggle my-2">
                            <input
                              type="checkbox"
                              id="customToggle2"
                              name="customToggle2"
                              className="custom-control-input"
                              onClick={(e) => this.toggle7Day(e)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customToggle2"
                            >
                              This Week
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
                <table className="table">
                  <thead className="thead">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Event</th>
                      <th scope="col">With</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.events.map((event, index) => (
                      <EventPage
                        key={index}
                        date={new Date(event.date_time).toString()}
                        meetingName={event.event_name}
                        contact={event.first_name + " " + event.last_name}
                        id={event.id}
                      />
                    ))}
                  </tbody>
                </table>
                {!this.state.events.length && !this.state.loading ? (
                  <div className="text-center my-2">
                    <h5>No Events</h5>
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
