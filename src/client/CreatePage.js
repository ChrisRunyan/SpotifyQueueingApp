import React, { Component } from 'react'
import { 
    Form, 
    FormGroup,
    InputGroup, 
    FormControl, 
    Button, 
    Grid, 
    Image, 
    Row, 
    Col, 
    PageHeader, 
} from 'react-bootstrap';
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
                            <InputGroup>
                                <InputGroup.Addon>
                                    Enter Room Code
                                </InputGroup.Addon>
                                <FormControl
                                    id='roomCode'
                                    type='text'
                                    value={this.state.roomCode}
                                    onChange={this.handleChange}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon >
                                    Enter Alias
                                </InputGroup.Addon>
                                <FormControl
                                    id='username'
                                    type='text'
                                    value={this.state.username}
                                    onChange={this.handleChange} 
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>
                                    Enter Room Name
                                </InputGroup.Addon>
                                <FormControl
                                    id='roomName'
                                    type='text'
                                    value={this.state.roomName}
                                    onChange={this.handleChange} 
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={8}>
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