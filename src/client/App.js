import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginSuccess } from './actions/loginAction'



class App extends Component {

  constructor(props){
    super(props);
    //this.handleCreateRoomClick = this.handleCreateRoomClick.bind(this);

    this.state = {page: 'home'};

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

  //right before it shows up
  componentWillMount() {
    /*
    //calling spotify (could be in spotify wrapper and have a button on click call it from the wrapper?) login etc
    const hashParams = this.getHashParams()
    if (!hashParams.access_token) {
      window.location.href = '/api/login'
    } else {
      this.props.login(hashParams)
    }
    */
  }

  //right before it 
  componentWillReceiveProps(nextProps) {
    //getting token from spotify?
    /*
    if (nextProps.access_token) {
      console.log(`nextProps: ${nextProps.access_token}`)
    }*/
  }

  handleCreateRoomClick() {
    //const hashParams = this.getHashParams()
    
    //this.setState(this_page, 'login');
    // const hashParams = this.getHashParams();
    // if(!hashParams.access_token){
    //   window.location.href = '/api/login'
    // }else{
    //   this.props.login(hashParams);
    //   this.refresh_token;
    // }
    this.setState = ({ page: 'roomowner'});

    this.props.isOwner = true;
  }

  render() {
    
      
      if(this.state.page === 'home'){
        return (
  
          <HomeView page={this.state.page}/>

        );
      }else{
        return(
            <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to Apollo</h1>
            </header>{
              <p>hello there</p>
            }
            <p className="App-intro">
              { this.props.access_token }
            </p>
            <p>{this.props.isOwner}</p>
          </div>
        );
      }
    
  }


}

class HomeView extends React.Component {

render(){
  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to Apollo</h1>
    </header>
  
    <p className="App-intro">
      { "Create Or Join A Room" }
    </p>
    <button bsStyle="primary" onClick={this.handleClick}>Create Room</button>
    <button bsStyle="primary" >Join Room</button>
  </div>
  );
}
  

}

class RoomView extends React.Component() {
  constructor(props){
    super(props);
    
    const isOwner = props.isOwner;
  }

  render(){
    
  if(isOwner){
    reutrn (
      <p>Is Owner</p>
    )
  }
    return <p>Is Not Owner</p>
  }
  

}

/*class HomeView{

  function homeview(){

    const _home = (<div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to Apollo</h1>
    </header>

    <p className="App-intro">
      { this.props.access_token }
    </p>
    <button bsStyle="primary" onClick={this.handleClick}>Create Room</button>
    <button bsStyle="primary" >Join Room</button>
  </div>)
    return (
      
      _home
    );
  }
}*/


App.propTypes = {
  access_token: PropTypes.string,
  refresh_token: PropTypes.string,
  scope: PropTypes.string,
  expires_in: PropTypes.string,
  token_type: PropTypes.string,
  login: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    access_token: state.login.access_token,
    refresh_token: state.login.refresh_token,
    scope: state.login.scope,
    expires_in: state.login.expires_in,
    token_type: state.login.token_type
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (authParams = null) => { dispatch(loginSuccess(authParams)) },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
