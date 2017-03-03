import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import View from './View';
import * as GraphicModel from '../../../common/models/graphic.json';
const Graphic = GraphicModel.properties;

export default class GraphicsComponent extends Component {
  static propTypes = {
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
    token: PropTypes.string
  };

  render() {

    return (
      <View {...this.props} objectSample={Graphic} sortingSupport={true}/>
    );
  }
}
