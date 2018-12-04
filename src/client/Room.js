import React, { Component } from 'react';
import './styles/App.css';
import { Grid, Row, Col, PageHeader, Image } from 'react-bootstrap';
import SongSearch from './components/SongSearch';
import SongControls from './components/SongControls';
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
		};
	}

	sortSongs = songs => {
		const sortableSongs = songs;
		sortableSongs.sort((a, b) => b.data.votes - a.data.votes);
		return sortableSongs;
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.room.songs) {
			console.log(nextProps.room.songs);
			this.setState({
				currentSong: this.getTopSong(nextProps.room.songs)
			});
		}
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
		console.log(songData.album);
		console.log(songData.album.images);
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
		const songKey = this.props.room.songs.filter(
			song => song.data.id === songId
		)[0].key;
		spotify.getPlayerInfo(info => {
			if (
				info &&
				info.context.type === 'playlist' &&
				info.context.uri.indexOf(playlistId) !== -1 &&
				info.item.id === songId
			) {
				spotify.play();
			} else {
				spotify.playNextFromPlaylist(playlistId, songId);
				this.props.firebaseWrapper.setIsPlaying(songKey);
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
		this.state.spotify.queueUpSong(
			this.props.room.playlistId,
			nextSong.data.id,
			currentSongId,
			res => res
		);
	};

	onSongEnd = (songId) => {
		const sortedSongs = this.sortSongs(this.props.room.songs);
		let key = null;
		sortedSongs.forEach(song => {
			if(song.data.id === songId) 
				key = song.key;
		});
		let nextSong = sortedSongs[0];
		if (nextSong.data.id === songId) {
			if (sortedSongs[1]) {
				nextSong = sortedSongs[1];
			}
		}
		if(key) {
			this.removeSong(key);
		}
		console.log(nextSong.id);
		this.state.spotify.playNextFromPlaylist(
			this.props.room.playlistId,
			nextSong.id
		);
	}

	vote = (songKey, currentVotes) => {
		this.props.firebaseWrapper.voteOnSong(songKey, currentVotes);
	};

	disableVoting = songKey => {
		this.props.firebaseWrapper.disableVoting(songKey);
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
			<Grid>
				<PageHeader>
					<Row>
						<Col md={3}>Apollo</Col>
						<Row>
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
					{/* <SongControls
						spotify={this.state.spotify}
						songs={songs}
						lockSong={this.disableVoting}
						removeSong={this.removeSong}
						setPlaying={this.setPlaying}
						playlistId={this.props.room.playlistId}
					/> */}
					{topSong ? (
						<Player
							song={topSong}
							play={this.play}
							pause={this.state.spotify.pause}
							onFinaleReached={this.queueNextSong}
							onSongEnd={this.onSongEnd}
						/>
					) : null}
				</Row>
			</Grid>
		);
	}
}

export default Room;
