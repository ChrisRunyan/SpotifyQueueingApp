import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../styles/SongControls.css'
import { pausePlayback, resumePlayback, nextSong } from '../actions/spotifyAction'

const SongControls = props => { 

    console.log("from SongControls.js",props);

    const playButtonText = props.isPlaying ? 'Pause' : 'Play'
    const togglePlayback = () => {
        if(props.isPlaying) {
            props.pause(props.tokens)
        } else {
            props.resume(props.tokens)
        }
    }

const nextPlayback = () => { props.next(props.tokens) }

    return (
        <div className="container">
            <button className="play-button" onClick={togglePlayback}>{ playButtonText }</button>
            <button className="play-button" onClick={nextPlayback}> > </button>
        </div>
    )
}

SongControls.propTypes = {
    isPlaying: PropTypes.bool,
    tokens: PropTypes.objectOf(PropTypes.string),
    resume: PropTypes.func,
    pause: PropTypes.func,
    playNext: PropTypes.func,
};

const mapStateToProps = state => {
    return {
        isPlaying: state.spotify.isPlaying,
        tokens: {
            access_token: state.login.access_token,
            refresh_token: state.login.refresh_token,
        },
    };
}

const mapDispatchToProps = dispatch => {
    return {
        resume: tokens => dispatch(resumePlayback(tokens)),
        pause: tokens => dispatch(pausePlayback(tokens)),
        next: tokens => dispatch(nextSong(tokens)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongControls);