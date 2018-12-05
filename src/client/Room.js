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
import Player from './components/Player';
import SongList from './components/SongList';
import { Song as SongData } from './classes/SpotifyData';
import SpotifyWrapper from './classes/SpotifyWrapper';
import apollo from './images/apollo_icon_black.png';

const pStyle = {
	fontSize: '15px',
	color: '#777',
};

class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spotify: new SpotifyWrapper(
				this.props.room.access_token,
				this.props.room.refresh_token
			),
			currentSong: null,
			queuedSong: null,
		};
	}

	/**
	 * Sort a list of songs based on votes
	 */
	sortSongs = songs => {
		const sortableSongs = songs;
		sortableSongs.sort((a, b) => b.data.votes - a.data.votes);
		return sortableSongs;
	};

	/**
	 * Get the firebase key for a song given the song's spotify id
	 */
	getSongById = songId => {
		return this.props.room.songs.filter(song => 
			song.data.id === songId
		)[0];
	}

	componentWillReceiveProps(nextProps) {
		let nextSong = null;
		if (this.state.queuedSong) {
			console.log('queued song found');
			nextSong = this.state.queuedSong
		} else if (nextProps.room.songs) {
			console.log(nextProps.room.songs);
			nextSong = this.getTopSong(nextProps.room.songs);
		}
		this.setState({
			currentSong: nextSong
		})
	}

	getTopSong = songs => {
		if (songs && songs.length > 0) {
			const sortedSongs = this.sortSongs(songs);
			let topSong = sortedSongs[0].data;
			sortedSongs.forEach(song => {
				if (song.data.isPlaying) {
					topSong = song.data;
				}
			});
			return topSong;
		}
		return null;
	};

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
				images: songData.album.images,
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

	play = songId => {
		const spotify = this.state.spotify;
		const playlistId = this.props.room.playlistId;
		// get the firebase key of the song to play
		const song = this.getSongById(songId);
		const songKey = song.key;
		spotify.getPlayerInfo(info => {
			// check if the correct song and playlist is already playing
			if (
				info &&
				info.context.type === 'playlist' &&
				info.context.uri.indexOf(playlistId) !== -1 &&
				info.item.id === songId
			) {
				spotify.play({ position_ms: info.progress_ms });
				song.data.progress = info.progress_ms;
			} else {
				spotify.playNextFromPlaylist(playlistId, songId);
				this.setPlaying(songKey);
			}
		});
	};

	queueNextSong = currentSongId => {
		const sortedSongs = this.sortSongs(this.props.room.songs);
		let nextSong = sortedSongs[0];
		if (nextSong.data.id === currentSongId) {
			if (sortedSongs[1]) {
				nextSong = sortedSongs[1];
			}
		}
		this.setState({
			queuedSong: nextSong.data
		});
	};

	onSongEnd = (songId) => {
		const sortedSongs = this.sortSongs(this.props.room.songs);
		let nextSong = sortedSongs[0];
		// if the currently playing song is the highest-voted song,
		// get the second-highest voted song
		if (nextSong.data.id === songId) {
			if (sortedSongs[1]) {
				nextSong = sortedSongs[1];
			}
		}
		// Remove the song from firebase
		let key = this.getSongById(songId).key;
		if(key) {
			this.removeSong(key);
		}
		console.log(nextSong.data.id);
		this.state.spotify.playNextFromPlaylist(
			this.props.room.playlistId,
			nextSong.data.id
		);
		this.setState({
			currentSong: null,
		})
	}

	vote = (songKey, currentVotes) => {
		this.props.firebaseWrapper.voteOnSong(songKey, currentVotes);
	};

	setPlaying = songKey => {
		this.props.firebaseWrapper.setIsPlaying(songKey);
	};

	removeSong = songKey => {
		console.log('removing song');
		this.props.firebaseWrapper.removeSong(songKey);
	};

	render() {
		let roomCode = this.props.room.roomCode;
		let songs = this.props.room.songs;
		let topSong = null;
		if (this.state.currentSong) {
			topSong = this.state.currentSong;
		} else if (songs && songs.length > 0) {
			topSong = this.getTopSong(songs);
		}
		return (
			<div>
				<Grid>
				<PageHeader>
					<Row>
						<Col md={3}>Apollo</Col>
						<Col mdOffset={11}>
							<Image
								src={apollo}
								style={{ width: '50px', float: 'right' }}
								rounded
							/>
						</Col>
					</Row>
					<Row style={{ textAlign: 'end' }}>
						<Col mdOffset={9}>
							<br />
							<p style={pStyle}>Room Code: {roomCode}</p>
						</Col>
					</Row>
					<Row style={{ textAlign: 'end' }}>
						<Col mdOffset={9}>
							<p style={pStyle}>{this.props.room.roomName}</p>
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
						songs={songs}
						currentSong={topSong}
						vote={this.vote}
					/>
				</Row>
				</Grid>
				{topSong ? (
					<Player
						song={topSong}
						isOwner={this.props.isOwner}
						play={this.play}
						pause={this.state.spotify.pause}
						getInfo={this.state.spotify.getPlayerInfo}
						onFinaleReached={this.queueNextSong}
						onSongEnd={this.onSongEnd}
					/>
				) : null}
			</div>
		);
	}
}

export default Room;
