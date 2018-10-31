import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import '../styles/SongListItem.css'

const SongListItem = props => {
    let songName = props.song ? props.song.name : ''
    let artistName = props.artist ? props.artist.name : ''
    let albumName = props.album ? props.album.name : ''
    let albumArtUrl = props.album ? props.album.image_url : ''

    return (
        <div className="SongListItem">
            <div className="AlbumArt">
                <img src={albumArtUrl} alt="Art"></img>
            </div>
            <div className="AlbumInfo">
                <h2>
                    Currently Playing: { songName } by { artistName }
                </h2>
                <p>{ albumName }</p>
            </div>
        </div>
    )
}

SongListItem.propTypes = {
    song: PropTypes.objectOf(PropTypes.string),
    artist: PropTypes.objectOf(PropTypes.string),
    album: PropTypes.objectOf(PropTypes.string),
}

const mapStateToProps = state => {
    return {
        song: state.spotify.currently_playing.song,
        artist: state.spotify.currently_playing.artists[0],
        album: state.spotify.currently_playing.album,
    };
}

const mapDispatchToProps = dispatch => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongListItem);