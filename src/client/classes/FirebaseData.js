import { Song } from './SpotifyData';

export class Room {
	constructor(id, room) {
		this.id = id ? id : '';
		this.roomOwner = room.roomOwner ? room.roomOwner : '';
		this.roomCode = room.room_code ? room.room_code : '';
		this.roomName = room.room_name ? room.room_name : '';
		this.access_token = room.spotify_access_token ? room.spotify_access_token : '';

		this.songs = [];
		if (room.songs) {
			Object.keys(room.songs).forEach(key =>
				this.songs.push({
					key: key,
					data: new Song(room.songs[key])
				})
			);
    	}
    
		this.users = [];
		Object.keys(room.users).forEach(key =>
			this.users.push(new User(room.users[key]))
		);
	}
}

export class User {
	constructor(user) {
		this.username = user.username;
		this.time_joined = user.time_joined ? user.time_joined : new Date();
	}
}
