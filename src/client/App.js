import React, { Component } from 'react';
import './styles/App.css';

import { Table, Grid, Row, Col, PageHeader } from 'react-bootstrap';

// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { loginSuccess } from './actions/loginAction'
// import { joinRoom, fetchSong, pushSong } from './actions/firebaseAction'

import Song from './components/Song';
import SongSearch from './components/SongSearch';
// import SongControls from './components/SongControls'
// import SongListItem from './components/SongListItem'
// import { getCurrentPlaybackState } from './actions/spotifyAction';

import io from 'socket.io-client';
import { FirebaseWrapper } from './firebase';
import { Room } from './classes/FirebaseData';
import { Song as SongData } from './classes/SpotifyData';
// const socket = io({ path: '/ws' })

// socket.on("firebase-join-success", room => {
//   console.log(`Firebase Join Success!! Room=${JSON.stringify(room)}`)
// })

class App extends Component {
	state = {
		roomCode: 'HJRA',
		songs: [
			{
				title: 'Chicago',
				artist: 'Sufjan Stevens',
				album: 'Illinois',
				songLength: '6:05',
				votes: 5,
				id: 0,
			},
			{
				title: 'Dean Town',
				artist: 'Vulfpeck',
				album: 'The Beautiful Game',
				songLength: '3:33',
				votes: 3,
				id: 1,
			},
			{
				title: 'What I Got',
				artist: 'Sublime',
				album: 'Sublime',
				songLength: '2:51',
				votes: 0,
				id: 2,
			},
		],
	};

	componentDidMount() {
		// this.props.firebaseWrapper.socket.on('firebase-refresh', songs => {
		// 	this.setState({
		// 		room: new Room(this.state.room.id, {
		// 			...this.state.room,
		// 			songs,
		// 		}),
		// 	});
		// });

		// this.props.firebaseWrapper.socket.on("firebase-join-success", (key, room) => {
		//   console.log(room)
		//   this.setState({ room: new Room(key, room) })
		// })

		// this.props.firebaseWrapper.socket.on(
		// 	'firebase-create-success',
		// 	room => {
		// 		console.log(
		// 			`Firebase Create Success!! Room=${JSON.stringify(room)}`
		// 		);
		// 		this.setState({ room: new Room(room) });
		// 	}
		// );

		// this.props.firebaseWrapper.socket.on(
		// 	'firebase-add-song-success',
		// 	newSong => {
		// 		console.log(
		// 			`Firebase Add Song Success!! Song=${JSON.stringify(
		// 				newSong
		// 			)}`
		// 		);
		// 	}
		// );
		console.log("App mounted")
	}

	debugJoin = () => {
		this.props.firebaseWrapper.joinRoom('abcd', 'default2');
	};

	debugCreate = () => {
		this.props.firebaseWrapper.createRoom(
			'JKLM',
			'Test Create Room',
			'Mitch',
			'fakeToken'
		);
	};

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
		if (this.state.room != null) {
			this.props.firebaseWrapper.addSong(this.state.room.id, song);
		}
	};

	render() {
		let roomCode = this.props.room
			? this.props.room.roomCode
			: this.state.roomCode;
		let songs = this.props.room ? this.props.room.songs : this.state.songs;
		console.log(songs);
		return (
			<Grid>
				<PageHeader>
					<Row>
						<Col md={3}>Apollo</Col>
						<Col md={3}>
							{/* <small> Room Code: {this.state.roomCode}</small> */}
							<small> Room Code: {roomCode}</small>
						</Col>
						<Col md={2}>
							<button onClick={this.debugJoin}>Join Room</button>
						</Col>
						<Col md={2}>
							<button onClick={this.debugCreate}>
								Create Room
							</button>
						</Col>
						<Col md={2}>
							<button onClick={this.debugAdd}>Add Song</button>
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
							{songs.map((song, index) => (
								// console.log(`Song: ${song}`)
								<Song
									title={song.name}
									artist={song.artist.name}
									album={song.album.name}
									songLength={'0'}
									votes={song.votes}
									id={song.id}
									key={song.id}
									index={index}
								/>
							))}
						</tbody>
					</Table>
				</Row>
			</Grid>
		);
	}
}

export default App;
