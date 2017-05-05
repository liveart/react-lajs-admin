import React, {Component} from 'react';
import {STATUS_DEFAULT} from '../../../../definitions';
import TableView from './TableView';

export default class Table extends Component {
  updateObject = (propertyName, ev) => this.props.setEditingObjectProperty(propertyName, ev.target.value);

  handleEdit = object => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableEditing(this.props.objectSample);
      this.props.selectRow(object);
    }
  };

  render() {
    return <TableView {...this.props} handleEdit={this.handleEdit} updateObject={this.updateObject}/>;
  }
}
