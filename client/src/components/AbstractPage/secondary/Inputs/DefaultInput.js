import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Representations} from '../../../../configurableElements/config';
import InputRow from '../InputRow';
import map from 'lodash/map';
import {capitalizeFirstLetter} from '../../../../utils';
import {STATUS_EDITING} from '../../../../definitions';
import {getElement as getRepresentationElement} from '../../../../configurableElements/factories/representations';
import {getElement as getInputElement} from '../../../../configurableElements/factories/elements';
import {Elements} from '../../../../configurableElements/config';

export default class DefaultInput extends Component {
  static propTypes = {
    objectHolder: PropTypes.object.isRequired,
    property: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    changedInputs: PropTypes.object,
    updateObject: PropTypes.func.isRequired,
    shouldGroupRender: PropTypes.bool
  };

  getRepresentation = () => {
    const {objectSample, objectHolder, property} = this.props;
    const {representation, hideInputRepresentation} = objectSample[property];

    if (representation && representation !== Representations.TEXT &&
      (typeof hideInputRepresentation === 'boolean' ? !hideInputRepresentation : true)) {
      return getRepresentationElement(representation, objectHolder[property]);
    }
    return null;
  };

  getInput = () => {
    const {nested, objectHolder, updateObject, property, setEditingObjectProperty, item} = this.props;
    if (nested && typeof nested[property] === 'object') {
      return nested[property];
    }

    const currSample = item;
    const inputElement = currSample.inputElement;
    let input = getInputElement(inputElement);
    let value = objectHolder[property];
    let onChangeHandler = updateObject;

    let props = {};

    if (typeof input.props.valueProp === 'string') {
      props[input.props.valueProp] = value;
    } else {
      props.value = value;
    }

    if (typeof input.props.getValue === 'function') {
      if (Array.isArray(currSample.type) && currSample.type.length) {
        if (typeof currSample.type[0] === 'object') {
          onChangeHandler = (p, e) => setEditingObjectProperty(p, input.props.getValue(e));
          props.valueKey = 'value';
          props.labelKey = 'name';
        } else {
          props.value = value ? value.map(v => ({value: v, label: v})) : [];
          onChangeHandler = (p, e) => setEditingObjectProperty(p, input.props.getValue(e).map(v => v.label));
        }
      } else {
        onChangeHandler = (p, e) => setEditingObjectProperty(p, input.props.getValue(e));
      }
    }

    if (typeof props.onChange !== 'function') {
      props.onChange = e => onChangeHandler(property, e);
    }

    if (input.props.acceptsOptions && input.props.acceptsOptions === true) {
      if (typeof currSample.secondaryDataId === 'string') {
        props.valueKey = currSample.secondaryDataId;
      }

      if (typeof currSample.secondaryData === 'string') {
        props.options = [...this.props[currSample.secondaryData]];
      }

      if (typeof currSample.selectOptions === 'object') {
        props.options = map(currSample.selectOptions, col => ({value: col, label: col}));
      }
    }

    if (input.type.options && input.type.options.acceptsProps === true) {
      props = {...props, ...this.props, property};
    }

    if (input.props.type === 'file') {
      delete props.value;
      onChangeHandler = (p, e) => setEditingObjectProperty(p, e.target.files[0]);
    }

    return React.cloneElement(input, {...props});
  };

  render() {
    const {item, property, shouldGroupRender} = this.props;
    if (!shouldGroupRender && typeof item.viewGroup === 'string') {
      return null;
    }

    return <InputRow required={item.required}
                     title={item.header ? item.header : capitalizeFirstLetter(property)}
                     element={<div> {this.getInput()}
                       {this.props.status === STATUS_EDITING ? this.getRepresentation() : null}</div>}
                     titleCol={this.props.titleCol}
                     elementCol={this.props.elementCol}/>;
  }
}
