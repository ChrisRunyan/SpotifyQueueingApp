import React, { Component } from 'react';
import logo from './apollo_icon_white.png';

import RoomView from './RoomView'
import './styles/App.css';

import { Table, Grid, Row, Col, PageHeader } from 'react-bootstrap';

// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { loginSuccess } from './actions/loginAction'
// import { joinRoom, fetchSong, pushSong } from './actions/firebaseAction'

import spotify from './components/spotify-web-api.js';

import Song from './components/Song';
import SongSearch from './components/SongSearch';
// import SongControls from './components/SongControls'
// import SongListItem from './components/SongListItem'
// import { getCurrentPlaybackState } from './actions/spotifyAction';

import io from 'socket.io-client';
import { FirebaseWrapper } from './firebase';
import { Room } from './classes/FirebaseData';
import { Song as SongData } from './classes/SpotifyData';
// const socket = io({ path: '/ws' })


var Spotify = new spotify();

class App extends Component {

  
  state = {
    page: "home",
    page_title: "Good Shit"
  }
  
  constructor(props){
    
    super(props);
    this.handleCreateRoomClick = this.handleCreateRoomClick.bind(this);
  }
  
  getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);

    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams
  }

  componentWillMount() {
    
    //calling spotify (could be in spotify wrapper and have a button on click call it from the wrapper?) login etc
    
    const hashParams = this.getHashParams()
    if (!hashParams.access_token) {
      window.location.href = '/api/login'
      socket.emit('login')
    } else {
      this.props.login(hashParams)
    }
    
    //Spotify.setAccessToken('https://accounts.spotify.com/api/token?');
  }

/*
  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.access_token) {
      this.props.readPlayback({ access_token: nextProps.auth.access_token })
    }
  }*/


  handleCreateRoomClick() {
    
    //Will change the state information which in turn will change what is rendering.. 
    this.setState({
      page: 'sendHelp', page_title: 'Please Send Help'},
      ()=>{console.log('state page_title = ', this.state.page_title)
    });
    
  }

  componentDidMount() {
    console.log("DidMount: Going to emit")
    socket.emit("ping")
    socket.emit('firebase-join', "test_room")
  }

  render() {
    const page = this.state.page;

    var view;

    if(page === 'home'){

      //We should be able to use redux to pass the state information. 
      //However if you uncomment what's commented here as well as the local HomeView class the button clicking will work
      view = <HomeView title = {this.state.page_title} handleClick = { this.handleCreateRoomClick } />
    }
    else{
      view = <RoomView />
    }
    
    return(
      
      <div>
        {view}
        
        <p>More Coming Soon....</p>
      </div>
      
    );
  }
}

//Most likely I think this should be removed and we need to have redux send the state information from here to the HomePage.js and handle the homepage logic there. 
//however the create room button does change the view
class HomeView extends React.Component {
  
  render(props){

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Apollo Queue for Spotify</h1>
        </header>
        <p className="App-intro">
          { this.props.title }
        </p>
        <button onClick={this.props.handleClick }>Create Room</button>
        <button onClick={() => socket.emit("firebase-join", "test_room")} >Join</button>
        { /*<SongListItem>
          <SongControls />
        </SongListItem>*/ }
      </div>
    );
  }

}


