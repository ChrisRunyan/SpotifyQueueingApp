import React from 'react';
import ReactDOM from 'react-dom';
import Room from '../../client/Room';
import SongList from '../../client/components/SongList';
import { shallow, mount } from 'enzyme';
import Player from '../../client/components/Player';
import SongSearch from '../../client/components/SongSearch';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const songs = [];
	const room = {
		access_token: 'ddd',
		refresh_token: 'rrr',
		songs: songs,
	};
	ReactDOM.render(<Room room={room} />, div);
	ReactDOM.unmountComponentAtNode(div);
});

it('renders a search bar', () => {
	const songs = [];
	const room = {
		access_token: 'ddd',
		refresh_token: 'rrr',
		songs: songs,
	};
	const wrapper = shallow(<Room room={room} />);
	expect(wrapper.find(SongSearch).length).toBe(1);
})

it('renders a SongList with props', () => {
	const songs = [];
	const room = {
		access_token: 'ddd',
		refresh_token: 'rrr',
		songs: songs,
	};
	const wrapper = shallow(<Room room={room} />);
	expect(wrapper.find(SongList).length).toBe(1);
});

it('does not render a player when there are no songs', () => {
	const songs = [];
	const room = {
		access_token: 'ddd',
		refresh_token: 'rrr',
		songs: songs,
	};
	const wrapper = shallow(<Room room={room} />);
	expect(wrapper.find(Player).length).toBe(0);
});

it('renders a player when there is a song', () => {
	const songs = [
		{
			key: '',
			data: {
				id: 'id',
				query: 'query',
				name: 'name',
				duration: 0,
				progress: 0,
				addedBy: '',
				votes: 0,
				canVote: true,
				isPlaying: false,
				album: {
					id: 'id',
					query: 'query',
					name: 'name',
					images: [{ url: '' }, { url: '' }, { url: '' }],
				},
				artist: {
					id: '',
					query: '',
					name: '',
				},
			},
		}
		
	];
	const room = {
		access_token: 'ddd',
		refresh_token: 'rrr',
		songs: songs,
	};

	const wrapper = shallow(<Room room={room} isOnwer={true} />);
	
	expect(wrapper.find(Player).length).toBe(1);

});