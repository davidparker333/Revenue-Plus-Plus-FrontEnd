import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router';
import Message from './components/Message'
import Navbar from './components/Navbar'
import NavbarLoggedIn from './components/NavbarLoggedIn';
import Home from './views/Home';

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

  
  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (<NavbarLoggedIn />) : (<Navbar />)}
        <Container>
        {this.state.message ? (<Message message={this.state.message} category={this.state.category} clearMessage={this.clearMessage} />) : (<div></div>)}
        <Switch>
          <Route exact path="/" render={() => <Home />} />
        </Switch>
        </Container>
      </div>
    )
  }
}
