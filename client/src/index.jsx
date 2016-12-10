import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
//import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import LoginForm from './components/LoginForm/LoginForm';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import {config} from 'react-loopback';
config.set('baseUrl', 'http://localhost:3000/api/');

const ACTIVE = {color: 'red'};

const App = ({children}) => (
  <div>
    <Header/>
    <ul>
      <li><Link to="/" activeStyle={ACTIVE}>Home</Link></li>
      <li><Link to="/login" activeStyle={ACTIVE}>Login</Link></li>
    </ul>
    <div id="widgets-container">
      {children}
    </div>
  </div>
);

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/login" component={LoginForm}/>
      <Route path="/profile" component={Profile}/>
    </Route>
  </Router>
), document.getElementById('app'));
