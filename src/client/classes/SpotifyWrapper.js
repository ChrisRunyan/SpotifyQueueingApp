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
}

export default SpotifyWrapper;