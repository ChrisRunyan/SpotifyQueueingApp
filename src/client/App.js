import React, { Component } from 'react';
import logo from './apollo_icon_white.png';
import './App.css';

//import PropTypes from 'prop-types'
//import { connect } from 'react-redux'
//import { loginSuccess } from './actions/loginAction'
import RoomView from './RoomView'
//import HomeView from './HomePage'


class App extends Component {

  state = {
    page: "home",
    page_title: "Good Shit"
  }
  
  constructor(props){
    
    super(props);
    this.handleCreateRoomClick = this.handleCreateRoomClick.bind(this);
  }
  /*
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
    } else {
      this.props.login(hashParams)
    }
    
  }

  componentWillReceiveProps(nextProps) {
    //getting token from spotify?
    
    if (nextProps.access_token) {
      console.log(`nextProps: ${nextProps.access_token}`)
    }
  }
  */

  handleCreateRoomClick() {
    
    //Will change the state information which in turn will change what is rendering.. 
    this.setState({      
      page: 'sendHelp', page_title: 'Please Send Help'},
      ()=>{console.log('state page_title = ', this.state.page_title)
    });
    
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
        <h1 className="App-title">Welcome to Apollo</h1>
      </header>
    
      <p className="App-intro">
        { this.props.title }
      </p>
      <button onClick={this.props.handleClick }>Create Room</button>
      <button >Join Room</button>
    </div>
    );
  }

}

/*

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
*/
export default /*connect(mapStateToProps, mapDispatchToProps)*/(App)
