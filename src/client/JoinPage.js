import React, { Component } from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap';


class JoinPage extends Component {
    
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
                            
                        </tbody>
                    </Table>
                </Row>
            </Grid>
        )
    }
}

export default JoinPage