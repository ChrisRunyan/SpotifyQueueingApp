import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App'
import JoinPage from './JoinPage'
import { FirebaseWrapper } from './firebase'

class MainRoutes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            room: null
        }
    }

    onRoomJoined = (roomCode, username) => {

    }

    render() {
        return(
            <BrowserRouter>
                <div>
                    <Route path='/' component={App} />
                    <Route 
                        path='/join' 
                        render={ props => 
                            <JoinPage onSubmit={this.onRoomJoined} />
                        } 
                    />
                </div>
            </BrowserRouter>
        )
    }
}

export default MainRoutes