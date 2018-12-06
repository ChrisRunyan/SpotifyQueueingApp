class SpotifyData {
	constructor(id, name, query) {
		this.name = name ? name : '';
		this.id = id ? id : '';
		this.query = query ? query : '';
	}
}

export class Album extends SpotifyData {
	constructor(id, name, query, images) {
		super(id, name, query);
		this.images = images ? images : [];
	}
}

export class Artist extends SpotifyData {
	constructor(id, name, query) {
		super(id, name, query);
	}
}

export class Song extends SpotifyData {
	constructor(song = {}) {
		super(song.id, song.name, song.query);

		this.addedBy = song.addedBy ? song.addedBy : '';
		this.votes = song.votes ? song.votes : 0;

		this.duration = song.duration ? song.duration : 0;
		this.progress = song.progress ? song.progress : 0;
		this.canVote = song.canVote ? song.canVote : true;
		this.isPlaying = song.isPlaying ? song.isPlaying : false;

		let primaryArtist = null;
		if (song.artists) {
			primaryArtist = song.artists[0];
		} else if (song.artist) {
			primaryArtist = song.artist;
		} else {
			primaryArtist = {};
		}

		const album = song.album ? song.album : {};

		this.album = new Album(
			album.id,
			album.name,
			album.query,
			album.images
		);
		this.artist = new Artist(
			primaryArtist.id,
			primaryArtist.name,
			primaryArtist.query
		);
	}
}
