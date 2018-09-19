import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from './actions/loginAction'

class App extends Component {
  componentWillMount() {
    this.props.login()
  }

  componentWillReceiveProps() {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

App.propTypes = {
  access_token: PropTypes.string,
  refresh_token: PropTypes.string,
  login: PropTypes.func
}

const mapStateToProps = state => {
  return {
    access_token: state.access_token,
    refresh_token: state.refresh_token
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    login: () => { dispatch(login()) }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
