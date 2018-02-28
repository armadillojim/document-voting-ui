import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Status from '../status/Status';
import Voting from '../voting/Voting';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="jumbotron text-center">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to voting!</h1>
        </div>
        <div className="container">
          <Status />
          <Voting />
        </div>
      </div>
    );
  }
}

export default App;
