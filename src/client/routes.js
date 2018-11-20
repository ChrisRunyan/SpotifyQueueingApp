import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import App from './App';
import JoinPage from './JoinPage';
import { FirebaseWrapper } from './firebase';
import io from 'socket.io-client';
import { Room } from './classes/FirebaseData';
import { createBrowserHistory } from 'history'

const socket = io({ path: '/ws' });
const history = createBrowserHistory()
const NotFound = () => <h1>404 - Page Not Found</h1>
class MainRoutes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firebaseWrapper: new FirebaseWrapper(socket),
			room: null,
		};
	}

	componentDidMount() {
		socket.on('firebase-join-success', (key, room) => {
            console.log("Firebase Join Success")
			this.setState({ room: new Room(key, room) }, () => {
				history.push(`/${this.state.room.id}`);
			});
		});
		socket.on('firebase-refresh', songs => {
			this.setState({
				room: new Room(this.state.room.id, {
					...this.state.room,
					songs,
				}),
			});
		});
	}

	joinRoom = (roomCode, username) => {
		console.log(
			`Submit complete\nRoom Code = ${roomCode}\nUsername = ${username}`
		);
		this.state.firebaseWrapper.joinRoom(roomCode, username);
	};

	render() {
		return (
			<Router history={history}>
                <Switch>
                    <Route exact path='/'>
                        <Link to='/join'>Join Room</Link>
                    </Route>
                    <Route 
                        path='/join'
                        render={ props => <JoinPage onSubmit={this.joinRoom}/>}
                    />
                    <Route 
                        path={this.state.room ? `/${this.state.room.id}` : null}
                        render={ props => (
                            <App
                                room={this.state.room}
                                firebaseWrapper={this.state.firebaseWrapper}
                            />
                        )}
                    />
                </Switch>
			</Router>
		);
	}
}

export default MainRoutes;
