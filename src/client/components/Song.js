import React from 'react'

class Song extends React.Component {
    render() {

        const {
            title,
            artist,
            album,
            songLength,
            votes,
            id,
            songKey
        } = this.props;

        return (
            <tr>
                <td>{title}</td>
                <td>{artist}</td>
                <td>{album}</td>
                <td>{songLength}</td>
                <td onClick={(songKey, votes) => this.props.vote(songKey, votes)}>{votes}</td>
            </tr>
        )
    }
}

export default Song