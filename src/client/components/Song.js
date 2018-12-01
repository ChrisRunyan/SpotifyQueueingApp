import React from 'react';
import Counter from './Counter';
import Vote from './Vote';
class Song extends React.Component {
	render() {
		const {
			title,
			artist,
			album,
			songLength,
			votes,
			id,
			songKey,
		} = this.props;

		return (
			<tr>
				<td>{title}</td>
				<td>{artist}</td>
				<td>{album}</td>
				<td>{songLength}</td>
				<td>
					<Vote
						votes={votes}
						vote={() => this.props.vote(songKey, votes)}
					/>
				</td>
			</tr>
		);
	}
}

export default Song;
