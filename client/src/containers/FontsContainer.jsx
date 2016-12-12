import React from 'react';
import {Font} from '../definitions';
import ItemContainer from './ItemContainer';

let FontsContainer = React.createClass({
  render() {
    return (
      <ItemContainer fields={Font.fields} endpoint={Font.endpoint}/>
    );
  }
});

export default FontsContainer;
