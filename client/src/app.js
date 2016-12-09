import React from 'react';
import ReactDOM from 'react-dom';
//import reactjsAdminlte from "adminlte-reactjs";
import HelloWorld from './components/HelloWorld/HelloWorld.jsx';
import {config} from 'react-loopback';

config.set('baseUrl', 'http://localhost:3000/api/');

ReactDOM.render(
  <HelloWorld />, document.getElementById('app')
);
