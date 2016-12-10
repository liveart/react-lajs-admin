import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
//import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import LoginForm from './components/LoginForm';
import Dashboard from './containers/DashboardContainer';
import Header from './containers/HeaderContainer';
import NavBar from './containers/NavBarContainer';
import FontsContainer from './containers/FontsContainer';
import Profile from './components/Profile';
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
      <Route path="/fonts" component={FontsContainer}/>
    </Route>
  </Router>
), document.getElementById('widgets-container'));
