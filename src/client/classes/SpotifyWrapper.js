import * as SpotifyData from './SpotifyData';
import SpotifyWebApi from 'spotify-web-api-js';

/**
 * Middleware for the SpotifyAPI to refresh the access_token if it has expired.
 * @param {String} refresh_token The refresh token provided by the Spotify Auth Code Authorization Flow
 * @param {Function} callback A callback function to handle the result of the SpotifyAPI call if it succeeds
 */
const refreshMiddleware = (refresh_token, callback) => (err, res) => {
	if (err) {
		if (err.status === 401) {
			console.log('access_token expired');
			// history.pushState(null, null, `/api/refresh?${refresh_token}`)
		} else if (err.status === 404) {
            console.log(err);
        } else if (err.status === 429) {
			console.log('rate limiting applied');
		} else if (err.status === 403) {
            console.log('Forbidden request');
        }
	} else {
		return callback(res);
	}
};

class SpotifyWrapper {
	/**
	 * Construct a new instance of the SpotifyWrapper
	 * @param {String} access_token The access_token provided by the Spotify Web Auth flow
	 */
	constructor(access_token, refresh_token) {
		this.spotify = new SpotifyWebApi();
		this.spotify.setAccessToken(access_token);
		this.refresh_token = refresh_token;
	}

	/**
	 * Search for a song on Spotify
	 * @param {String} query The search query
	 * @param {Fuction} callback A function which handles the response object returned by the SpotifyAPI
	 * if it succeeds.
	 * @param {Object} options Request options.  See the Spotify API documentation for available options.
	 */
	searchSong = (query, callback, options = null) => {
		const middleware = refreshMiddleware(this.refresh_token, callback);
		this.spotify.searchTracks(query, options, middleware);
	};

	/**
	 * Search songs, artists, albums, and playlists through the SpotifyAPI
	 * @param {String} query The search query
	 * @param {Fuction} callback A function which handles the response object returned by the SpotifyAPI
	 * if it succeeds.
	 * @param {Object} options Request options.  See the Spotify API documentation for available options.
	 */
	searchAll = (query, callback, options = null) => {
		const middleware = refreshMiddleware(this.refresh_token, callback);
		this.spotify.search(
			query,
			['album', 'artist', 'playlist', 'track'],
			options,
			middleware
		);
	};

	getPlayerInfo = (callback, options = null) => {
		const middleware = refreshMiddleware(this.refresh_token, callback);
		this.spotify.getMyCurrentPlaybackState(options, middleware);
	};

	play = () => {
		const middleware = refreshMiddleware(this.refresh_token, res => res);
		return this.spotify.play(null, middleware);
	};

	pause = () => {
		const middleware = refreshMiddleware(this.refresh_token, res => res);
		this.spotify.pause(null, middleware);
	};

	createPlaylist = (name, callback, options = null) => {
		const middleware = refreshMiddleware(this.refresh_token, callback);
		this.spotify.createPlaylist(
			{
				name: name,
				...options,
			},
			middleware
		);
	};

    /**
     * Append a track to the desired playlist
     * @param {String} playlistId The ID of the playlist to be changed
     * @param {String|Int} songId The ID of the song to be added
     * @param {Function} callback A function to be applied to the result object returned
     * by the SpotifyAPI.  This result has the format { snapshot_id: <snapshot_id> }
     * @param {Object} options An optional options object to be passed along with the call
     * to the SpotifyAPI
     */
	addSongToPlaylist = (playlistId, songId, callback, options = null) => {
		const middleware = refreshMiddleware(this.refresh_token, callback);
		const uri = `spotify:track:${songId}`;
		this.spotify.addTracksToPlaylist(
			playlistId,
			[uri],
			options,
			middleware
		);
	};

	/**
	 * Moves the song at {@link songIndex}
	 * @param {String} playlistId The ID of the playlist to be changed
	 * @param {Int} songIndex The index of the song to be moved
	 * @param {Function} callback A function to be applied to the result object of this call
	 * @param {Object} options An optional options object to be passed along with the call to
	 * the SpotifyAPI
	 */
	makeSongNextPlayed = (playlistId, songIndex, callback, options = null) => {
		const middleware = refreshMiddleware(this.refresh_token, callback);
		this.spotify.reorderTracksInPlaylist(
			playlistId,
			songIndex,
			1,
			options,
			middleware
		);
	};
}

export default SpotifyWrapper;