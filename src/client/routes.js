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
            firebaseWrapper: new FirebaseWrapper(socket),
            room: null
        }
    }

    componentDidMount() {
        // socket.on("firebase-join-success", room => {
        //     console.log(`Firebase Join Success!! Room=${JSON.stringify(room)}`)
        //     this.setState({ room: new Room(room) })
        // })

    }

    joinRoom = (roomCode, username) => {
        // socket.emit('firebase-join', roomCode, username)
        firebaseWrapper.joinRoom(roomCode, username)
    }

    render() {
        return(
            <BrowserRouter>
                <div>
                    <Route path='/' 
                        render={props => 
                            <App firebaseWrapper={this.state.firebaseWrapper} />
                        } />
                    <Route 
                        path='/join' 
                        render={ props => 
                            <JoinPage onSubmit={this.joinRoom} />
                        } 
                    />
                </div>
            </BrowserRouter>
        )
    }
}

export default MainRoutes