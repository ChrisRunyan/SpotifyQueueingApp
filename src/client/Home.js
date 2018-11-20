import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'

class Home extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Link to="/join">Join a Room</Link>
				<Button href='/api/login'>Login with Spotify</Button>
			</div>
		);
	}
}

export default Home;
