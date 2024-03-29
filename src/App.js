import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router";
import Message from "./components/Message";
import Navbar from "./components/Navbar";
import NavbarLoggedIn from "./components/NavbarLoggedIn";
import Searchbar from "./components/Searchbar";
import CRMHome from "./views/Dashboard/CRMHome";
import Events from "./views/Events/Events";
import Home from "./views/Home";
import LeadDetail from "./views/Leads/LeadDetail";
import Leads from "./views/Leads/Leads";
import AddLead from "./views/Leads/AddLead";
import Login from "./views/Login";
import Opportunities from "./views/Opportunities/Opportunities";
import OpportunityDetail from "./views/Opportunities/OpportunityDetail";
import EventDetail from "./views/Events/EventDetail";
import Register from "./views/Register";
import Reports from "./views/Reports/Reports";
import LogActivityLead from "./views/Leads/LogActivityLead";
import LogActivityOpportunity from "./views/Opportunities/LogActivityOpportunity";
import LeadConvert from "./views/Leads/LeadConvert";
import MeetingHeld from "./views/Opportunities/MeetingHeld";
import CreateEvent from "./views/Events/CreateEvent";
import CreateEventOpp from "./views/Leads/CreateEventOpp";
import SearchResults from "./views/Dashboard/SearchResults";
import LeadReportClosedLost from "./views/Reports/LeadReportClosed";
import OppReportClosedWon from "./views/Opportunities/OppReportClosedWon";
import Features from "./views/Features";
import OppReportClosedLost from "./views/Reports/OppReportClosedLost";
import OppReportHighValue from "./views/Opportunities/OppReportHighValue";
import OppsReportLowValue from "./views/Opportunities/OppsReportLowValue";
import LeadReportConverted from "./views/Reports/LeadReportConverted";
import LeadReportClosedHot from "./views/Reports/LeadReportClosedHot";
import LeadReportQuantityDate from "./views/Reports/LeadReportQuantityDate";
import Load from "./components/Load";
import api from "./lib/api";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      message: null,
      category: null,
      isLoggedIn: localStorage.getItem("token") !== null,
      tokenExpiration: null,
      loading: false,
    };
  }

  addMessage = (message, category) => {
    this.setState({
      message: message,
      category: category,
    });
  };

  clearMessage = () => {
    this.setState({
      message: null,
      category: null,
    });
  };

  isLoading = () => {
    this.setState({
      loading: true,
    });
  };

  isNotLoading = () => {
    this.setState({
      loading: false,
    });
  };

  componentDidUpdate = () => {
    let spinner = document.getElementById("load-spinner");
    if (this.state.loading) {
      spinner.style.display = "flex";
    } else {
      spinner.style.display = "none";
    }
  };

  handleLogin = async (e) => {
    let username = e.target.username.value;
    let password = e.target.password.value;
    await api
      .login(username, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        this.addMessage("You have successfully logged in!", "success");
        this.setState({
          isLoggedIn: true,
          tokenExpiration: new Date(data.expiration),
        });
      })
      .catch((e) => {
        this.addMessage(
          "Check your username / password and try again.",
          "danger"
        );
      });
  };

  checkToken = () => {
    if (this.state.isLoggedIn === true) {
      if (
        new Date() > this.state.tokenExpiration ||
        localStorage.getItem("token") === null
      ) {
        this.sessionTimeout();
      }
    }
    // Check token expiration periodically
    setTimeout(this.checkToken, 1800);
  };

  componentDidMount = () => {
    this.checkToken();
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.addMessage("You are now logged out.", "warning");
    this.setState({
      isLoggedIn: false,
    });
  };

  sessionTimeout = () => {
    localStorage.removeItem("token");
    this.setState({
      isLoggedIn: false,
    });
    window.location.reload();
  };

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <NavbarLoggedIn handleLogout={this.handleLogout} />
        ) : (
          <Navbar />
        )}
        <Container>
          <Load />
          {this.state.message ? (
            <Message
              message={this.state.message}
              category={this.state.category}
              clearMessage={this.clearMessage}
            />
          ) : (
            <div></div>
          )}
          {this.state.isLoggedIn ? <Searchbar /> : <div></div>}
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/features" render={() => <Features />} />
            <Route
              exact
              path="/login"
              render={() => (
                <Login
                  handleLogin={this.handleLogin}
                  isLoggedIn={this.state.isLoggedIn}
                  addMessage={this.addMessage}
                  isLoading={this.isLoading}
                  isNotLoading={this.isNotLoading}
                />
              )}
            />
            <Route
              exact
              path="/register"
              render={() => <Register addMessage={this.addMessage} />}
            />
            <Route
              exact
              path="/home"
              render={() => (
                <CRMHome
                  isLoggedIn={this.state.isLoggedIn}
                  addMessage={this.addMessage}
                />
              )}
            />
            <Route
              exact
              path="/leads"
              render={() => (
                <Leads
                  addMessage={this.addMessage}
                  sessionTimeout={this.sessionTimeout}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/leads/:id"
              render={({ match }) => (
                <LeadDetail
                  match={match}
                  addMessage={this.addMessage}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/addlead"
              render={() => (
                <AddLead
                  addMessage={this.addMessage}
                  userID={this.state.userID}
                  sessionTimeout={this.sessionTimeout}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/logactivity/lead/:id"
              render={({ match }) => (
                <LogActivityLead
                  match={match}
                  addMessage={this.addMessage}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/convert/lead/:id"
              render={({ match }) => (
                <LeadConvert
                  match={match}
                  addMessage={this.addMessage}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/opportunities"
              render={() => (
                <Opportunities isLoggedIn={this.state.isLoggedIn} />
              )}
            />
            <Route
              exact
              path="/opportunities/:id"
              render={({ match }) => (
                <OpportunityDetail
                  match={match}
                  addMessage={this.addMessage}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/logactivity/opportunity/:id"
              render={({ match }) => (
                <LogActivityOpportunity
                  match={match}
                  addMessage={this.addMessage}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/meetingheld/:id"
              render={({ match }) => (
                <MeetingHeld
                  match={match}
                  addMessage={this.addMessage}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/events"
              render={() => (
                <Events
                  isLoggedIn={this.state.isLoggedIn}
                  addMessage={this.addMessage}
                />
              )}
            />
            <Route
              exact
              path="/events/:id"
              render={({ match }) => (
                <EventDetail
                  match={match}
                  addMessage={this.addMessage}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/addevent"
              render={() => (
                <CreateEvent
                  addMessage={this.addMessage}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/addevent/:id"
              render={({ match }) => (
                <CreateEventOpp
                  match={match}
                  addMessage={this.addMessage}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/reports"
              render={() => <Reports isLoggedIn={this.state.isLoggedIn} />}
            />
            <Route
              exact
              path="/reports/leads/closed"
              render={() => (
                <LeadReportClosedLost
                  isLoggedIn={this.state.isLoggedIn}
                  addMessage={this.addMessage}
                />
              )}
            />
            <Route
              exact
              path="/reports/leads/converted"
              render={() => (
                <LeadReportConverted
                  isLoggedIn={this.state.isLoggedIn}
                  addMessage={this.addMessage}
                />
              )}
            />
            <Route
              exact
              path="/reports/leads/closedhot"
              render={() => (
                <LeadReportClosedHot
                  isLoggedIn={this.state.isLoggedIn}
                  addMessage={this.addMessage}
                />
              )}
            />
            <Route
              exact
              path="/reports/leads/quantity"
              render={() => (
                <LeadReportQuantityDate
                  isLoggedIn={this.state.isLoggedIn}
                  addMessage={this.addMessage}
                />
              )}
            />
            <Route
              exact
              path="/reports/opportunities/closedwon"
              render={() => (
                <OppReportClosedWon
                  isLoggedIn={this.state.isLoggedIn}
                  addMessage={this.addMessage}
                />
              )}
            />
            <Route
              exact
              path="/reports/opportunities/closedlost"
              render={() => (
                <OppReportClosedLost
                  isLoggedIn={this.state.isLoggedIn}
                  addMessage={this.addMessage}
                />
              )}
            />
            <Route
              exact
              path="/reports/opportunities/highvalue"
              render={() => (
                <OppReportHighValue
                  isLoggedIn={this.state.isLoggedIn}
                  addMessage={this.addMessage}
                />
              )}
            />
            <Route
              exact
              path="/reports/opportunities/lowvalue"
              render={() => (
                <OppsReportLowValue
                  isLoggedIn={this.state.isLoggedIn}
                  addMessage={this.addMessage}
                />
              )}
            />
            <Route
              exact
              path="/search/:search"
              render={(match) => (
                <SearchResults
                  isLoggedIn={this.state.isLoggedIn}
                  match={match}
                  addMessage={this.addMessage}
                />
              )}
            />
          </Switch>
        </Container>
      </div>
    );
  }
}
