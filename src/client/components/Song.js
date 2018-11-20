import React from 'react';
import Counter from './Counter';

class Song extends React.Component {
    render() {

        const {
            title,
            artist,
            album,
            songLength,
            votes,
            id,
            changeVote
        } = this.props;

        return (
            <tr>
                <td>{title}</td>
                <td>{artist}</td>
                <td>{album}</td>
                <td>{songLength}</td>
                <td><Counter
                    votes = {votes}
                    id = {id}
                    changeVote={changeVote}
                /></td>
            </tr>
        )
    }
}

export default Song