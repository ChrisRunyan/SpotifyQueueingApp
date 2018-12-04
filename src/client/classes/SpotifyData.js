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
		console.log('album constructor');
		console.log(images);
		this.images = images;
	}
}

export class Artist extends SpotifyData {
	constructor(id, name, query) {
		super(id, name, query);
	}
}

export class Song extends SpotifyData {
	constructor(song) {
		super(song.id, song.name, song.query);

		this.addedBy = song.addedBy ? song.addedBy : '';
		this.votes = song.votes ? song.votes : 0;

		this.duration = song.duration ? song.duration : 0
		this.progress = song.progress ? song.progress : 0
		this.canVote = song.canVote ? song.canVote : true;
		this.isPlaying = song.isPlaying ? song.isPlaying : false;

		const primaryArtist = song.artists ? song.artists[0] : song.artist;

		this.album = new Album(
			song.album.id,
			song.album.name,
			song.album.query,
			song.album.images
		);
		this.artist = new Artist(
			primaryArtist.id,
			primaryArtist.name,
			primaryArtist.query
		);
	}

	disableVoting = () => {
		this.canVote = false;
	}

	setIsPlaying = (isPlaying) => {
		this.isPlaying = isPlaying;
	}

}
