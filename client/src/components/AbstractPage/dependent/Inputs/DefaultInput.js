import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {capitalizeFirstLetter} from '../../../../utils';
import {STATUS_EDITING} from '../../../../definitions';

export default class DefaultInput extends Component {
  static propTypes = {
    objectHolder: PropTypes.object.isRequired,
    property: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    representations: PropTypes.object,
    changedInputs: PropTypes.object
  };

  render() {
    const {item, property} = this.props;
    return <div className='form-group'>
      <div className='col-md-2'>
        <p className={'' + (item.required ? 'req' : '')}>
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
                   onChange={e => this.updateObject(property, e)}/>
        }
        {
          this.props.status === STATUS_EDITING &&
          this.props.representations && this.props.representations.hasOwnProperty(property) ?
            <div
              style={{marginTop: 3}}>
              {this.props.representations[property].getElem(this.props.objectHolder[property])}
            </div> :
            null
        }
      </div>
    </div>;
  }
}
