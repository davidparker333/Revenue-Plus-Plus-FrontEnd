import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router';
import Message from './components/Message'
import Navbar from './components/Navbar'
import NavbarLoggedIn from './components/NavbarLoggedIn';
import Searchbar from './components/Searchbar';
import CRMHome from './views/CRMHome';
import Events from './views/Events';
import Home from './views/Home';
import LeadDetail from './views/LeadDetail';
import Leads from './views/Leads';
import AddLead from './views/AddLead';
import Login from './views/Login';
import Opportunities from './views/Opportunities';
import OpportunityDetail from './views/OpportunityDetail';
import EventDetail from './views/EventDetail';
import Register from './views/Register';
import Reports from './views/Reports';
import LogActivityLead from './views/LogActivityLead';
import LogActivityOpportunity from './views/LogActivityOpportunity';
import LeadConvert from './views/LeadConvert';
import MeetingHeld from './views/MeetingHeld';
import CreateEvent from './views/CreateEvent';
import CreateEventOpp from './views/CreateEventOpp';
import SearchResults from './views/SearchResults';
import LeadReportClosedLost from './views/LeadReportClosed';
import OppReportClosedWon from './views/OppReportClosedWon';
import Features from './views/Features';

export default class App extends Component {
  constructor(){
    super();

    this.state = {
      message: null,
      category: null,
      isLoggedIn: localStorage.getItem('token') !== null,
      tokenExpiration: null
    }
  }

  addMessage = (message, category) => {
    this.setState({
      message: message,
      category: category
    })
  }

  clearMessage = () => {
    this.setState({
      message: null,
      category: null
    })
  }

  handleLogin = async (e) => {
    let username = e.target.username.value;
    let password = e.target.password.value;
    await fetch('https://revenue-plus-plus.herokuapp.com/api/login', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json",
        "Accept":"*/*",
        "Authorization": "Basic " + btoa(`${username}:${password}`)
      }
    }).then(res => res.json())
      .then(data => {
        localStorage.setItem('token', data.token)
        this.addMessage("You have successfully logged in!", 'success')
        this.setState({
          isLoggedIn: true,
          tokenExpiration: new Date(data.expiration)
        })
      }).catch(e => {
        console.log(e)
        this.addMessage("Check your username / password and try again.", 'danger')
      })
  }

  checkToken = () => {
    if (this.state.isLoggedIn === true) {
      if (new Date() > this.state.tokenExpiration || localStorage.getItem('token') === null) {
        this.sessionTimeout();
      }
    }
    setTimeout(this.checkToken, 60000)
  }
  
  componentDidMount = () => {
  this.checkToken()
  }


  handleLogout = () => {
    localStorage.removeItem('token');
    this.addMessage("You are now logged out.", 'warning');
    this.setState({
      isLoggedIn: false
    })
  }

  sessionTimeout = () => {
    localStorage.removeItem('token');
    this.setState({
      isLoggedIn: false
    })
    window.location.reload();
  }
  
  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (<NavbarLoggedIn handleLogout={this.handleLogout} />) : (<Navbar />)}
        <Container>
        {this.state.message ? (<Message message={this.state.message} category={this.state.category} clearMessage={this.clearMessage} />) : (<div></div>)}
        {this.state.isLoggedIn ? (<Searchbar/>) : (<div></div>)}
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/features" render={() => <Features />} />
          <Route exact path='/login' render={() => <Login handleLogin={this.handleLogin} isLoggedIn={this.state.isLoggedIn} addMessage={this.addMessage} />} />
          <Route exact path='/register' render={() => <Register addMessage={this.addMessage} />} />
          <Route exact path='/home' render={() => <CRMHome isLoggedIn={this.state.isLoggedIn} addMessage={this.addMessage} />} />
          <Route exact path='/leads' render={() => <Leads addMessage={this.addMessage} sessionTimeout={this.sessionTimeout} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/leads/:id' render={({match}) => <LeadDetail match={match} addMessage={this.addMessage} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/addlead' render={() => <AddLead addMessage={this.addMessage} userID={this.state.userID} sessionTimeout={this.sessionTimeout} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/logactivity/lead/:id' render={({match}) => <LogActivityLead match={match} addMessage={this.addMessage} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/convert/lead/:id' render={({match}) => <LeadConvert match={match} addMessage={this.addMessage} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/opportunities' render={() => <Opportunities isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/opportunities/:id' render={({match}) => <OpportunityDetail match={match} addMessage={this.addMessage} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/logactivity/opportunity/:id' render={({match}) => <LogActivityOpportunity match={match} addMessage={this.addMessage} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/meetingheld/:id' render={({match}) => <MeetingHeld match={match} addMessage={this.addMessage} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/events' render={() => <Events isLoggedIn={this.state.isLoggedIn} addMessage={this.addMessage} />} />
          <Route exact path='/events/:id' render={({match}) => <EventDetail match={match} addMessage={this.addMessage} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/addevent' render={() => <CreateEvent addMessage={this.addMessage} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/addevent/:id' render={({match}) => <CreateEventOpp match={match} addMessage={this.addMessage} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/reports' render={() => <Reports isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/reports/leads/closed' render={() => <LeadReportClosedLost isLoggedIn={this.state.isLoggedIn} addMessage={this.addMessage} />} />
          <Route exact path='/reports/opportunities/closedwon' render={() => <OppReportClosedWon isLoggedIn={this.state.isLoggedIn} addMessage={this.addMessage} />} />
          <Route exact path='/search/:search' render={(match) => <SearchResults isLoggedIn={this.state.isLoggedIn} match={match} addMessage={this.addMessage} />} />
        </Switch>
        </Container>
      </div>
    )
  }
}
