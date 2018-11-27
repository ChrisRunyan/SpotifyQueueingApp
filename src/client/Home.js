import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap'

class Home extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<NavLink to='/join'>Join A Room</NavLink>
                <br />
				<Button href='/api/login'>Create a Room</Button>
			</div>
		);
	}
}

export default Home;
