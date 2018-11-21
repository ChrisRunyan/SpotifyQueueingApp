import React, { Component } from 'react';
import SocketContext from './socket-context'
import './styles/App.css';

import { Table, Grid, Row, Col, PageHeader } from 'react-bootstrap';

import socketIOClient from "socket.io-client";


// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { loginSuccess } from './actions/loginAction'
// import { joinRoom, fetchSong, pushSong } from './actions/firebaseAction'

import Song from './components/Song'
import SongSearch from './components/SongSearch'
// import SongControls from './components/SongControls'
// import SongListItem from './components/SongListItem'
// import { getCurrentPlaybackState } from './actions/spotifyAction';

class App extends Component {
  state = {
    endpoint: "http://127.0.0.1:4001",
    roomCode: "HJRA",
    songs: null
  };

  socket = socketIOClient("http://127.0.0.1:4001");



  yo = "hi";

  componentDidMount() {
    const {endpoint} = this.state;
    console.log("foo")
    this.socket.on("initialLoad", data => this.setState({ songs: data }));
    console.log("ff")
  }

  handleVoteChange = (index, delta) => {
    console.log(delta);
    // console.log(this.state);
    var songIndex = this.state.songs.findIndex( song => song.id == index);
    this.socket.emit("changeVote", index, delta);
    // this.socket.on("vote", data => )
    this.setState( prevState => ({
      votes: prevState.songs[songIndex].votes += delta
      //Problem is song is being identified by index instead of object property's index
    }));
  }

  prevSongId = 2;

  handleAddSong = (title, artist, album, songLength) => {
    // console.log(title);
    this.setState( prevState => {
      return {
        songs: [
          ...prevState.songs,
            {
              title,
              artist,
              album,
              songLength,
              votes: 0,
              id: this.prevSongId += 1
            }
        ]
      }
    })
    console.log(this.state);
  }

  render() {
    return(
      <SocketContext.Provider value={this.socket}>
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
            <SocketContext.Consumer>
              {socket =>
                <SongSearch
                  socket={socket}
                  addSong = {this.handleAddSong} 
                />}
            </SocketContext.Consumer>
            </Row>
            <Row>
            {this.state.songs
              ? <Table striped bordered condensed hover>
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
                  changeVote={this.handleVoteChange}
                  />
                  )}
                </tbody>
              </Table>
              : <h1 style={{textAlign: "center"}}>Loading...</h1>}
            
            </Row>
      </Grid>
      </SocketContext.Provider>
      
    )
  }
}

export default App;