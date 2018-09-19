import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from './actions/loginAction'
import { isNull } from 'util';

class App extends Component {
  componentWillMount() {
    this.props.login()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.access_token) {

    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          { this.props.access_token }
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
    access_token: state.login.accessToken,
    refresh_token: state.login.refreshToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => { dispatch(login()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
