import React, {Component} from 'react';
import AbstractPage from '../AbstractPage';
import * as FontModel from '../../../../common/models/font.json';
const Font = FontModel.properties;

export default class FontsView extends Component {
  render() {
    return <AbstractPage {...this.props} objectSample={Font} sortingSupport={true}/>;
  }
}
