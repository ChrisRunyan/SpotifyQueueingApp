import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';

import { connect } from 'react-redux'



class RoomView extends Component {

  state = {
    user:'guest'
  }
  


  render() {

        if(this.state.user === 'guest'){
        return(
            <div className="RoomView">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to Apollo</h1>
            </header>
          
            <p className="App-intro">
              Welcome Guest
            </p>
          </div>
        );
    
        }else{
            <div className="RoomView">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to Apollo</h1>
            </header>
          
            <p className="App-intro">
              Welcome Room Owner
            </p>
          </div>
        } 
    }

}


export default (RoomView)
