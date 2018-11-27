import React from 'react';
import SocketContext from '../socket-context';
import {
	FormControl,
	FormGroup,
	ControlLabel,
	HelpBlock,
} from 'react-bootstrap';
import SpotifyWrapper from '../classes/SpotifyWrapper';

class SongSearch extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    console.log(`Access Token in SongSearch constructor: ${this.props.access_token}`)
		this.state = {
      value: '',
      spotify: new SpotifyWrapper(this.props.access_token),
		};
	}

	getValidationState() {
		const length = this.state.value.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
		return null;
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
    console.log(this.getValidationState());
    this.state.spotify.searchSong(this.state.value);
		// console.log(this.props.socket)
		// this.props.socket.emit('addSong');
		// this.props.socket.on('song', data =>
		// 	this.props.addSong(
		// 		data.title,
		// 		data.artist,
		// 		data.album,
		// 		data.songLength
		// 	)
		// );
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<FormGroup
					controlId="formBasicText"
					validationState={this.getValidationState()}
				>
					{/* <ControlLabel>Working example with validation</ControlLabel> */}
					<FormControl
						type="text"
						value={this.state.value}
						placeholder="Search..."
						onChange={this.handleChange}
					/>
					<FormControl.Feedback />
					{/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
				</FormGroup>
			</form>
		);
	}
}

// render(<FormExample />);
export default SongSearch;
