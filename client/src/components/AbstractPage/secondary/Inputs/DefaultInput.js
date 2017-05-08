import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import find from 'lodash/find';
import {capitalizeFirstLetter} from '../../../../utils';
import {STATUS_EDITING} from '../../../../definitions';
import {getElement} from '../../../../configurableElements/representations';

export default class DefaultInput extends Component {
  static propTypes = {
    objectHolder: PropTypes.object.isRequired,
    property: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    changedInputs: PropTypes.object,
    updateObject: PropTypes.func.isRequired
  };

  getRepresentations = (item, key) => {
    return null;
    return <td>{getElement(this.props.objectSample[key].representation, this.props.objectHolder[key])}</td>;
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
        {
          this.props.changedInputs && this.props.changedInputs.hasOwnProperty(property) ?
            this.props.changedInputs[property].elem :
            <input type='text' className='form-control'
                   value={this.props.objectHolder[property]}
                   onChange={e => this.props.updateObject(property, e)}/>
        }
        {this.props.status === STATUS_EDITING ? this.getRepresentations(item, property) : null}
      </div>
    </div>;
  }
}
