import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {capitalizeFirstLetter} from '../../../../utils';
import {STATUS_EDITING} from '../../../../definitions';

export default class CustomInput extends Component {
  static propTypes = {
    property: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    changedInputs: PropTypes.object
  };

  render() {
    const {item, property} = this.props;
    return <div key={property} className='form-group'>
      <div className='col-md-2'>
        <p className={'' + (item.required ? 'req' : '')}>
          {this.props.changedLabels && this.props.changedLabels[property] ?
            this.props.changedLabels[property] : capitalizeFirstLetter(property)}
        </p>
      </div>
      <div className='col-md-10'>
        {item.elem}
      </div>
    </div>;
  }
}
