import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  STATUS_EDITING,
  STATUS_CREATING,
  RELATIVE_URL
} from '../definitions';
import * as ConfigModel from '../../../common/models/configuration.json';
const Configuration = ConfigModel.properties;
import View from './View/View';

export default class extends Component {
  static propTypes = {
    message: PropTypes.string,
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    objectHolder: PropTypes.object,
    status: PropTypes.string.isRequired,
    selectRow: PropTypes.func.isRequired,
    enableEditing: PropTypes.func.isRequired,
    enableCreating: PropTypes.func.isRequired,
    enableDefaultStatus: PropTypes.func.isRequired,
    createEntity: PropTypes.func.isRequired,
    editEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    setEditingObjectProperty: PropTypes.func.isRequired,
    restoreTableState: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  render() {
    return (
      <View {...this.props} objectSample={Configuration} sortingSupport={true}
            hiddenProperties={['id']}
            hiddenInputs={['id']}
      />
    );
  }

}
