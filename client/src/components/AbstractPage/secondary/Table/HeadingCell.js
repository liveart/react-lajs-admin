import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {capitalizeFirstLetter} from '../../../../utils';

export default class HeadingCell extends Component {
  static propTypes = {
    property: PropTypes.string.isRequired,
    objectSample: PropTypes.object.isRequired
  };

  render() {
    const {property} = this.props;

    if (this.props.objectSample[property].showInTable === false) {
      return null;
    }

    return <th key={property}>{this.props.objectSample[property].header ?
      this.props.objectSample[property].header : capitalizeFirstLetter(property)}</th>;
  }
}
