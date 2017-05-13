import React, {Component} from 'react';
import keys from 'lodash/keys';
import {capitalizeFirstLetter} from '../../../utils';

export default class CustomOptions extends Component {
  render() {

    return <div className='panel panel-default'>
      <div className='panel-body'>
        {this.props.data ? keys(this.props.data).map(prop =>
          <div key={prop} className='form-group'>
            <div className='col-md-2'>
              <p>{capitalizeFirstLetter(prop)}: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     value={this.props.data[prop]}
                     onChange={e => this.props.handleSelectedObjectDataChange('data', prop, e)}/>
            </div>
            <div className='col-md-1'>
              <a className='btn btn-default' href='#' aria-label='Remove'
                 onClick={() => this.props.removeCustomOption(prop)}>
                <i className='fa fa-times' aria-hidden='true'/>
              </a>
            </div>
          </div>
        ) : null}
      </div>
      <div className='panel-footer'>
        <div className='input-group'>
          <input type='text' className='form-control' ref={r => this.customOptionInput = r}
                 placeholder='New option name'/>
          <span className='input-group-btn'>
            <button type='button' className='btn btn-primary btn-n'
                    onClick={() => this.props.createCustomOption(this.customOptionInput)}>Create
            </button>
          </span>
        </div>
      </div>
    </div>;
  }
}
