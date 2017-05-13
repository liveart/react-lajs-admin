import React, {Component} from 'react';
import {Elements} from '../../../configurableElements/config';
import {getElement} from '../../../configurableElements/factories/elements';

export default class Pantones extends Component {
  render() {
    return <div className='panel panel-default'>
      <div className='panel-body'>
        <div className='form-group'>
          <div className='col-md-3'>
            <p>Use for decoration</p>
          </div>
          <div className='col-md-9'>
            {React.cloneElement(getElement(Elements.BINARY_SELECT),
              {
                value: this.props.pantones ? this.props.pantones.useForDecoration : '',
                onChange: v => this.props.updateObjectData('pantones', 'useForDecoration', v.value)
              })}
          </div>
        </div>
        <div className='form-group'>
          <div className='col-md-3'>
            <p>Use for product</p>
          </div>
          <div className='col-md-9'>
            {React.cloneElement(getElement(Elements.BINARY_SELECT),
              {
                value: this.props.pantones ? this.props.pantones.useForProduct : '',
                onChange: v => this.props.updateObjectData('pantones', 'useForProduct', v.value)
              })}
          </div>
        </div>
      </div>
    </div>;
  }
}
