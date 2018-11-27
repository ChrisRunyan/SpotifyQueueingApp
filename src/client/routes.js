import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import App from './App';
import JoinPage from './JoinPage';
import CreatePage from './CreatePage';
import { Song } from './classes/SpotifyData'
import Home from './Home';
import FirebaseWrapper from './classes/FirebaseWrapper';
import io from 'socket.io-client';
import { Room } from './classes/FirebaseData';
import { createBrowserHistory } from 'history';

const socket = io({ path: '/ws' });
const history = createBrowserHistory();
const NotFound = () => <h1>404 - Page Not Found</h1>;

class MainRoutes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firebaseWrapper: new FirebaseWrapper(socket),
			room: null,
		};
	}

	componentDidMount() {
		socket.on('firebase-join-success', (key, room) =>
			this.displayRoom(new Room(key, room))
		);
		socket.on('firebase-create-success', (key, room) =>
			this.displayRoom(new Room(key, room))
		);
		socket.on('firebase-refresh', songs => {
			let sList = []
			Object.keys(songs).forEach(key =>
				// sList.push(new Song(songs[key]))
				sList.push({
					key: key,
					data: new Song(songs[key])
				})
			);
			this.setState({
				room: {
					...this.state.room,
					songs: sList
				}
			})
			history.push(`/room/${this.state.room.id}`)
		}
		);
		if (window.location.hash) {
			history.push(window.location.hash.substring(1));
		}
	}

	displayRoom = room =>
		this.setState({ room: room }, () => {
			history.push(`/room/${this.state.room.id}`);
		});

	joinRoom = (roomCode, username) => {
		this.state.firebaseWrapper.joinRoom(roomCode, username);
	};

	createRoom = (roomCode, roomName, username, access_token) => {
		this.state.firebaseWrapper.createRoom(
			roomCode,
			roomName,
			username,
			access_token
		);
	};

	login = () => {
		history.push('/api/login');
	};

	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route
						exact
						path="/"
						render={props => <Home login={this.login} />}
					/>
					<Route
						path="/join"
						render={props => <JoinPage onSubmit={this.joinRoom} />}
					/>
					<Route
						exact
						path="/login/:accessToken/:redirectToken"
						render={({ match }) => (
							<CreatePage
								accessToken={match.params.accessToken}
								onSubmit={this.createRoom}
							/>
						)}
					/>
					<Route
						path={
							this.state.room
								? `/room/${this.state.room.id}`
								: null
						}
						render={props => (
							<App
								room={this.state.room}
								firebaseWrapper={this.state.firebaseWrapper}
							/>
						)}
					/>
					<Route component={NotFound} />
				</Switch>
			</Router>
		);
	}
}

export default MainRoutes;
