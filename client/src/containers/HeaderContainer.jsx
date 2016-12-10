import React from 'react';
import Header from '../components/Header';

let HeaderContainer = React.createClass({
  render() {
    return (
      <Header
        name='sample@gmail.com'
      />
    );
  }
});

export default HeaderContainer;
