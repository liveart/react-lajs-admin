import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import * as ColorModel from '../../../../common/models/color.json';
const Color = ColorModel.properties;
import View from './View';

export default class ColorsComponent extends Component {
  static propTypes = PTypes;

  componentWillMount() {
    this.props.restoreTableState(Color);
    this.props.fetchData();
    this.props.fetchSecondaryData();
  }

  handleColorgroupChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  handleColorChange = color => {
    this.props.setEditingObjectProperty('value', color.hex);
  };

  render() {
    return (
      <View {...this.props}
            handleColorgroupChange={this.handleColorgroupChange}
            handleColorChange={this.handleColorChange}/>
    );
  }
}
