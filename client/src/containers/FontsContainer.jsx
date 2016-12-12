import React from 'react';
import {Font} from '../definitions';
import ItemContainer from './ItemContainer';
import {createDataLoader} from 'react-loopback';

let FontsContainer = React.createClass({
  propTypes: {
    items: React.PropTypes.array
  },
  render() {
    return (
      <ItemContainer {...Font} {...this.props}/>
    );
  }
});

FontsContainer = createDataLoader(FontsContainer, {
  queries: [{
    name: 'items',
    endpoint: Font.endpoint
  }]
});

export default FontsContainer;
