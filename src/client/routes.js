import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import App from './App';
import JoinPage from './JoinPage';
import CreatePage from './CreatePage';
import { Song } from './classes/SpotifyData'
import Home from './Home';
import FirebaseWrapper from './classes/FirebaseWrapper';
import SpotifyWrapper from './classes/SpotifyWrapper';
import io from 'socket.io-client';
import { Room } from './classes/FirebaseData';
import { createBrowserHistory } from 'history';
import './styles/index.css';

const socket = io({ path: '/ws' });
const history = createBrowserHistory();
const NotFound = () => <h1>404 - Page Not Found</h1>;

class MainRoutes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firebaseWrapper: new FirebaseWrapper(socket),
			spotifyWrapper: null,
			room: null,
			user: null,
		};
	}

	componentDidMount() {
		socket.on('firebase-join-success', (key, room) =>
			this.displayRoom(new Room(key, room))
		);
		socket.on('firebase-create-success', (key, room) => {
			this.displayRoom(new Room(key, room))
		});
		socket.on('firebase-refresh', songs => {
			let sList = []
			Object.keys(songs).forEach(key =>
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
		this.setState({
			user: { username }
		});
		this.state.firebaseWrapper.joinRoom(roomCode, username);
	};

	createRoom = (roomCode, roomName, username, access_token, refreshToken, playlistId) => {
		this.setState({
			user: { username },
			spotifyWrapper: new SpotifyWrapper(access_token, refreshToken),
		}, () => {
			this.state.spotifyWrapper.createPlaylist(roomName, res => {
				console.log(res);
				this.state.firebaseWrapper.createRoom(
					roomCode,
					roomName,
					username,
					access_token,
					refreshToken,
					res.id
				);
			})
		});
		
	};

	login = () => {
		history.push('/api/login');
	};

	render() {
		return (
			<Router history={history}>
				<Switch>
					{/* Home page */}
					<Route
						exact
						path="/"
						render={props => <Home login={this.login} />}
					/>
					{/* Join page */}
					<Route
						path="/join"
						render={props => <JoinPage onSubmit={this.joinRoom} />}
					/>
					{/* Login route */}
					<Route
						exact
						path="/login/:accessToken/:refreshToken"
						render={({ match }) => (
							<CreatePage
								accessToken={match.params.accessToken}
								refreshToken={match.params.refreshToken}
								onSubmit={this.createRoom}
							/>
						)}
					/>
					{/* Room page */}
					<Route
						path={
							this.state.room
								? `/room/${this.state.room.id}`
								: null
						}
						render={props => (
							<App
								room={this.state.room}
								user={this.state.user}
								firebaseWrapper={this.state.firebaseWrapper}
							/>
						)}
					/>
					{/* Page not found */}
					<Route component={NotFound} />
				</Switch>
			</Router>
		);
	}
}

export default MainRoutes;
