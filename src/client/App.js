import React, { Component } from 'react';
import './styles/App.css';
import {
	Grid,
	Row,
	Col,
	PageHeader,
	Image,
} from 'react-bootstrap';
import SongSearch from './components/SongSearch';
import SongControls from './components/SongControls';
import SongList from './components/SongList';
import { Song as SongData } from './classes/SpotifyData';
import SpotifyWrapper from './classes/SpotifyWrapper';
import apollo from './images/apollo_icon_black.png';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spotify: new SpotifyWrapper(
				this.props.room.access_token,
				this.props.room.refresh_token
			),
		};
	}
	componentDidMount() {
		console.log('App mounted');
	}

	addSong = songData => {
		const song = new SongData({
			name: songData.name,
			id: songData.id,
			query: songData.href,
			artist: {
				name: songData.artists[0].name,
				id: songData.artists[0].id,
				query: songData.artists[0].href,
			},
			album: {
				name: songData.album.name,
				id: songData.album.id,
				query: songData.album.href,
			},
			duration: songData.duration_ms,
		});
		this.state.spotify.addSongToPlaylist(
			this.props.room.playlistId,
			song.id,
			res => res
		);
		this.props.firebaseWrapper.addSong(song, this.props.user.username);
	};

	vote = (songKey, currentVotes) => {
		this.props.firebaseWrapper.voteOnSong(songKey, currentVotes);
	};

	reorderSongsInPlaylist = (currentSong, nextSong) => {
		const playlistId = this.props.room.playlistId;
		const getIndex = this.state.spotify.getIndexOfSongInPlaylist;
		getIndex(
			// Get the index of the curretly playing song
			playlistId,
			currentSong.id,
			cIndex => {
				// Callback on result of getIndexOfSongInPlaylist
				getIndex(
					// Get the index of the song that will be played next
					playlistId,
					nextSong.id,
					nIndex => {
						// Callback on result of getIndexOfSongInPlaylist
						this.state.spotify.makeSongNextPlayed(
							// Reorder the playlist
							playlistId,
							nIndex,
							cIndex,
							res => res
						);
					}
				);
			}
		);
	};

	render() {
		let roomCode = this.props.room.roomCode;
		let songs = this.props.room.songs;
		return (
			<Grid>
				<Row>
					<br />
					<Col mdOffset={11}>
						<Image src={apollo} style={{ width: '50px' }} rounded />
					</Col>
				</Row>
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
					<SongList
						spotify={this.state.spotify}
						songs={songs}
						vote={this.vote}
					/>
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
