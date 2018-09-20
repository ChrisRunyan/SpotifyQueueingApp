import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login, loginServer } from './actions/loginAction'
import { isNull } from 'util';

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
    } else {
      //do nothing yet
      console.log(`Hash Params: ${JSON.stringify(hashParams)}`)
    }
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
    login: () => { dispatch(loginServer()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
