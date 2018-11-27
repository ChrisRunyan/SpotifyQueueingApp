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
     * @param {Function} callback A callback function that takes one parameter - A list
     *  Song objects
     */
	searchSong = (query, callback) => {
        console.log(`Access Token: ${this.spotify.getAccessToken()}`)
		this.spotify.search(query, ['track'], {}, (err, res) => {
			if (err) {
				console.log(`Error Searching: ${JSON.stringify(err)}`);
			} else {
                console.log(res);
				res.tracks.items.forEach(item => {
                    const song = new SpotifyData.Song(item);
                    console.log(song);
                })
			}
		});
	};
}

export default SpotifyWrapper;
