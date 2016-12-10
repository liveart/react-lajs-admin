import React from 'react';
import {createDataLoader} from 'react-loopback';
import NavBarV from './NavBarV';

let NavBar = React.createClass({
  render() {
    return (
        <NavBarV
          name='sample@gmail.com'
        />
    );
  }
});

/*
 NavBar = createDataLoader(NavBar, {
 queries: [{
 endpoint: 'users/'
 }]
 });
 */

export default NavBar;
