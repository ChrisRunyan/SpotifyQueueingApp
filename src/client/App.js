import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginSuccess } from './actions/loginAction'
import { fetchRoom, fetchSong, pushSong } from './actions/firebaseAction'

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
      window.location.href = '/api/login'
    } else {
      this.props.login(hashParams)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      console.log(`nextProps: ${nextProps.auth.access_token}`)
    }
  }

  componentDidMount() {
    this.props.getRoom("test_room")
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          { this.props.auth.access_token }
          { JSON.stringify(this.props.rooms) }
          {/* { this.props.getRoom("test_room") } */}
          {/* { this.props.getSong("test_song_1")} */}
          <button onClick={ () => this.props.addSong("test_room", "song3") } >Push song3</button>
        </p>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.objectOf(PropTypes.string),
  rooms: PropTypes.objectOf(PropTypes.string),
  songs: PropTypes.objectOf(PropTypes.string),
  login: PropTypes.func,
  getRoom: PropTypes.func,
  addSong: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    auth: state.login,
    rooms: state.firebase.rooms,
    songs: state.firebase.songs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (authParams = null) => { dispatch(loginSuccess(authParams)) },
    getRoom: (roomId) => { dispatch(fetchRoom(roomId)) },
    getSong: (songId) => { dispatch(fetchSong(songId)) },
    addSong: (roomId, songId) => { dispatch(pushSong(roomId, songId)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
