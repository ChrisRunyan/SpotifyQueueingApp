# Apollo Queueing App for Spotify

Apollo is a web application that allows users to set up shared rooms to queue music together, as long as the host has a Spotify account.  Members of the room can add songs to the queue, vote on which songs to play next, or even vote to skip songs.

## Apollo Team

* Rob Putyra
* Christopher Runyan
* Jonathan Daniel
* Bronwyn Herndon
* Mitchell Russell

## Running this app

1. Clone the repository
2. Install `npm`, `yarn`, and `create-react-app`
2. In the project root, run the command `yarn install`
3. Create `src/server/index.js`.  This will be the entry point for the Node server.
4. Run the command `yarn dev` to start the client and server.  The client will run on port 3000 and the server will run on port 8080.

The following sections will go over the fundamentals of this project.  For more in-depth (and not secondhand) information, check out the [links](#helpful-links) section.

## Project Structure Overview

There are several important sections of this project, but here we'll briefly discuss the most important ones and see how they contribute to the overall package.

### package.json

This file is an essential part of any JavaScript application.  `package.json` lists meta-info about the project, dependencies, and developer-defined scripts that can be run using `yarn`.  `yarn install` will read `package.json` to determine which npm packages should be installed, and which versions to fetch.  Adding dependencies through this file will help keep track of what is or isn't installed and will also help to initialize a project in a new environment.

### webpack.config.js

Webpack is a tool for bundling JavaScript applications.  In this project, it is used to integrate a Node Express server with a React client.  You can see its usage in the `scripts` section of `package.json`.  `webpack.config.js` is used here to proxy port 3000 and port 

### 

## Redux Overview

Redux is a system of application state management.  It is built on the principle of unidirectional data flow, meaning that state changes can flow down to child classes/components but never up to parent components.  This pairs nicely with React's style of state management, where a parent can pass its state as props to its child components but has no way of monitoring for changes is its children's state (with a few exceptions).

### Actions

Actions are JSON objects that have one mandatory parameter: `type`.  Action Creators are functions that create actions.  Actions are dispatched to Redux with the `dispatch` method, and Redux will pass the action to the appropriate reducer based on the `type` of the action.

### Reducers

Reducers update the state of the store by recieving an action and then creating a new state.

---
[`loginAction.js`](/src/client/actions/loginAction.js)
```javascript
export const action => {                    // export the reducer function
    switch (action.type) {                  // check the type attr. of the action
        case LOGIN_FAILED:                  
            return {                        // return a new state
                ...state,                   // copy the original state
                loginError: action.error    // update/add a value
            }
    }
}

```
---

#### reducers/index.js

It's important to have a plan for scaling the app, since the number of reducers in use will increase quickly as components and functionality are added.  Redux provides an easy way to do so with the `combineReducers` function.  `combineReducers` does exactly what it sounds like - it combines all of your reducers into one "reducer" object that can be exported.  Here's a simple usage of `combineReducers` from this app:

---
[`index.js`](src/client/reducers/index.js)
```javascript
import { combineReducers } from 'redux'
import login from './loginReducer'

export default combineReducers({
    login
})
```
---

When you want to add a reducer to the app, simply import it here and then add the import to the body of the `combineReducers` function.  By putting `combineReducers` into [`index.js`](/src/client/reducers/index.js) they can be imported automatically as shown below:

```javascript
import reducers from '../reducers'
```


### Middleware

**Fizzbuzz**

### Store

The store is the heart of Redux.  The store represents the application-wide state, and will be the Single Source of Truth for almost all of your components.  Now that we have our reducers and our middleware defined, creating a store is rather simple:

---
[`store.js`](/src/client/store.js)

```javascript
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'           // get all of our reducers from /reducers/index.js

const initialState = {}                     // initial state can be anything we want
const middleware = [thunk]                  // create a list of middleware that we want to use

export const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)          // applyMiddleware() tells Redux how to integrate each middleware
)
```
---
The createStore() method provided by Redux is simple to use and doesn't have many surprises.  The first parameter it takes is all of our reducers.  This object could be created in `store.js` if desired, but here we're importing all of our reducers from `reducers/index.js` for maintainability/to allow for scaling in the future.

One the store is created, it's time to link it with our components.  React-Redux defines a `Provider` component that links the store to all of its child components.  Because data-flow in Redux (and React) is unidirectional, and because we want **all** of our components to have access to the store, the most sensible place to put the  `Provider` is in `client/index.js`.

---
[`index.js`](src/client/index.js)
```javascript
import { Provider } from 'react-redux'
import store from 'store'
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
```
---

As you can see, `Provider` is very simple to use.  We import the store that we just created, and then pass that to `Provider` as a prop.  Then, by adding `App` as a child to `Provider`, all of our components in the application will have access to the store.  In the next section we'll see how we can connect a component to the store.

### Connect

Once the Redux store is created, you need a way to tell your components how to interact with it.  React-Redux provides the `connect` method to do so automatically.  `connect` is commonly used as shown below:

---
[`App.js`](src/client/App.js)
```javascript
/* Export this instead of the standard `export default App` */
export default connect(mapStateToProps, mapDispatchToProps)(App)
```
---

`connect` requires two functions or objects to describe how to link your component to the store - [`mapStateToProps`](#mapstatetoprops) and [`mapDispatchToProps`](#mapdispatchtoprops).  These are simple functions, however it may not be immediately obvious how to use them.  More detail about them is available below.

#### mapStateToProps

A `mapStateToProps` function links the `props` of a React component to the Redux store.

---
[`App.js`](src/client/App.js)
```javascript
const mapStateToProps = state => {
  return {
    access_token: state.login.access_token,
    refresh_token: state.login.refresh_token,
    scope: state.login.scope,
    expires_in: state.login.expires_in,
    token_type: state.login.token_type
  }
}
```
---
Each key in the return object is the name of a prop for the component.  The value given is a value of the Redux state.  These values are determined by your actions and reducers.  For example, `state.login` is derived from [`combineReducers`](src/client/reducers/index.js), and `state.login.access_token` is derived from the [`loginSuccess`](src/client/actions/loginAction.js) action creator.

#### mapDispatchToProps


## Helpful Links