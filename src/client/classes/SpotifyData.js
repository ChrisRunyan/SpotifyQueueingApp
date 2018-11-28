class SpotifyData {
	constructor(id, name, query) {
		this.name = name ? name : '';
		this.id = id ? id : '';
		this.query = query ? query : '';
	}
}

export class Album extends SpotifyData {
	constructor(id, name, query) {
		super(id, name, query);
	}
}

export class Artist extends SpotifyData {
	constructor(id, name, query) {
		super(id, name, query);
	}
}

export class Song extends SpotifyData {
	constructor(song) {
		console.log('Song Constructor');
		console.log(song);
		super(song.id, song.name, song.query);

		this.addedBy = song.addedBy ? song.addedBy : '';
		this.votes = song.votes ? song.votes : 0;
		// this.duration = song.duration ? song.duration : 0
		// this.progress = song.progress ? song.progress : 0

		const primaryArtist = song.artists ? song.artists[0] : song.artist;

		this.album = new Album(
			song.album.id,
			song.album.name,
			song.album.query
		);
		this.artist = new Artist(
			primaryArtist.id,
			primaryArtist.name,
			primaryArtist.query
		);
	}

}
