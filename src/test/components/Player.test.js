import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Song } from '../../client/classes/SpotifyData';
import Player from '../../client/components/Player';
import { ProgressBar, Glyphicon } from 'react-bootstrap';

const debugSong = new Song();

describe('Player Component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Player song={debugSong} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders a progress bar when the user is an owner', () => {
        const wrapper = shallow(<Player song={new Song()} isOwner={true} />);
        expect(wrapper.find(ProgressBar).length).toBe(1);
    })

    it('renders a control button when the user is an owner', () => {
        const wrapper = shallow(<Player song={new Song()} isOwner={true} />);
        expect(wrapper.find(Glyphicon).length).toBe(1);
    });


})