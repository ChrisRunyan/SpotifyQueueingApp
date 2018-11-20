import React from 'react'

class Song extends React.Component {
    render() {

        const {
            title,
            artist,
            album,
            songLength,
            votes,
            id
        } = this.props;

        return (
            <tr>
                <td>{title}</td>
                <td>{artist}</td>
                <td>{album}</td>
                <td>{songLength}</td>
                <td>{votes}</td>
            </tr>
        )
    }
}

export default Song