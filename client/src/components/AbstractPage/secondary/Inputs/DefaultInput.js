import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import {Representations, Elements} from '../../../../configurableElements/config';
import {capitalizeFirstLetter} from '../../../../utils';
import {STATUS_EDITING} from '../../../../definitions';
import {getElement as getRepresentation} from '../../../../configurableElements/factories/representations';
import {getElement as getInput} from '../../../../configurableElements/factories/elements';

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
      return getRepresentation(representation, objectHolder[property]);
    }
    return null;
  };

  getInput = () => {
    const {objectSample, objectHolder, updateObject, property, setEditingObjectProperty} = this.props;
    const inputElement = objectSample[property].inputElement;

    let input = getInput(inputElement);

    let value = objectHolder[property];
    let onChangeHandler = updateObject;

    if (input.props.onChangeReturnsValue === true) {
      onChangeHandler = (p, e) => setEditingObjectProperty(p, e.value);
    }

    if (input.props.type === 'file') {
      value = undefined;
      onChangeHandler = (p, e) => setEditingObjectProperty(p, e.target.files[0]);
    }

    return React.cloneElement(getInput(inputElement),
      {value: value, onChange: e => onChangeHandler(property, e)});
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
