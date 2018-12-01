const firebase = require('./firebase');
// import Firebase from './firebase'
const dotenv = require('dotenv').config(); // Not explicitly used, but must be required
const express = require('express');
const querystring = require('querystring');
const request = require('request');
// const port = process.env.PORT || 8080;
const port = 8080;

// Setting up the server
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
	path: '/ws',
	serveClient: false,
});

const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize?';
const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token?';
const CALLBACK_ENDPOINT = 'http://localhost:8080/api/callback/';
const HOMEPAGE_HASH = 'http://localhost:3000/#';

const base64EncodedAuthString = new Buffer(
	process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
).toString('base64');

// let roomRef = null;
let fb = new firebase();

io.on('connection', socket => {
	console.log('socket connection');
	fb.socket = socket;
	// socket.on('ping', () => {
	// 	socket.emit('pong', 'pong'); // first param is the message 'code', second is the data
	// 	// io.sockets.emit(/* */)          // emit to every client
	// });

	socket.on('firebase-join', (roomCode, username) =>
		fb.joinRoom(roomCode, username)
	);

	socket.on('firebase-create', (roomCode, roomName, username, access_token, refresh_token) =>
		fb.createRoom(roomCode, roomName, username, access_token, refresh_token)
	);

	socket.on('firebase-add-song', (song, username) => fb.addSong(song, username));

    socket.on('firebase-vote', (songKey, currentVotes) => fb.voteOnSong(songKey, currentVotes))

	socket.on('login', () => {
		const url =
			SPOTIFY_AUTH_ENDPOINT +
			querystring.stringify({
				response_type: 'code',
				redirect_uri: CALLBACK_ENDPOINT,
				client_id: process.env.CLIENT_ID,
				scope:
					'user-read-private user-read-playback-state user-modify-playback-state playlist-modify-private',
			});
		request.get(url);
	});
});

app.get('/api/login', (req, res) => {
	if (req.method === 'OPTIONS') {
		res.status(200).send();
	} else {
		const url =
			SPOTIFY_AUTH_ENDPOINT +
			querystring.stringify({
				response_type: 'code',
				redirect_uri: CALLBACK_ENDPOINT,
				client_id: process.env.CLIENT_ID,
				scope:
					'user-read-private user-read-playback-state user-modify-playback-state',
			});
		res.redirect(url);
	}
});

app.get('/api/refresh', (req, res) => {
	const refresh_token = req.query.refresh_token;
	const handler = handleTokenResponse(res);
	const auth_options = {
		url: SPOTIFY_TOKEN_ENDPOINT,
		form: {
			refresh_token: refresh_token,
			redirect_uri: CALLBACK_ENDPOINT,
			grant_type: 'refresh_token',
		},
		headers: {
			Authorization: 'Basic ' + base64EncodedAuthString,
		},
		json: true,
	};

	request.post(auth_options, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			res.redirect(
				`http://localhost:3000/#/login/${body.access_token}/${
					body.refresh_token
				}`
			);
		}
	});
});

app.get('/api/callback/', (req, res) => {
	const auth_code = req.query.code || null;
	const authOptions = {
		url: SPOTIFY_TOKEN_ENDPOINT,
		form: {
			code: auth_code,
			redirect_uri: CALLBACK_ENDPOINT,
			grant_type: 'authorization_code',
		},
		headers: {
			Authorization: 'Basic ' + base64EncodedAuthString,
		},
		json: true,
	};
	console.log(`Callback with options ${authOptions}`);
	request.post(authOptions, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			res.redirect(
				`http://localhost:3000/#/login/${body.access_token}/${
					body.refresh_token
				}`
			);
		}
	});
});

const handleTokenResponse = res => (error, response, body) => {
	if (!error && response.statusCode === 200) {
		res.redirect(HOMEPAGE_HASH + querystring.stringify(body));
		// io.socket.emit('login success', body)
	} else {
		console.log(`Error: ${error} \nStatus Code: ${response.statusCode}`);
	}
};

http.listen(port, () => console.log(`Listening on port ${port}`));