App.propTypes = {
  auth: PropTypes.objectOf(PropTypes.string),
  room: PropTypes.objectOf(PropTypes.string),
  songs: PropTypes.objectOf(PropTypes.string),
  login: PropTypes.func,
  joinRoom: PropTypes.func,
  addSong: PropTypes.func,
  readPlayback: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    auth: state.login,
    room: state.firebase.room,
    songs: state.firebase.songs,
    isPlaying: state.spotify.isPlaying,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (authParams = null) => { dispatch(loginSuccess(authParams)) },
    joinRoom: (roomId) => { dispatch(joinRoom(roomId)) },
    getSong: (songId) => { dispatch(fetchSong(songId)) },
    addSong: (roomId, songId) => { dispatch(pushSong(roomId, songId)) },
    readPlayback: tokens => dispatch(getCurrentPlaybackState(tokens)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
/*
// socket.on("firebase-join-success", room => {
//   console.log(`Firebase Join Success!! Room=${JSON.stringify(room)}`)
// })

class App extends Component {
	// state = {
	// 	roomCode: 'HJRA',
	// 	songs: [
	// 		{
	// 			title: 'Chicago',
	// 			artist: 'Sufjan Stevens',
	// 			album: 'Illinois',
	// 			songLength: '6:05',
	// 			votes: 5,
	// 			id: 0,
	// 		},
	// 		{
	// 			title: 'Dean Town',
	// 			artist: 'Vulfpeck',
	// 			album: 'The Beautiful Game',
	// 			songLength: '3:33',
	// 			votes: 3,
	// 			id: 1,
	// 		},
	// 		{
	// 			title: 'What I Got',
	// 			artist: 'Sublime',
	// 			album: 'Sublime',
	// 			songLength: '2:51',
	// 			votes: 0,
	// 			id: 2,
	// 		},
	// 	],
	// };

	componentDidMount() {
		console.log("App mounted")
	}

	debugJoin = () => {
		this.props.firebaseWrapper.joinRoom('abcd', 'default2');
	};

	debugCreate = () => {
		this.props.firebaseWrapper.createRoom(
			'JKLM',
			'Test Create Room',
			'Mitch',
			'fakeToken'
		);
	};

	debugAdd = () => {
		const song = new SongData({
			id: '1jZhF1p0fLaVZHAyfjkumE',
			name: 'Social',
			query: 'https://api.spotify.com/v1/tracks/1jZhF1p0fLaVZHAyfjkumE',
			artist: {
				name: 'Smallpools',
				id: '4iiQabGKtS2RtTKpVkrVTw',
				query:
					'https://api.spotify.com/v1/artists/4iiQabGKtS2RtTKpVkrVTw',
			},
			album: {
				name: 'Social',
				id: '0lOMCvOnoPQ5s8HAPrXlKv',
				query:
					'https://api.spotify.com/v1/albums/0lOMCvOnoPQ5s8HAPrXlKv',
			},
			votes: 0,
			addedBy: 'default',
		});
		this.props.firebaseWrapper.addSong(this.props.room.id, song);
	};

	render() {
		let roomCode = this.props.room.roomCode
		let songs = this.props.room.songs
		console.log(songs);
		return (
			<Grid>
				<PageHeader>
					<Row>
						<Col md={3}>Apollo</Col>
						<Col md={3}>
							{/* <small> Room Code: {this.state.roomCode}</small> */}
							<small> Room Code: {roomCode}</small>
						</Col>
						<Col md={2}>
							<button onClick={this.debugJoin}>Join Room</button>
						</Col>
						<Col md={2}>
							<button onClick={this.debugCreate}>
								Create Room
							</button>
						</Col>
						<Col md={2}>
							<button onClick={this.debugAdd}>Add Song</button>
						</Col>
					</Row>
				</PageHeader>
				<Row>
					<SongSearch />
				</Row>
				<Row>
					<Table striped bordered condensed hover>
						<thead>
							<tr>
								<th>Song</th>
								<th>Artist</th>
								<th>Album</th>
								<th>Length</th>
								<th>Votes</th>
							</tr>
						</thead>
						<tbody>
							{songs.map((song, index) => (
								// console.log(`Song: ${song}`)
								<Song
									title={song.name}
									artist={song.artist.name}
									album={song.album.name}
									songLength={'0'}
									votes={song.votes}
									id={song.id}
									key={song.id}
									index={index}
								/>
							))}
						</tbody>
					</Table>
				</Row>
			</Grid>
		);
	}
}

export default App;
*/
