class SpotifyData {
  constructor(id, name, query) {
    this.name = name ? name : ''
    this.id = id ? id : ''
    this.query = query ? query : ''
  }

  get name() { return this.name }
  get id() { return this.id }
  get query() { return this.query }

}

export class Album extends SpotifyData{
  constructor(id, name, query) {
    super(id, name, query)
  }
}

export class Artist extends SpotifyData{
  constructor(id, name, query) {
    super(id, name, query)
  }
}

export class Song extends SpotifyData {
  constructor(song) {
    super(song.id, song.name, song.query)

    this.addedBy = song.addedBy ? song.addedBy : ''
    this.votes = song.votes ? song.votes : 0

    this.album = new Album(
      song.album.id, song.album.name, song.album.query)
    this.artist = new Artist(
      song.artist.id, song.artist.name, song.artist.query)
  }

}

export class Room {
  constructor(room) {
    this.roomOwner = room.roomOwner;
    this.roomCode = room.roomCode;
    this.roomName = room.roomName;
    this.access_token = room.access_token;
    this.songs = room.songs.map(s => new Song(s))
  }

}

export class FirebaseWrapper {
  constructor(socket) {
    this.socket = socket
  }

  joinRoom = roomId => {
    fetch(`/api/fire/join/${roomId}`)
    // .then(

    // )
  }

}