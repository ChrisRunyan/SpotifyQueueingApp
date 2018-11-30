import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, NavItem, Glyphicon } from 'react-bootstrap';
import SpotifyWrapper from '../classes/SpotifyWrapper';

class SongControls extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            spotify: new SpotifyWrapper(this.props.access_token),
            isPlaying: false,
        };
    }

    componentDidMount() {
        this.setState({
            isPlaying: this.state.spotify.getIsPlaying()
        });
    }

    togglePlayback = () => {
        if (this.state.isPlaying) {
            this.state.spotify.pause();
        } else {
            this.state.spotify.play();
        }
        this.setState({
            isPlaying: !this.state.isPlaying
        });
    }

    render() {
        const playIcon = 
            <span>
                <Glyphicon bsSize='large' glyph='play' />
            </span>
        const pauseIcon =
            <span>
                <Glyphicon bsSize='large' glyph='pause' />
            </span>
        return (
            <Navbar inverse fixedBottom>
                <Navbar.Brand>
                    Controls
                </Navbar.Brand>
                <NavItem onClick={this.togglePlayback}>
                    { this.state.isPlaying ? pauseIcon : playIcon }
                </NavItem>
            </Navbar>
        )
    }

}

export default SongControls;