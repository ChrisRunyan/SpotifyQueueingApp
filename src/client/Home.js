import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Image, Row, Col, PageHeader, Button } from 'react-bootstrap'
import './styles/index.css'
import apollo from './images/apollo_icon_black.png'

const divStyle = {
	verticalAlign: "middle",
	textAlign: "center"
}


class Home extends Component {
	constructor(props) {
		super(props);
	}

	

	render() {
		return (
			<div style={divStyle}>
				<Grid>
					<PageHeader>
						Apollo
					</PageHeader>
					<Row><Image src={apollo} style={{width: "200px"}} rounded /></Row>
					<br/>
					<Row><Button>
						<NavLink to='/join'>Join A Room</NavLink>
					</Button></Row>
					
					<br />
					<Button href='/api/login'>Create a Room</Button>
				</Grid>
			</div>
		);
	}
}

export default Home;
