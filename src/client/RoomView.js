import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';


import * as spotifyapi from './components/spotify-web-api'
import { database } from 'firebase';



var Spotify = new spotifyapi();
//spotifyApi.setPromiseImplementation(Q);
var access_token;
var playlist;
var tracks;
var firstItem;



class RoomView extends Component {

  state = {
    user:'owner'
  }
  

  
  componentWillMount() {
    
    const hashParams = this.getHashParams()
    //Need to deal with loging in?? I have no idea how this will work

    Spotify.setAccessToken(hashParams.access_token);
    access_token = Spotify.getAccessToken();
    
    //playlist = this.myPlaylist();
    
/*
    console.log('test', playlist);

    console.log(playlist.then(playlist.imageURL));*/
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.access_token) {
      this.props.readPlayback({ access_token: nextProps.auth.access_token })
    }
  }
/*
  search(){
     
    
    //console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=Beethoven' + '&type=artist&limit=1';
    var myHeaders = new Headers();

    var myOptions = {
      method: 'GET', 
      headers:{
        'Authorixation':'Bearer ' + access_token
       },
       mode:'cors', 
       cache:'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response =>response.json())
      .then(json => console.log(json))
    
  }
  */

  render() {

        //var access_token = Spotify.setAccessToken('https://accounts.spotify.com/api/token?');
        if(this.state.user === 'guest'){
        return(
            <div className="RoomView">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to Apollo</h1>
            </header>
          
            <p className="App-intro">
              Welcome Guest
            </p>
          </div>
        );
    
        }else{
          return(
            
            <div className="RoomView">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to Apollo</h1>

            </header>
          
            <p className="App-intro">
              Welcome Room Owner
              
            </p>

            <div id="playlist">
                
              <p>{access_token}</p>
              <MyPlaylist/>
              
              
            </div>
            
          </div>
          );
        } 
    }

}


class MyPlaylist extends Component{

  render(){
    return(
      Spotify.getPlaylist('4vHIKV7j4QcZwgzGQcZg1x')
      .then(function(data) {
        console.log('User playlist', data);
        console.log('more specific?', data.tracks.items);
        tracks = data.tracks.items;
        console.log('tracks', tracks);
  
      }, function(err) {
        console.error(err);
  
      }, function(data){
        return( <div className="song-list-item">
              <div className="album-art">
                  <img src={data.tracks.items[0].track.album.images[0].url} alt="Art"></img>
              </div>
              <div className="album-info">
                  <h2>
                      { data.tracks.items[0].track.name } - { data.tracks.items[0].track.album.name }
                  </h2>
                  <h3>{ data.tracks.items[0].track.album.artist[0].name }</h3>
              </div>

          </div>)
      })
    );
  }
  
}


/*
  <img src={playlist} alt="hello" ></img>
  <p>{playlist.id}</p>

  {Spotify.getPlaylist('4vHIKV7j4QcZwgzGQcZg1x')
    .then(function(data) {
      console.log('User playlist', data);
      this.playlist = data;
    }, function(err) {
      console.error(err);
  })}


  Goes with search function 
              
            <form>
              <input type="search" value=""></input>
              <input type="submit" value="Search" onClick={this.search(access_token)}></input>
            </form>



                          <div className="controls">
                  { props.children }
              </div>
*/
export default (RoomView)
