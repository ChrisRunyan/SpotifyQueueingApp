import React, { Component } from 'react';
import SocketContext from './socket-context';
import './styles/App.css';
import { Table, Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import SongSearch from './components/SongSearch';
import SongList from './components/SongList';
import { Song as SongData } from './classes/SpotifyData';

class App extends Component {
	// state = {
	//   endpoint: "http://127.0.0.1:4001",
	//   roomCode: "HJRA",
	//   songs: null
	// };

	// socket = socketIOClient("http://127.0.0.1:4001");

	componentDidMount() {
		const { endpoint } = this.state;
		console.log('foo');
		this.socket.on('initialLoad', data => this.setState({ songs: data }));
		console.log('ff');
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

	debugAdd = () => {
		const song = new SongData({
			id: '1jZhF1p0fLaVZHAyfjkumE',
			name: 'Social',
			query: 'https://api.spotify.com/v1/tracks/1jZhF1p0fLaVZHAyfjkumE',
			artist: {
				name: 'Smallpools',
				id: '4iiQabGKtS2RtTKpVkrVTw',
				query:
					'https://api.spotify.com/v1/artists/4iiQabGKtS2RtTKpVkrVTw',
			},
			album: {
				name: 'Social',
				id: '0lOMCvOnoPQ5s8HAPrXlKv',
				query:
					'https://api.spotify.com/v1/albums/0lOMCvOnoPQ5s8HAPrXlKv',
			},
			votes: 0,
			addedBy: 'default',
		});
		this.props.firebaseWrapper.addSong(song);
	};

	vote = (songKey, currentVotes) => {
		console.log(`Vote: \nsongKey=${songKey}\ncurrentVotes=${currentVotes}`);
		this.props.firebaseWrapper.voteOnSong(songKey, currentVotes);
	};

	render() {
		let roomCode = this.props.room.roomCode;
		let songs = this.props.room.songs;
		console.log(songs);
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
						<Col md={3}>
							<Button onClick={this.debugAdd}>Add song</Button>
						</Col>
					</Row>
				</PageHeader>
				<Row>
					<SongSearch access_token={this.props.room.access_token} />
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
						<SongList songs={songs} vote={this.vote} />
					</Table>
				</Row>
			</Grid>
		);
	}
}

export default App;
