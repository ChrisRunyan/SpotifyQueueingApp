import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginSuccess } from './actions/loginAction'
import { joinRoom, fetchSong, pushSong } from './actions/firebaseAction'

import SongList from './components/SongList'
import SongControls from './components/SongControls'
import SongListItem from './components/SongListItem'
import { getCurrentPlaybackState } from './actions/spotifyAction';

import io from 'socket.io-client'

const socket = io({ path: '/ws' })

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
      //socket.emit('login')
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
    console.log("DidMount: Going to emit")
    socket.emit("ping")
    socket.emit('firebase-join', "test_room")
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Apollo Queue for Spotify</h1>
        </header>
        <button onClick={() => socket.emit("firebase-join", "test_room")} >Join</button>
        {/* <SongListItem>
          <SongControls />
        </SongListItem> */}
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
