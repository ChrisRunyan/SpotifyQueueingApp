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
2. In the project root, run the command `yarn install`
3. Create `src/server/index.js`.  This will be the entry point for the Node server.
4. Run the command `yarn dev` to start the client and server.  The client will run on port 3000 and the server will run on port 8080.

## Project Structure Overview

There are several important sections of this project, but here we'll briefly discuss the most important ones and see how they contribute to the overall package.

### package.json

This file is an essential part of any JavaScript application.  `package.json` lists meta-info about the project, dependencies, and developer-defined scripts that can be run using `yarn`.  `yarn install` will read `package.json` to determine which npm packages should be installed, and which versions to fetch.  Adding dependencies through this file will help keep track of what is or isn't installed and will also help to initialize a project in a new environment.

### webpack.config.js

Webpack is a tool for bundling JavaScript applications.  In this project, it is used to integrate a Node Express server with a React client.  You can see its usage in the `scripts` section of `package.json`.  `webpack.config.js` is used here to proxy port 3000 and port 

### 

## Redux Overview

Redux is a system of application state management.  It is built on the principle of unidirectional data flow, meaning that state changes can flow down to child classes/components but never up to parent components.  This pairs nicely with React's style of state management, where a parent can pass its state as props to its child components but has no way of monitoring for changes is its children's state (with a few exceptions).