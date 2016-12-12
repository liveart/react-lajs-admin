import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import LoginForm from './components/LoginForm';
import Dashboard from './containers/DashboardContainer';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Main from './containers/Main';
import FontsContainer from './containers/FontsContainer';
import Profile from './components/Profile';
import {config} from 'react-loopback';
config.set('baseUrl', 'http://localhost:3000/api/');

import reducer from './reducers';
const middleware = [thunk];
middleware.push(createLogger()); // for debug


const App = ({children}) => (
  <div>
    <Header/>
    <NavBar/>
    <main className="content-wrapper">
      {children}
    </main>
  </div>
);

//const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(reducer, applyMiddleware(...middleware));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}>
      </Route>
    </Router>
  </Provider>
), document.getElementById('widgets-container'));
