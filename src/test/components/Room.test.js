import React from 'react';
import ReactDOM from 'react-dom';
import Room from '../../client/Room';
import SongList from '../../client/components/SongList';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

beforeEach(() => {
	
})


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

it('renders a SongList', () => {
	const songs = [];
	const room = {
		access_token: 'ddd',
		refresh_token: 'rrr',
		songs: songs,
	};
	const wrapper = shallow(<Room room={room} />);
	expect(wrapper.contains(
		<SongList 
			songs={songs} 
			currentSong={null} 
			vote={wrapper.instance().vote} 
			/>)
	).toBe(true);
});
