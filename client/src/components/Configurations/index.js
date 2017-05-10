import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import {forEach, filter} from 'lodash';
import View from './View';
import {IN_FT, CM_M} from './secondary/helpers.js';

export default class extends Component {
  static propTypes = PTypes;

  redirectWindowOptions = [{value: '(default)', label: 'Default'},
    {value: 'parent', label: 'Parent'},
    {value: 'top', label: 'Top'}];

  componentWillMount() {
    this.props.fetchProducts();
  }

  handleSelectedObjectChange = (propertyName, value) => {
    this.props.setEditingObjectProperty(propertyName, value);
  };


  handleSelectedObjectAddNewArray = (fArr, sArr, key, obj) => {
    let arr = (this.props.objectHolder[fArr]);
    if (typeof (arr[key])[sArr] !== 'object') {
      (arr[key])[sArr] = [];
    }
    ((arr[key])[sArr])[(arr[key])[sArr].length] = [...obj];
    this.props.setEditingObjectProperty(fArr, [...arr]);
  };

  handleSelectedObjectArrayArrayDeleteElement = (fArr, sArr, colorizableKey, key) => {
    const arr = (this.props.objectHolder[fArr]);
    ((arr[colorizableKey])[sArr]).remove(key);
    this.props.setEditingObjectProperty(fArr, [...arr]);
  };

  handleSelectedObjectArrayArrayChange = (fArrName, sArrName, fInd, sInd, propName, event) => {
    const colorizables = this.props.objectHolder[fArrName];
    if (propName === 'image') {
      colorizables[fInd][sArrName][sInd][propName] = event.target.files[0];
    } else if (sArrName === 'editableAreaUnitsRange') {
      colorizables[fInd][sArrName][sInd][propName] = Number(event.target.value);
    } else {
      colorizables[fInd][sArrName][sInd][propName] = event.target.value;
    }
    this.props.setEditingObjectProperty(fArrName, [...colorizables]);
  };

  updateMainConfig = o => {
    const id = o ? o.id : null;
    filter(this.props.data, conf => {
      if (conf.isMain && (!id || conf.id !== id)) {
        this.props.editEntity(conf.id, {...conf, isMain: false});
      } else if (id && conf.id === id && !conf.isMain) {
        this.props.editEntity(conf.id, {...conf, isMain: true});
      }
    });
  };

  onSizeSelectChange = val => {
    const arr = [];
    if (val) {
      forEach(val, v => arr.push(v.name));
      this.props.setEditingObjectProperty('defaultProductSize', arr);
    }
  };

  changeOptionsNestedHolderValue = (changingPropName, value) => {
    const option = this.props.objectHolder['options'];
    option[changingPropName] = value;
    this.props.setEditingObjectProperty('options', option);
  };

  changeOptionsUnitValue = (value) => {
    const option = this.props.objectHolder['options'];
    option['unitConversionMult'] = value;
    if (value === IN_FT) {
      option['unit'] = 'in';
      option['unit2'] = 'ft';
      this.props.setEditingObjectProperty('options', option);
    } else if (value === CM_M) {
      option['unit'] = 'cm';
      option['unit2'] = 'm';
      this.props.setEditingObjectProperty('options', option);
    }
  };

  render() {
    return (
      <View {...this.props} {...this}
      />
    );
  }
}
