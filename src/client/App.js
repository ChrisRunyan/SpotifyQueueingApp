import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginServer } from './actions/loginAction'
import { initAuthorization } from './actions/authAction'

class App extends Component {

  getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);

    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    return hashParams
  }

  componentWillMount() {
    const hashParams = this.getHashParams()
    if (!hashParams.access_token) {
      this.props.login()
    } else if (!this.props.access_token) {
      this.props.login(hashParams)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.access_token) {
      console.log(`nextProps: ${nextProps.access_token}`)
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
  scope: PropTypes.string,
  expires_in: PropTypes.string,
  token_type: PropTypes.string,
  login: PropTypes.func,
  authorize: PropTypes.func
}

const mapStateToProps = state => {
  return {
    access_token: state.login.access_token,
    refresh_token: state.login.refresh_token,
    scope: state.login.scope,
    expires_in: state.login.expires_in,
    token_type: state.login.token_type
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (authParams = null) => { dispatch(loginServer(authParams)) },
    authorize: (authParams) => { dispatch(initAuthorization(authParams)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
