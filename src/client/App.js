import React, { Component } from 'react';
import './styles/App.css';
import { Table, Grid, Row, Col, PageHeader, Button, Image } from 'react-bootstrap';
import SongSearch from './components/SongSearch';
import SongControls from './components/SongControls';
import SongList from './components/SongList';
import { Song as SongData } from './classes/SpotifyData';
import SpotifyWrapper from './classes/SpotifyWrapper';
import apollo from './images/apollo_icon_black.png'

const pStyle = {
  fontSize: "15px",
  color: "#777"
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
      spotify: new SpotifyWrapper(this.props.room.access_token, 
        this.props.room.refresh_token),
		};

  }
	componentDidMount() {
		console.log('App mounted');
	}

	addSong = (songData) => {
		const song = new SongData({
			name: songData.name,
			id: songData.id,
			query: songData.href,
			artist: {
				name: songData.artists[0].name,
				id: songData.artists[0].id,
				query: songData.artists[0].href
			},
			album: {
				name: songData.album.name,
				id: songData.album.id,
				query: songData.album.href
			},
			duration: songData.duration_ms,

		});
		this.state.spotify.addSongToPlaylist(this.props.room.playlistId, song.id, res => res);
		this.props.firebaseWrapper.addSong(song, this.props.user.username);
	}

	removeSong = (song) => {
		
	}

	vote = (songKey, currentVotes) => {
		this.props.firebaseWrapper.voteOnSong(songKey, currentVotes);
	};

	getTopSong = () => {
		if(!this.props.room.songs) {
			return null;
		}
		const songs = this.props.room.songs;
		songs.sort((a, b) => b.data.votes - a.data.votes);
		return songs[0];
	}

	render() {
		let roomCode = this.props.room.roomCode;
		let songs = this.props.room.songs;
		return (
			<Grid>
        {/* <Row>
        <br/>
          
        </Row> */}
				<PageHeader>
					<Row>
            <Col md={3}>Apollo</Col>
            <Row>
              <Col mdOffset={11}>
                <Image src={apollo} style={{width: "50px", float: "right"}} rounded />
              </Col>
            </Row>
            <Row style={{textAlign: "end"}}>
              <Col mdOffset={9}>
              <br/>
                  <p style={pStyle}>Room Code: {roomCode}</p>
              </Col>
            </Row>
            <Row style={{textAlign: "end"}}>
              <Col mdOffset={9}>
                <p style={pStyle}>{this.props.room.roomName}</p>
              </Col>
            </Row>
          </Row>
				</PageHeader>
				<Row>
					<SongSearch 
						spotify={this.state.spotify}
						submit={this.addSong}
					/>
				</Row>
				<Row>
					<SongList songs={songs} vote={this.vote} />
				</Row>
				<Row>
					<SongControls 
						spotify={this.state.spotify}
						getNext={this.getTopSong}
					/>
				</Row>
			</Grid>
		);
	}
}

export default App;
