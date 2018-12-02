import React from 'react';
import { Navbar, NavItem, Glyphicon, ProgressBar } from 'react-bootstrap';
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
		};
	}

	componentDidMount() {
		this.props.spotify.getPlayerInfo(res => {
			this.setState(
				{
					isPlaying: res.is_playing,
					progress: res.progress_ms,
					duration: res.item.duration_ms,
					timer: new TimeoutInterval(
						() => {
							// for some reason this only runs for ~6.7 seconds (sometimes less)
							// before pausing
							// too many state changes?
							// Runs again after pausing + resuming
							console.log(`progress: ${this.state.progress}`);
							this.setState({
								progress:
									this.state.progress + progressInterval,
							});
						},
						progressInterval,
						res.item.duration_ms - res.progress_ms
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
