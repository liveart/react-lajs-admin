import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import {Representations, Elements} from '../../../../configurableElements/config';
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
    updateObject: PropTypes.func.isRequired
  };

  getRepresentation = () => {
    const {objectSample, objectHolder, property} = this.props;
    const representation = objectSample[property].representation;

    if (representation && representation !== Representations.TEXT) {
      return getRepresentationElement(representation, objectHolder[property]);
    }
    return null;
  };

  getInput = () => {
    const {objectSample, objectHolder, updateObject, property, setEditingObjectProperty} = this.props;
    if (this.props.nested && typeof this.props.nested[property] === 'object') {
      return this.props.nested[property];
    }

    const currSample = objectSample[property];
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

    if (inputElement === Elements.DATA_SELECT || inputElement === Elements.DATA_MULTISELECT &&
      typeof currSample.secondaryData === 'string') {
      if (typeof currSample.secondaryDataId === 'string') {
        props.valueKey = currSample.secondaryDataId;
      }
      props.options = this.props[currSample.secondaryData];
    }

    return React.cloneElement(input, {...props});
  };

  render() {
    const {item, property} = this.props;
    return <div className='form-group'>
      <div className='col-md-2'>
        <p className={item.required ? 'req' : ''}>
          {item.header ?
            item.header : capitalizeFirstLetter(property)}
          {item.hint ? <small>&nbsp;<i className='fa fa-question'
                                       data-tip={item.hint}/>
          </small> : null}
        </p>
        {item.hint ? <ReactTooltip effect='solid'/> : null}
      </div>
      <div className='col-md-10'>
        {this.getInput()}
        {this.props.status === STATUS_EDITING ? this.getRepresentation() : null}
      </div>
    </div>;
  }
}
