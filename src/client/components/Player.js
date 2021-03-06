import React from 'react';
import { Timer, TimeoutInterval } from '../classes/Timer';
import {
	Image,
	Nav,
	NavItem,
	Glyphicon,
	ProgressBar,
	Col,
	Row,
	Grid,
} from 'react-bootstrap';
import '../styles/Player.css';

// Player is concerned ONLY with the current song
// If there is no current song, then there is no player
// Parent component decides how to get next song
// Player schedules events & displays information
const progressInterval = 500;
const lockInPercent = 0.95;

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			progress: 0,
			finaleTimer: null,
			durationTimer: null,
		};
	}

	componentDidMount() {
		this.initializeTimers(this.props.song);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.song.id !== this.props.song.id) {
			this.pauseTimers();
			this.initializeTimers(nextProps.song);
		}
	}

	togglePlayback = () => {
		if (this.state.isPlaying) {
			this.pause();
		} else {
			this.play();
		}
		this.setState({
			isPlaying: !this.state.isPlaying,
		});
	};

	initializeTimers = song => {
		const durationTimer = new TimeoutInterval(
			() => {
				// console.log(`progress: ${this.state.progress} ms`);
				this.setState({
					progress: this.state.progress + progressInterval,
				});
			},
			progressInterval,
			song.duration - this.state.progress,
			() => {
				console.log(`song ending`);
				this.props.onSongEnd(this.props.song.id);
			}
		);
		const finaleTimer = new Timer(() => {
			console.log('finale');
			this.props.onFinaleReached(song.id);
		}, song.duration * lockInPercent - this.state.progress);
		this.setState(
			{
				durationTimer,
				finaleTimer,
				progress: 0,
			},
			() => {
				if (this.state.isPlaying) {
					this.resumeTimers();
				}
			}
		);
	};

	resumeTimers = () => {
		if (this.state.durationTimer) {
			this.state.durationTimer.resume();
		}
		if (this.state.finaleTimer) {
			this.state.finaleTimer.resume();
		}
	};

	pauseTimers = () => {
		if (this.state.durationTimer) {
			this.state.durationTimer.pause();
		}
		if (this.state.finaleTimer) {
			this.state.finaleTimer.pause();
		}
	};

	play = () => {
		this.resumeTimers();
		this.props.play(this.props.song.id);
	};

	pause = () => {
		this.pauseTimers();
		this.props.pause();
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
		const songInfoWidth = this.props.isOwner ? 1 : 4;
		const albumName = (
			<Col md={4}>
				{this.props.song ? (
					<strong>{this.props.song.album.name}</strong>
				) : (
					''
				)}
			</Col>
		);

		const imageUrl = this.props.song
			? this.props.song.album.images[2]
				? this.props.song.album.images[2]
				: ''
			: '';

		return (
			<Grid bsClass="player">
				<Row bsClass="progress-row">
					<Col md={songInfoWidth}>
						<Image src={imageUrl} />
					</Col>
					<Col md={songInfoWidth}>
						{this.props.song ? (
							<strong>{this.props.song.name}</strong>
						) : (
							''
						)}
					</Col>
					{!this.props.isOwner ? albumName : null}
					{this.props.isOwner ? (
						<Col md={9}>
							<ProgressBar
								bsStyle="success"
								now={
									this.state.progress /
									this.props.song.duration
								}
								max={1}
							/>
						</Col>
					) : null}
					{this.props.isOwner ? (
						<Col md={1}>
							<Nav>
								<NavItem onClick={this.togglePlayback}>
									{this.state.isPlaying
										? pauseIcon
										: playIcon}
								</NavItem>
							</Nav>
						</Col>
					) : null}
				</Row>
			</Grid>
		);
	}
}

export default Player;
