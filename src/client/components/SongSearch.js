import React from 'react';
import {
	AsyncTypeahead,
} from 'react-bootstrap-typeahead';
import {
	FormGroup,
	InputGroup,
	InputGroupAddon,
	Glyphicon,
} from 'react-bootstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class SongSearch extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isLoading: false,
			value: '',
			options: [],
		};
	}

	render() {
		return (
			<FormGroup>
				<InputGroup>
					<InputGroup.Addon>
						<Glyphicon glyph='search' /> Search Spotify
					</InputGroup.Addon>
					<AsyncTypeahead
						searchText={'...'}
						useCache
						isLoading={this.state.isLoading}
						onSearch={query => {
							this.setState({
								isLoading: true,
							});
							this.props.spotify.searchSong(query, res => {
								// console.log(res);
								this.setState({
									isLoading: false,
									options: res.tracks.items,
								})
							})
						}}
						options={this.state.options}
						labelKey={option =>
							`${option.name} - ${option.artists[0].name}`
						}
						onChange={option => {
							// console.log(option);
							if (option[0]) {
								this.props.submit(option[0]);
							}
						}}
					/>
				</InputGroup>
			</FormGroup>
			
		);
	}
}

export default SongSearch;
