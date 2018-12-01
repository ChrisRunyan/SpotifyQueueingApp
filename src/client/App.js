import React, { Component } from 'react';
import SocketContext from './socket-context';
import './styles/App.css';
import { Table, Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import SongSearch from './components/SongSearch';
import SongControls from './components/SongControls';
import SongList from './components/SongList';
import { Song as SongData } from './classes/SpotifyData';
import SpotifyWrapper from './classes/SpotifyWrapper';

class App extends Component {
	// state = {
	//   endpoint: "http://127.0.0.1:4001",
	//   roomCode: "HJRA",
	//   songs: null
	// };

	// socket = socketIOClient("http://127.0.0.1:4001");
	constructor(props) {
		super(props);
		this.state = {
			spotify: new SpotifyWrapper(this.props.room.access_token, this.props.room.refresh_token),
		};
	}
	componentDidMount() {
		// const { endpoint } = this.state;
		// console.log('foo');
		// this.socket.on('initialLoad', data => this.setState({ songs: data }));
		// console.log('ff');
	}

	// handleVoteChange = (index, delta) => {
	// 	console.log(delta);
	// 	// console.log(this.state);
	// 	var songIndex = this.state.songs.findIndex(song => song.id == index);
	// 	this.socket.emit('changeVote', index, delta);
	// 	// this.socket.on("vote", data => )
	// 	this.setState(prevState => ({
	// 		votes: (prevState.songs[songIndex].votes += delta),
	// 		//Problem is song is being identified by index instead of object property's index
	// 	}));
	// };

	// prevSongId = 2;

	// handleAddSong = (title, artist, album, songLength) => {
	// 	// console.log(title);
	// 	this.setState(prevState => {
	// 		return {
	// 			songs: [
	// 				...prevState.songs,
	// 				{
	// 					title,
	// 					artist,
	// 					album,
	// 					songLength,
	// 					votes: 0,
	// 					id: (this.prevSongId += 1),
	// 				},
	// 			],
	// 		};
	// 	});
	// 	console.log(this.state);
	// };
	componentDidMount() {
		console.log('App mounted');
	}

	addSong = (songData) => {
		// console.log(songData);
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
		this.props.firebaseWrapper.addSong(song, this.props.user.username);
	}

	vote = (songKey, currentVotes) => {
		this.props.firebaseWrapper.voteOnSong(songKey, currentVotes);
	};

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
					/>
				</Row>
			</Grid>
		);
	}
}

export default App;
