class SpotifyData {
    constructor(id, name, query) {
      this.name = name ? name : ''
      this.id = id ? id : ''
      this.query = query ? query : ''
    }
  
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
      super(song.song_id, song.song_name, song.song_query)
  
      this.addedBy = song.addedBy ? song.addedBy : ''
      this.votes = song.votes ? song.votes : 0
      // this.duration = song.duration ? song.duration : 0
      // this.progress = song.progress ? song.progress : 0
  
      this.album = new Album(
        song.album_id, song.album_name, song.album_query)
      this.artist = new Artist(
        song.artist_id, song.artist_name, song.artist_query)
    }
  
  }