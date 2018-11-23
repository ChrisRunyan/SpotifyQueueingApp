import { Song } from './classes/SpotifyData';

export class FirebaseWrapper {
	constructor(socket) {
		this.socket = socket;
	}

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
