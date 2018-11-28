import React from 'react';
import SocketContext from '../socket-context';
import {
	FormControl,
	FormGroup,
	ControlLabel,
	HelpBlock,
} from 'react-bootstrap';
import { AsyncTypeahead, TypeaheadMenu, MenuItem } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import SpotifyWrapper from '../classes/SpotifyWrapper';

class SongSearch extends React.Component {
	constructor(props, context) {
		super(props, context);

		// this.handleChange = this.handleChange.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
		console.log(
			`Access Token in SongSearch constructor: ${this.props.access_token}`
		);
		this.state = {
			isLoading: false,
			value: '',
			options: [],
			spotify: new SpotifyWrapper(this.props.access_token),
		};
	}

	getValidationState = () => {
		const length = this.state.value.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
		return null;
	};

	handleChange = e => {
		this.setState({ value: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log(this.getValidationState());
		this.state.spotify.searchSong(this.state.value);
	};

	// renderMenu = (results, menuProps) => {
	// 	return (
	// 		<TypeaheadMenu {...menuProps}>
	// 			{results.map((result, index) => {
	// 				<MenuItem option={}
	// 			})}
	// 		</TypeaheadMenu>
	// 	)
	// }

	render() {
		return (
			<AsyncTypeahead
				isLoading={this.state.isLoading}
				onSearch={query => {
					this.setState({
						isLoading: true,
					});
					this.state.spotify.searchSong(query).then(res => {
						this.setState({
							isLoading: false,
							options: res.tracks.items,
						});
					});
				}}
				options={this.state.options}
				labelKey={(option) => `${option.name} - ${option.artists[0].name}`}
				// renderMenu={(results, menuProps) => {
				// 	<TypeaheadMenu {...menuProps}>
				// 		{results.map((result, index) => {
				// 			<MenuItem option={result} position={index}>
				// 				{/* {result.name} - {result.artists[0].name} */}
				// 				{result.label}
				// 			</MenuItem>;
				// 		})}
				// 	</TypeaheadMenu>;
				// }}
			/>
		);
	}
}

// render(<FormExample />);
export default SongSearch;
