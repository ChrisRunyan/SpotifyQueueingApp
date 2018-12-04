import React from 'react';
import Vote from './Vote';

export default props => {
	const { title, artist, album, songLength, votes, songKey, canVote } = props;
	return (
		<tr>
			<td>{title}</td>
			<td>{artist}</td>
			<td>{album}</td>
			<td>{songLength}</td>
			<td>
				{canVote ? (
					<Vote
						votes={votes}
						vote={() => props.vote(songKey, votes)}
					/>
				) : null}
			</td>
		</tr>
	);
};
