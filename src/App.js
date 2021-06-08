import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router';
import Message from './components/Message'
import Navbar from './components/Navbar'
import NavbarLoggedIn from './components/NavbarLoggedIn';
import CRMHome from './views/CRMHome';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';

export default class App extends Component {
  constructor(){
    super();

    this.state = {
      message: null,
      category: null,
      isLoggedIn: false
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

  handleLogin = (e) => {
    this.setState({
      isLoggedIn: true
    })
    this.addMessage("You have successfully logged in!", 'success')
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false
    })
    this.addMessage("You have successfully logged out!", 'warning')
  }
  
  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (<NavbarLoggedIn handleLogout={this.handleLogout} />) : (<Navbar />)}
        <Container>
        {this.state.message ? (<Message message={this.state.message} category={this.state.category} clearMessage={this.clearMessage} />) : (<div></div>)}
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path='/login' render={() => <Login handleLogin={this.handleLogin} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/register' render={() => <Register addMessage={this.addMessage} />} />
          <Route exact path='/home' render={() => <CRMHome />} />
        </Switch>
        </Container>
      </div>
    )
  }
}
