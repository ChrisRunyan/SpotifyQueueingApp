import React, { Component } from 'react';
import './styles/App.css';

import { Table, Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';

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
	// state = {
	// 	roomCode: 'HJRA',
	// 	songs: [
	// 		{
	// 			title: 'Chicago',
	// 			artist: 'Sufjan Stevens',
	// 			album: 'Illinois',
	// 			songLength: '6:05',
	// 			votes: 5,
	// 			id: 0,
	// 		},
	// 		{
	// 			title: 'Dean Town',
	// 			artist: 'Vulfpeck',
	// 			album: 'The Beautiful Game',
	// 			songLength: '3:33',
	// 			votes: 3,
	// 			id: 1,
	// 		},
	// 		{
	// 			title: 'What I Got',
	// 			artist: 'Sublime',
	// 			album: 'Sublime',
	// 			songLength: '2:51',
	// 			votes: 0,
	// 			id: 2,
	// 		},
	// 	],
	// };

	componentDidMount() {
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
		this.props.firebaseWrapper.addSong(song);
	};

	vote = (songKey, currentVotes) => this.props.firebaseWrapper.voteOnSong(songKey, currentVotes)

	render() {
		let roomCode = this.props.room.roomCode
		let songs = this.props.room.songs
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
						<Col md={3}>
							<small>{this.props.room.roomName}</small>
						</Col>
						<Col md={3}>
							<Button onClick={this.debugAdd}>Add song</Button>
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
									title={song.data.name}
									artist={song.data.artist.name}
									album={song.data.album.name}
									songLength={'0'}
									votes={song.data.votes}
									id={song.data.id}
									key={song.key}
									songKey={song.key}
									index={index}
									vote={this.vote}
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
