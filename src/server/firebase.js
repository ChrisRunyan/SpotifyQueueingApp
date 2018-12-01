const firebase = require('firebase');
const dotenv = require('dotenv').config();

const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DB_URL,
	projectId: process.env.FIREBASE_PROJ_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
};

module.exports = class Firebase {
	constructor() {
		// this.socket = socket;
		this.app = firebase.initializeApp(config);
		this.databaseRef = this.app.database().ref();
		this.roomsRef = this.databaseRef.child('rooms');
		this.currentRoomRef = null;
	}

	getRoomByCode(roomCode) {
		return this.roomsRef
			.orderByChild('room_code') // Make a Query object centered on the room_code attr.
			.equalTo(roomCode) // Find the room with room_code == roomCode
			.once('value')
			.then(result => {
				// Get DataSnapshot of result.
				const key = Object.keys(result.val())[0]; // 'result' = All rooms where room_code == roomCode,
				// Object.keys() will give a list of keys generated by Firebase
				return this.roomsRef.child(key); // Return a Ref to the first room in 'result'
			});
	}

	joinRoom(roomCode, username) {
		return this.getRoomByCode(roomCode) // Get the room to join
			.then(ref => {
				// console.log(`joinRoom ref = ${ref.toString()}`);
				const time_joined = new Date();
				const newUser = ref.child('users').push(); // Add a new user to the room
				this.currentRoomRef = ref;
				this.listenForChanges(this.currentRoomRef);
				newUser.set({
					username,
					time_joined: time_joined.toISOString(),
				});
				ref.once('value', val => {
					this.socket.emit('firebase-join-success', val.key, val);
				});
			});
	}

	createRoom(
		roomCode,
		roomName,
		userId,
		access_token,
		refresh_token,
		playlistId
	) {
		console.log(`createRoom(): roomName=${roomName}`);
		const newRoomRef = this.roomsRef.push({
			songs: {},
			users: {
				username: userId,
				time_joined: new Date(),
			},
			room_code: roomCode,
			room_name: roomName,
			room_owner: userId,
			spotify_access_token: access_token,
			spotify_refresh_token: refresh_token,
			spotify_playlist_id: playlistId,
		});
		this.currentRoomRef = newRoomRef.ref;
		this.listenForChanges(this.currentRoomRef);
		this.currentRoomRef.once('value', val => {
			this.socket.emit('firebase-create-success', val.key, val);
		});
	}

	addSong(song, username) {
		// const roomRef = roomsRef.child(roomKey)
		// return roomRef.child("songs").push(song)
		// console.log(`addSong(): currentRoomRef=${this.currentRoomRef}`);
		if (this.currentRoomRef) {
			console.log(`Adding Song: username=${username}`);
			// console.log(`Adding Song: ${JSON.stringify(song)}`);
			this.currentRoomRef.child('songs').push(
				Object.assign(
					{
						addedBy: username,
					},
					song
				)
			);
		}
	}

	updatePlaylistId(playlistId) {
		if (this.currentRoomRef) {
			this.currentRoomRef.update({
				spotify_playlist_id: playlistId,
			});
		}
	}

	setCurrentRoom(roomCode) {
		this.currentRoomRef = this.roomsRef
			.orderByChild('room_code') // Make a Query object centered on the room_code attr.
			.equalTo(roomCode) // Find the room with room_code == roomCode
			.once('value')
			.then(result => {
				// Get DataSnapshot of result.
				const key = Object.keys(result.val())[0]; // 'result' = All rooms where room_code == roomCode,
				// Object.keys() will give a list of keys generated by Firebase
				return this.roomsRef.child(key); // Return a Ref to the first room in 'result'
			});
		this.listenForChanges(this.currentRoomRef);
	}

	voteOnSong(songKey, currentVotes) {
		const votesRefKey = `songs/${songKey}/votes`;
		if (this.currentRoomRef) {
			this.currentRoomRef.update({
				[votesRefKey]: currentVotes + 1,
			});
		}
	}

	listenForChanges(ref) {
		if (ref) {
			console.log('Listening for Changes');
			ref.on('child_changed', snapshot => {
				console.log(
					`Child Changed: snapshot=${JSON.stringify(snapshot.val())}`
				);

				this.socket.emit('firebase-refresh', snapshot);
			});
		}
	}
};
