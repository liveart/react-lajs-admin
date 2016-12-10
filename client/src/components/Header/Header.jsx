import React from 'react';
import {createDataLoader} from 'react-loopback';
import HeaderV from './HeaderV';

let Header = React.createClass({
  render() {
    return (
        <HeaderV
          name='sample@gmail.com'
        />
    );
  }
});

/*
 Header = createDataLoader(Header, {
 queries: [{
 endpoint: 'users/'
 }]
 });
 */

export default Header;
