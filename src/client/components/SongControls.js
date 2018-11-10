import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../styles/SongControls.css'
import { pausePlayback, resumePlayback } from '../actions/spotifyAction'
import { pushSong, voteOnSong } from '../actions/firebaseAction'

const SongControls = props => { 
    const playButtonText = props.isPlaying ? 'Pause' : 'Play'
    const togglePlayback = () => {
        if(props.isPlaying) {
            props.pause(props.tokens)
        } else {
            props.resume(props.tokens)
        }
    }
    return (
        <div className="container">
            <button className="play-button" onClick={togglePlayback}>{ playButtonText }</button>
            <button className="play-button" onClick={() => props.push(props.song, props.roomId)}>Push to Firebase</button>
        </div>
    )
}

SongControls.propTypes = {
    isPlaying: PropTypes.bool,
    tokens: PropTypes.objectOf(PropTypes.string),
    resume: PropTypes.func,
    pause: PropTypes.func,
    playNext: PropTypes.func,
    push: PropTypes.func,
};

const mapStateToProps = state => {
    return {
        isPlaying: state.spotify.isPlaying,
        tokens: {
            access_token: state.login.access_token,
            refresh_token: state.login.refresh_token,
        },
        roomId: state.firebase.room.key,
        song: state.spotify.currently_playing,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        resume: tokens => dispatch(resumePlayback(tokens)),
        pause: tokens => dispatch(pausePlayback(tokens)),
        push: (song, roomId) => dispatch(pushSong(song, roomId)),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongControls);