import React, { Component } from 'react';
import './styles/App.css';

import { Table, Grid, Row, Col, PageHeader } from 'react-bootstrap';


// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { loginSuccess } from './actions/loginAction'
// import { joinRoom, fetchSong, pushSong } from './actions/firebaseAction'

import Song from './components/Song'
import SongSearch from './components/SongSearch'
// import SongControls from './components/SongControls'
// import SongListItem from './components/SongListItem'
// import { getCurrentPlaybackState } from './actions/spotifyAction';

import io from 'socket.io-client'
import { FirebaseWrapper } from './firebase'
const socket = io({ path: '/ws' })

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

  componentDidMount() {
    const wrapper = new FirebaseWrapper(socket)
    wrapper.joinRoom("test_room_id")
    .then(room => {
      console.log(room)
    })
  }

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
  }
}

export default App;