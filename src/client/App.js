import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginSuccess } from './actions/loginAction'
import { joinRoom, fetchSong, pushSong } from './actions/firebaseAction'
import { pausePlayback, resumePlayback } from './actions/spotifyAction'

import SongList from './components/SongList'

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
    this.props.joinRoom("test_room")
  }

  togglePlayback = () => {
    const access_token = this.props.auth.access_token
    if(this.props.isPlaying) {
      this.props.pause(access_token)
    } else {
      this.props.resume(access_token)
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
          <button onClick={ () => this.props.addSong("test_room", "song3") } >Push song 3</button>
          <button onClick={ this.togglePlayback } >Play/Pause</button> 
        </p>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.objectOf(PropTypes.string),
  room: PropTypes.objectOf(PropTypes.string),
  songs: PropTypes.objectOf(PropTypes.string),
  login: PropTypes.func,
  joinRoom: PropTypes.func,
  addSong: PropTypes.func,
  isPlaying: PropTypes.bool,
  pause: PropTypes.func,
  resume: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    auth: state.login,
    room: state.firebase.room,
    songs: state.firebase.songs,
    isPlaying: state.spotify.isPlaying,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (authParams = null) => { dispatch(loginSuccess(authParams)) },
    joinRoom: (roomId) => { dispatch(joinRoom(roomId)) },
    getSong: (songId) => { dispatch(fetchSong(songId)) },
    addSong: (roomId, songId) => { dispatch(pushSong(roomId, songId)) },
    pause: (token) => { dispatch(pausePlayback(token)) },
    resume: (token) => { dispatch(resumePlayback(token)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
