import React from 'react';
import {
	Image,
	Navbar,
	NavItem,
	Glyphicon,
	ProgressBar,
} from 'react-bootstrap';
import { TimeoutInterval, Timer } from '../classes/Timer';

const progressInterval = 500;
const lockInPercent = 0.95;

class SongControls extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasSong: false,
			isPlaying: false,
			progress: 0,
			duration: 0,
			playbackTimer: null,
			lockInTimer: null,
			albumArt: '',
		};
	}

	// componentDidMount() {
	// 	this.props.spotify.getPlayerInfo(res => {
	// 		this.setState(
	// 			{
	// 				isPlaying: res.is_playing,
	// 				progress: res.progress_ms,
	// 				duration: res.item.duration_ms,
	// 				albumArt: res.item.album.images[2].url,
	// 				timer: new TimeoutInterval(
	// 					() => {
	// 						// for some reason this only runs for ~6.7 seconds (sometimes less)
	// 						// before pausing
	// 						// too many state changes?
	// 						// Runs again after pausing + resuming
	// 						console.log(`progress: ${this.state.progress}`);
	// 						console.log(`art: ${this.state.albumArt}`);
	// 						this.setState({

	// 							progress:
	// 								this.state.progress + progressInterval,
	// 						});
	// 					},
	// 					progressInterval,
	// 					res.item.duration_ms - res.progress_ms
	// 				),

	// 			},
	// 			() => {
	// 				if (this.state.isPlaying) {
	// 					this.state.timer.resume();
	// 					this.setState({
	// 						hasSong: true,
	// 					});
	// 				}
	// 			}
	// 		);
	// 	});
	// }

	togglePlayback = () => {
		if (this.state.isPlaying) {
			this.props.spotify.pause();
			this.pauseTimers();
		} else {
			if (!this.state.hasSong) {
				const nextSong = this.getNextSong(this.props.songs);
				const secondSong = this.getNextSong(this.props.songs, 1);
				this.props.spotify.playNextFromPlaylist(
					this.props.playlistId,
					nextSong.data.id
				);
				setTimeout(() => {
					this.props.spotify.getPlayerInfo(res => {
						console.log(`get info: isPlaying=${res.is_playing}`);
						this.setState(
							{
								isPlaying: res.is_playing,
								progress: res.progress_ms,
								duration: res.item.duration_ms,
								albumArt: res.item.album.images[2].url,
							},
							() => {
								if (this.state.isPlaying) {
									console.log('start timers');
									this.startPlaybackTimers(
										nextSong,
										secondSong
									);
									this.setState({
										hasSong: true,
									});
								}
							}
						);
					});
				}, 500);
			} else {
				this.props.spotify.play();
				this.resumeTimers();
			}
		}
		this.setState({
			isPlaying: !this.state.isPlaying,
		});
	};

	startPlaybackTimers = (currentSong, nextSong) => {
		const timeOfLockIn =
			this.state.duration * lockInPercent - this.state.progress;
		let lockInTimer = null;
		const playbackTimer = new TimeoutInterval(
			() => {
				console.log(`progress: ${this.state.progress} ms`);
				this.setState({
					progress: this.state.progress + progressInterval,
				});
			},
			progressInterval,
			this.state.duration - this.state.progress,
			() => {
				this.props.removeSong(currentSong.key);
				this.setState({ hasSong: false });
			}
		);
		if (nextSong) {
			lockInTimer = new Timer(() => {
				this.props.lockSong(nextSong.key);
				this.reorderSongsInPlaylist(currentSong, nextSong);
			}, timeOfLockIn);
		}
		this.setState(
			{
				playbackTimer,
				lockInTimer,
			},
			() => {
				this.resumeTimers();
			}
		);
	};

	pauseTimers = () => {
		console.log('pause');
		if (this.state.playbackTimer) {
			this.state.playbackTimer.pause();
		}
		if (this.state.lockInTimer) {
			this.state.lockInTimer.pause();
		}
	};

	resumeTimers = () => {
		console.log('resume');
		if (this.state.playbackTimer) {
			this.state.playbackTimer.resume();
		}
		if (this.state.lockInTimer) {
			this.state.lockInTimer.resume();
		}
	};

	reorderSongsInPlaylist = (currentSong, nextSong) => {
		const playlistId = this.props.playlistId;
		const getIndex = this.props.spotify.getIndexOfSongInPlaylist;
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

	getNextSong = (songs, offset = 0) => {
		if (songs) {
			songs.sort((a, b) => {
				b.data.votes - a.data.votes;
			});
			if (songs[offset]) {
				return songs[offset];
			}
		}
		return null;
	};

	render() {
		const playIcon = (
			<span>
				<Glyphicon bsSize="large" glyph="play" />
			</span>
		);
		const pauseIcon = (
			<span>
				<Glyphicon bsSize="large" glyph="pause" />
			</span>
		);
		return (
			<Navbar inverse fixedBottom>
				<Image src={this.state.albumArt} />
				<Navbar.Brand>Controls</Navbar.Brand>
				<NavItem onClick={this.togglePlayback}>
					{this.state.isPlaying ? pauseIcon : playIcon}
				</NavItem>
				<NavItem>
					<ProgressBar
						id="song-progress"
						now={this.state.progress / this.state.duration}
						max={1}
					/>
				</NavItem>
			</Navbar>
		);
	}
}

export default SongControls;
