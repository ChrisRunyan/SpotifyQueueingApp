import React, { Component } from 'react';
import './styles/App.css';
import {  Grid, Row, Col, PageHeader } from 'react-bootstrap';
import SongSearch from './components/SongSearch';
import SongControls from './components/SongControls';
import SongList from './components/SongList';
import { Song as SongData } from './classes/SpotifyData';
import SpotifyWrapper from './classes/SpotifyWrapper';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spotify: new SpotifyWrapper(this.props.room.access_token, this.props.room.refresh_token),
		};
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
		this.state.spotify.addSongToPlaylist(this.props.room.playlistId, song.id, res => {
			this.props.firebaseWrapper.updatePlaylistId(this.props.room.id, res.snapshot_id);
		});
		this.props.firebaseWrapper.addSong(song, this.props.user.username);
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
				<PageHeader>
					<Row>
						<Col md={3}>Apollo</Col>
						<Col md={3}>
							<small> Room Code: {roomCode}</small>
						</Col>
						<Col md={3}>
							<small>{this.props.room.roomName}</small>
						</Col>
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
