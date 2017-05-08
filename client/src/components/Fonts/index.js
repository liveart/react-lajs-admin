import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import {
  STATUS_EDITING,
  STATUS_CREATING
} from '../../definitions';
import View from './View';

export default class extends Component {
  static propTypes = PTypes;

  handleFontUpload = prop => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      this.props.uploadFontFile(this.props.objectHolder[prop]);
    }
  };
  handleVectorUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      this.props.uploadVector(this.props.objectHolder.vector);
    }
  };

  handleFileChoose = (prop, e) => {
    this.props.setEditingObjectProperty(prop, e.target.files[0]);
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };


  render() {
    return <View {...this.props} {...this}
    />;
  }
}
