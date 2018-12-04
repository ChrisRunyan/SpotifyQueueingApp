import React from 'react';
import { Timer, TimeoutInterval } from '../classes/Timer';
import {
	Image,
	Navbar,
	NavItem,
	Glyphicon,
	ProgressBar,
} from 'react-bootstrap';

// Player is concerned ONLY with the current song
// If there is no current song, then there is no player
// Parent component decides how to get next song
// Player schedules events & displays information


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

    togglePlayback = () => {
        if (this.state.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    componentDidMount() {
        const progressInterval = 500;
        const lockInPercent = .95;
        const durationTimer = new TimeoutInterval(
            () => {
                this.setState({
                    progress: this.state.progress + progressInterval
                })
            },
            progressInterval,
            this.props.song.duration,
            this.props.onSongEnd
        );
        const finaleTimer = new Timer(
            this.props.onFinaleReached,
            this.props.song.duration * lockInPercent - this.state.progress
        )
        this.setState({
            durationTimer,
            finaleTimer
        }, () => {
            if (this.state.isPlaying) {
                this.state.durationTimer.resume();
                this.state.finaleTimer.resume();
            }
        })
    }

    play = () => {
        if (this.state.durationTimer) {
            this.state.durationTimer.resume();
        }
        if (this.state.finaleTimer) {
            this.state.finaleTimer.resume();
        }
        this.props.play();
    }

    pause = () => {
        if (this.state.durationTimer) {
            this.state.durationTimer.pause();
        }
        if (this.state.finaleTimer) {
            this.state.finaleTimer.pause();
        }
        this.props.pause();
    }

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
        console.log(this.props.song);
        return (
			<Navbar inverse fixedBottom>
				<Image src={this.props.song ? this.props.song.album.images[2].url : ''} />
				<Navbar.Brand>Controls</Navbar.Brand>
				<NavItem onClick={this.togglePlayback}>
					{this.state.isPlaying ? pauseIcon : playIcon}
				</NavItem>
				<NavItem>
					<ProgressBar
						id="song-progress"
						now={this.state.progress / this.props.song.duration}
						max={1}
					/>
				</NavItem>
			</Navbar>
		);
    }

}

export default Player;