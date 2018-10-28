import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux'

//This Class will control view of the come page for apollo
class HomeView extends React.Component {
  
  render(){

    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Apollo</h1>
      </header>
    
      <p className="App-intro">
        { this.props.title }
      </p>
      <button onClick={this.props.handleClick }>Create Room</button>
      <button >Join Room</button>
    </div>
    );
  }

}

export default (HomeView)