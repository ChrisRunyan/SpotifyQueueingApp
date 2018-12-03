import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import MainRoutes from './routes'
// import MainRoutes from './routes'
// import { Provider } from 'react-redux'
// import store from './store'

ReactDOM.render(
    <MainRoutes />
    ,
document.getElementById('root')
);

// ReactDOM.render(
//         <App />,
//     document.getElementById('root')
// );
registerServiceWorker();
