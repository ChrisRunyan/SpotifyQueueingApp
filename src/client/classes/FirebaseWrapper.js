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

	createRoom = (roomCode, roomName, username, access_token) => {
		this.socket.emit(
			'firebase-create',
			roomCode,
			roomName,
			username,
			access_token
		);
	};

	addSong = song => {
		this.socket.emit('firebase-add-song', song);
	};

	voteOnSong = (songKey, currentVotes) => {
		this.socket.emit('firebase-vote', songKey, currentVotes) 
	}
}

export default FirebaseWrapper;