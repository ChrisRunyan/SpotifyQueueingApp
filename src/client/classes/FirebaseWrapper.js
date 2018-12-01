import { Song } from './SpotifyData';

class FirebaseWrapper {
	constructor(socket) {
		this.socket = socket;
	}

	/**
	 * Get the room data from firebase
	 * @param {String} roomCode The user-created room code (firebase: rooms.<room_key>.room_code)
	 * @param {String} username A username to join as (firebase: rooms.<room_key>.users.<user_key>.username)
	 */
	joinRoom = (roomCode, username = 'default') => {
		this.socket.emit('firebase-join', roomCode, username);
	};

	/**
	 * Create a new Room entry in Firebase
	 * @param {String} roomCode The desired room code (firebase: rooms.<room_id>.room_code) for the room
	 * @param {String} roomName The desired room name (firebase: rooms.<room_id>.room_name)
	 * @param {String} username The username for the host
	 * @param {String} access_token The Spotify access_token obtained from the Spotify Auth flow
	 */
	createRoom = (roomCode, roomName, username, access_token, refreshToken, playlistId) => {
		this.socket.emit(
			'firebase-create',
			roomCode,
			roomName,
			username,
			access_token,
			refreshToken,
			playlistId,
		);
	};

	/**
	 * Add a song to the user's room, if they are in a valid room
	 * @param {SpotifyData.Song} song The song to add to the room (firebase: rooms.<room_id>.songs) 
	 * @param {String} username The username of the user that submitted the song
	 */
	addSong = (song, username) => {
		this.socket.emit('firebase-add-song', song, username);
	};

	updatePlaylistId = (roomKey, newPlaylistId) => {
		this.socket.emit('firebase-update-playlist', roomKey, newPlaylistId);
	}

	/**
	 * Vote on a song in the Room
	 * @param {String} songKey The song to vote on
	 * @param {Int} currentVotes The number of votes that the song currently has
	 */
	voteOnSong = (songKey, currentVotes) => {
		this.socket.emit('firebase-vote', songKey, currentVotes) 
	}
}

export default FirebaseWrapper;