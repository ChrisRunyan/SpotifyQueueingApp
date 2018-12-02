import React from 'react';
import { Image, Navbar, NavItem, Glyphicon, ProgressBar } from 'react-bootstrap';
import { TimeoutInterval } from '../classes/Timer';

const progressInterval = 500;

class SongControls extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasSong: false,
			isPlaying: false,
			progress: 0,
			duration: 0,
			timer: null,
			albumArt: ''
		};
	}

	componentDidMount() {
		this.props.spotify.getPlayerInfo(res => {
			this.setState(
				{
					isPlaying: res.is_playing,
					progress: res.progress_ms,
					duration: res.item.duration_ms,
					albumArt: res.item.album.images[2].url,
					timer: new TimeoutInterval(
						() => {
							// for some reason this only runs for ~6.7 seconds (sometimes less)
							// before pausing
							// too many state changes?
							// Runs again after pausing + resuming
							console.log(`progress: ${this.state.progress}`);
							console.log(`art: ${this.state.albumArt}`);
							this.setState({
								
								progress:
									this.state.progress + progressInterval,
							});
						},
						progressInterval,
						this.state.duration - this.state.progress
					),
					
				},
				() => {
					if (this.state.isPlaying) {
						this.state.timer.resume();
						this.setState({
							hasSong: true,
						});
					}
				}
			);
		});
	}

	queueNextSong() {
        
    }

	togglePlayback = () => {
		if (this.state.isPlaying) {
			this.props.spotify.pause();
			this.state.timer.pause();
		} else {
			this.props.spotify.play();
			this.state.timer.resume();
		}
		this.setState({
			isPlaying: !this.state.isPlaying,
		});
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
				<Image src= {this.state.albumArt}/>
				<Navbar.Brand>Controls</Navbar.Brand>
				<NavItem onClick={this.togglePlayback}>
					{this.state.isPlaying ? pauseIcon : playIcon}
				</NavItem>
				<NavItem>
					{/* <NavItem> */}
					<ProgressBar
						id="song-progress"
						now={this.state.progress / this.state.duration}
						max={1}
					/>
					{/* </NavItem> */}
				</NavItem>
			</Navbar>
		);
	}
}

export default SongControls;
