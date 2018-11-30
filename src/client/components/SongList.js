import React from 'react';
import Song from './Song';
import { Table } from 'react-bootstrap';
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
			<Table striped bordered condensed hover>
				<thead>
					<tr>
						<th>Song</th>
						<th>Artist</th>
						<th>Album</th>
						<th>Length</th>
						<th>Votes</th>
					</tr>
				</thead>
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
			</Table>
		);
	}
}

export default SongList;
