import { Song } from './SpotifyData'

export class Room {
  constructor(room) {
    this.roomOwner = room.roomOwner ? room.roomOwner : ''
    this.roomCode = room.roomCode ? room.roomCode : ''
    this.roomName = room.roomName ? room.roomName : ''
    this.access_token = room.access_token ? room.access_token : ''
    this.songs = room.songs ? room.songs.map(s => new Song(s)) : []
    this.users = room.users ? room.users.map(u => new User(u.username, u.time_joined)) : []
  }
  
}

export class User {
  constructor(username, time_joined = null) {
    this.username = username
    this.time_joined = time_joined ? time_joined : new Date()
  }
}