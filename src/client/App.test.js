import React from 'react';
import ReactDOM from 'react-dom';
import Room from './Room';

it('renders without crashing', () => {
	const div = document.createElement('div');

	const songs = [
		{
			key: 'key',
			data: {
				votes: 0,
			},
		},
	];
	const room = {
		access_token: 'ddd',
		refresh_token: 'rrr',
		songs: songs,
	};
	ReactDOM.render(<Room room={room} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
