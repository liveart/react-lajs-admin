import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import View from './View';

export default class extends Component {
  static propTypes = PTypes;

  handleFileChoose = (prop, e) => {
    this.props.setEditingObjectProperty(prop, e.target.files[0]);
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  render() {
    return <View {...this.props}
                 handleFileChoose={this.handleFileChoose}
                 handleSelectedObjectChange={this.handleSelectedObjectChange}
    />;
  }
}
