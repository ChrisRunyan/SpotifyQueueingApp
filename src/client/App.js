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
import { Room } from './classes/FirebaseData';
// const socket = io({ path: '/ws' })

// socket.on("firebase-join-success", room => {
//   console.log(`Firebase Join Success!! Room=${JSON.stringify(room)}`)
// })

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

    // const socket = io({ path: '/ws' })
    this.props.socket.on("firebase-join-success", room => {
      console.log(`Firebase Join Success!! Room=${JSON.stringify(room)}`)
      this.setState({ room: new Room(room) })
    })

    const wrapper = new FirebaseWrapper(this.props.socket)
    wrapper.joinRoom("test_room_id")
  }

  render() {
    let roomCode = this.state.room ? this.state.room.roomCode : this.state.roomCode
    let songs = this.state.room ? this.state.room.songs : this.state.songs
    console.log(songs)
    return(
      <Grid>
          <PageHeader>
            <Row>
              <Col md={9}>
                Apollo
              </Col>
              <Col md= {3}>
                {/* <small> Room Code: {this.state.roomCode}</small> */}
                <small> Room Code: {roomCode}</small>
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
                  {/* {this.state.songs.map( (song, index) =>
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
                  )} */}
                  {
                    songs.map((song, index) => 
                      // console.log(`Song: ${song}`)
                      <Song
                        title = {song.name}
                        artist = {song.artist.name}
                        album = {song.album.name}
                        songLength = {"0"}
                        votes = {song.votes}
                        id = {song.id}
                        key = {song.id}
                        index = {index}
                      />
                    )
                  }
                </tbody>
              </Table>
            
            </Row>
      </Grid>
      
    )
  }
}

export default App;