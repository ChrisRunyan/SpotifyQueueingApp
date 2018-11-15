import { Song } from './SpotifyData'

export class Room {
    constructor(room) {
      this.roomOwner = room.roomOwner ? room.roomOwner : ''
      this.roomCode = room.roomCode ? room.roomCode : ''
      this.roomName = room.roomName ? room.roomName : ''
      this.access_token = room.access_token ? room.access_token : ''
      this.songs = room.songs ? room.songs.map(s => new Song(s)) : []
    }
  
  }