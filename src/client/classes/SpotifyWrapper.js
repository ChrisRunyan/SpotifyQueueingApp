import * as SpotifyData from './SpotifyData';
import SpotifyWebApi from 'spotify-web-api-js';

class SpotifyWrapper {
	/**
	 * Construct a new instance of the SpotifyWrapper
	 * @param {String} access_token The access_token provided by the Spotify Web Auth flow
	 */
	constructor(access_token) {
		this.spotify = new SpotifyWebApi();
        this.spotify.setAccessToken(access_token);
	}

    /**
     * Search for a song on Spotify
     * @param {String} query The search query
     * @return {Promise} A Promise object containing the search results
     */
	searchSong = (query) => {
        return this.spotify.searchTracks(query);
    };
    
    searchAll = (query) => {
        return this.spotify.search(query, ['album', 'artist', 'playlist', 'track']);
    }

    getIsPlaying = () => {
        return this.spotify.getMyCurrentPlaybackState()
            .then((err, res) => {
                if(err) {
                    console.log(err);
                } else {
                    return res.is_playing;
                }
            })
    }

    play = () => {
        return this.spotify.play();
    }

    pause = () => {
        return this.spotify.pause();
    }

}

export default SpotifyWrapper;
