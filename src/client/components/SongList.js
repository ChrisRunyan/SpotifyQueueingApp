import React from 'react';
import Song from './Song';
import { Table } from 'react-bootstrap';

const getTimestring = millis => {
	const seconds = millis / 1000;
	const minutes = (seconds / 60).toFixed(0);
	const remainingSeconds = seconds % 60 < 10 ? '0' + (seconds % 60).toFixed(0) : (seconds % 60).toFixed(0);
	return `${minutes}:${remainingSeconds}`
}

export default (props) => {
	const sortableSongs = props.songs;
	sortableSongs.sort((a, b) => {
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
				{sortableSongs.map((song, index) => {
					const songLength = getTimestring(song.data.duration);
					return (
						<Song
							title={song.data.name}
							artist={song.data.artist.name}
							album={song.data.album.name}
							songLength={songLength}
							votes={song.data.votes}
							id={song.data.id}
							canVote={song.data.canVote}
							key={song.key}
							songKey={song.key}
							index={index}
							vote={props.vote}
						/>
					)
				})}
			</tbody>
		</Table>
	);
}