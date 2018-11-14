import React, { Component } from 'react';
import './styles/App.css';

import { Table, Grid, Row, Col, PageHeader } from 'react-bootstrap';


<<<<<<< HEAD
import io from 'socket.io-client'

const socket = io({ path: '/ws' })

class App extends Component {

  getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
=======
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { loginSuccess } from './actions/loginAction'
// import { joinRoom, fetchSong, pushSong } from './actions/firebaseAction'
>>>>>>> b6dd6591896b741b64ca9bddd8cddb84455c318d

import Song from './components/Song'
import SongSearch from './components/SongSearch'
// import SongControls from './components/SongControls'
// import SongListItem from './components/SongListItem'
// import { getCurrentPlaybackState } from './actions/spotifyAction';

<<<<<<< HEAD
    return hashParams
  }

  componentWillMount() {
    const hashParams = this.getHashParams()
    if (!hashParams.access_token) {
      window.location.href = '/api/login'
      //socket.emit('login')
    } else {
      socket.emit('login')
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
=======
class App extends Component {
  state = {
    roomCode: "HJRA",
    songs: [
      {
        title: "Chicago",
        artist: "Sufjan Stevens",
        album: "Illinois",
        songLength: "6:05",
        votes: 5,
        id: 0
      },
      {
        title: "Dean Town",
        artist: "Vulfpeck",
        album: "The Beautiful Game",
        songLength: "3:33",
        votes: 3,
        id: 1
      },
      {
        title: "What I Got",
        artist: "Sublime",
        album: "Sublime",
        songLength: "2:51",
        votes: 0,
        id: 2
      },
    ]
  };

  render() {
    return(
      <Grid>
          <PageHeader>
            <Row>
              <Col md={9}>
                Apollo
              </Col>
              <Col md= {3}>
                <small> Room Code: {this.state.roomCode}</small>
              </Col>
            </Row>
            </PageHeader>
            <Row>
              <SongSearch />
            </Row>
            <Row>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Length</th>
                    <th>Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Song list */}
                  {this.state.songs.map( (song, index) =>
                  <Song 
                  title = {song.title}
                  artist = {song.artist}
                  album = {song.album}
                  songLength = {song.songLength}
                  votes = {song.votes}
                  id = {song.id}
                  key={song.id.toString()} 
                  index = {index}
                  />
                  )}
                </tbody>
              </Table>
            
            </Row>
      </Grid>
      
    )
>>>>>>> b6dd6591896b741b64ca9bddd8cddb84455c318d
  }
}

export default App;