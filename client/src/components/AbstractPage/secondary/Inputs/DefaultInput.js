import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Representations} from '../../../../configurableElements/config';
import InputRow from '../InputRow';
import map from 'lodash/map';
import {capitalizeFirstLetter} from '../../../../utils';
import {STATUS_EDITING} from '../../../../definitions';
import {getElement as getRepresentationElement} from '../../../../configurableElements/factories/representations';
import {getElement as getInputElement} from '../../../../configurableElements/factories/elements';

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
    const {objectSample, objectHolder, updateObject, property, setEditingObjectProperty, item} = this.props;
    if (this.props.nested && typeof this.props.nested[property] === 'object') {
      return this.props.nested[property];
    }

    const currSample = item;
    const inputElement = currSample.inputElement;
    let input = getInputElement(inputElement);
    let value = objectHolder[property];
    let onChangeHandler = updateObject;

    if (typeof input.props.getValue === 'function') {
      onChangeHandler = (p, e) => setEditingObjectProperty(p, input.props.getValue(e));
    }

    if (input.props.type === 'file') {
      value = undefined;
      onChangeHandler = (p, e) => setEditingObjectProperty(p, e.target.files[0]);
    }

    const props = {};
    props.onChange = e => onChangeHandler(property, e);

    if (typeof input.props.valueProp === 'string') {
      props[input.props.valueProp] = value;
    } else {
      props.value = value;
    }

    if (input.props.acceptsOptions && input.props.acceptsOptions === true) {
      if (typeof currSample.secondaryDataId === 'string') {
        props.valueKey = currSample.secondaryDataId;
      }

      if (typeof currSample.secondaryData === 'string') {
        props.options = [...this.props[currSample.secondaryData]];
      }

      if (typeof currSample.selectOptions === 'object') {
        props.options = map(currSample.selectOptions, col => ({id: col, name: col}));
      }
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
                       {this.props.status === STATUS_EDITING ? this.getRepresentation() : null}</div>}/>;
  }
}
