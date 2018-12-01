import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Button, Grid, Image, Row, Col, PageHeader, } from 'react-bootstrap';
import apollo from './images/apollo_icon_black.png'

const divStyle = {
	verticalAlign: "middle",
	textAlign: "center"
}
class CreatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomCode: '',
            roomName: '',
            username: ''
        }
    }

    getValidationState = () => {
        return 'success'
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmit(
            this.state.roomCode, 
            this.state.roomName, 
            this.state.username, 
            this.props.accessToken,
            this.props.refreshToken,
        )
    }

    render() {
        return(
            <div style={divStyle}>
                <Grid>
                    <PageHeader>
                        Apollo
                    </PageHeader>
                    <Row><Image src={apollo} style={{width: "200px"}} rounded /></Row>
                    <br/>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <FormGroup controlId='roomCode'>
                            <Col componentClass={ControlLabel} sm={2}>
                                Enter Room Code
                            </Col> 
                            <Col sm={10}>
                                <FormControl
                                    id='roomCode'
                                    type='text'
                                    value={this.state.roomCode}
                                    placeholder="Room Code"
                                    onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Enter Username
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    id='username'
                                    type='text'
                                    value={this.state.username}
                                    placeholder="Username"
                                    onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Room Name
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    id='roomName'
                                    type='text'
                                    value={this.state.roomName}
                                    placeholder='Room Name'
                                    onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type='submit'>Create Room</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Grid>
            </div>
        )
    }
}

export default CreatePage