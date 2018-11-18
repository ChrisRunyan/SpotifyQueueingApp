import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App'
import JoinPage from './JoinPage'
import { FirebaseWrapper } from './firebase'
import io from 'socket.io-client'

const socket = io({ path: '/ws' })

class MainRoutes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            room: null
        }
    }

    joinRoom = (roomCode, username) => {

    }

    render() {
        return(
            <BrowserRouter>
                <div>
                    <Route path='/' 
                        render={props => 
                            <App socket={socket} />
                        } />
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