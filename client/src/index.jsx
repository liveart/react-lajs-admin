import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
//import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import LoginForm from './components/LoginForm/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';
import {config} from 'react-loopback';
config.set('baseUrl', 'http://localhost:3000/api/');

const App = ({children}) => (
  <div>
    <Header/>
    <NavBar/>
    <main className="content-wrapper">
      {children}
    </main>
  </div>
);

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="/login" component={LoginForm}/>
      <Route path="/profile" component={Profile}/>
    </Route>
  </Router>
), document.getElementById('widgets-container'));
