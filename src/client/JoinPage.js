import React, { Component } from 'react'
import { Table, Grid, Row, Col, FormGroup, FormControl } from 'react-bootstrap';


class JoinPage extends Component {
    constructor(props) {
        this.state = {
            roomCode: '',
            username: ''
        }
    }

    getValidationState = () => {

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return(
            <Grid>
                <Row>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Room Code</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <form onSubmit={() => this.props.onSubmit(this.state.roomCode, this.state.username)}>
                                <FormGroup
                                    controlId='formBasicText'
                                    validationState={this.getValidationState}
                                >
                                    <td>
                                        <FormControl
                                            id='roomCode'
                                            type='text'
                                            value={this.state.roomCode}
                                            placeholder="Room Code"
                                            onChange={this.handleChange} />
                                    </td>
                                    <td>
                                        <FormControl
                                            id='username'
                                            type='text'
                                            value={this.state.username}
                                            placeholder="Room Code"
                                            onChange={this.handleChange} />
                                    </td>
                                </FormGroup>
                            </form>
                        </tbody>
                    </Table>
                </Row>
            </Grid>
        )
    }
}

export default JoinPage