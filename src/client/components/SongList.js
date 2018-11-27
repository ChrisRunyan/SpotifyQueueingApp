import React from 'react';
import Song from './Song';
class SongList extends React.Component {
	sortSongs(songA, songB) {
		if (songA.votes < songB.votes) {
			return -1;
		}
		if (songA.votes > songB.votes) {
			return 1;
		}
		return 0;
	}

	render() {
        const sortableSongs = this.props.songs;
        sortableSongs.sort((a, b) => {
            console.log(typeof(a.votes));
            return b.data.votes - a.data.votes;
        });
		return (
			<tbody>
				{sortableSongs.map((song, index) => (
					<Song
						title={song.data.name}
						artist={song.data.artist.name}
						album={song.data.album.name}
						songLength={'0'}
						votes={song.data.votes}
						id={song.data.id}
						key={song.key}
						songKey={song.key}
						index={index}
						vote={this.props.vote}
					/>
				))}
			</tbody>
		);
	}
}

export default SongList;
