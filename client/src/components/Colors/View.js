import React, {Component} from 'react';
import * as ColorModel from '../../../../common/models/color.json';
const Color = ColorModel.properties;
import AbstractPage from '../AbstractPage/index';

export default class ColorsView extends Component {
  render() {
    return (
      <AbstractPage {...this.props} objectSample={Color} sortingSupport={true}/>
    );
  }
}
