import React from 'react';
import {
	AsyncTypeahead,
	// Menu,
	// MenuItem,
	// Highlighter,
} from 'react-bootstrap-typeahead';
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

	//// *** Not working or required, but might be nice if we want multiple search result types
	////		in the future *** 
	// _renderMenu = (options, menuProps) => {
	// 	const idx = 0;
	// 	console.log(options)
	// 	const dividedItems = Object.keys(options).map(resultType => {
	// 		console.log(`resultType=${resultType}`)
	// 		return [
	// 			<Menu.Divider key={`${resultType}-divider`} />,
	// 			<Menu.Header key={`${resultType}-header`}>
	// 				{resultType}
	// 			</Menu.Header>,
	// 			options[resultType].items.map(option => {
	// 				const item = (
	// 					<MenuItem key={idx} option={option} position={idx}>
	// 						<Highlighter search={menuProps.text}>
	// 							{option.name}
	// 						</Highlighter>
	// 					</MenuItem>
	// 				);
	// 				idx++;
	// 				return item;
	// 			}),
	// 		];
	// 	});
	// 	return <Menu {...menuProps}>{dividedItems}</Menu>;
	// };
	render() {
		return (
			<AsyncTypeahead
				searchText={'...'}
				useCache
				isLoading={this.state.isLoading}
				onSearch={query => {
					this.setState({
						isLoading: true,
					});
					this.props.spotify.searchSong(query, res => {
						console.log(res);
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
					console.log(option);
					if (option[0]) {
						this.props.submit(option[0]);
					}
				}}
				// renderMenu={this._renderMenu}
			/>
		);
	}
}

export default SongSearch;
