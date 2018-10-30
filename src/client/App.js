import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginSuccess } from './actions/loginAction'
import { joinRoom, fetchSong, pushSong } from './actions/firebaseAction'

import SongList from './components/SongList'
import SongControls from './components/SongControls'
import { getCurrentPlaybackState } from './actions/spotifyAction';

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
    if(nextProps.auth.access_token) {
      this.props.readPlayback({ access_token: nextProps.auth.access_token })
    }
  }

  componentDidMount() {
    this.props.joinRoom("test_room")
    console.log(`[DidMount] Access Token: ${this.props.auth.access_token}`)
    // this.props.readPlayback({
    //   access_token: this.props.auth.access_token,
    //   refresh_token: this.props.auth.refresh_token
    // })
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
        </p>
        <SongControls />
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
  readPlayback: PropTypes.func,
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
    readPlayback: tokens => dispatch(getCurrentPlaybackState(tokens)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
