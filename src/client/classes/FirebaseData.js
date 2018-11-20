import { Song } from './SpotifyData'

export class Room {
  constructor(key, room) {
    this.id = key ? key : ''
    this.roomOwner = room.roomOwner ? room.roomOwner : ''
    this.roomCode = room.room_code ? room.room_code : ''
    this.roomName = room.roomName ? room.roomName : ''
    this.access_token = room.access_token ? room.access_token : ''
    
    this.songs = []
    Object.keys(room.songs).forEach(key => 
      this.songs.push(new Song(room.songs[key]))
    )
    
    this.users = []
    Object.keys(room.users).forEach(key => 
      this.users.push(new User(room.users[key]))
    )

    // this.users = room.users ? room.users.map(u => new User(u.username, u.time_joined)) : []
  }
  
}

export class User {
  constructor(user) {
    this.username = user.username
    this.time_joined = user.time_joined ? user.time_joined : new Date()
  }
}