import React, {Component} from 'react';
import Select, {Creatable} from 'react-select';
import {getSelectedSizeOptions} from './helpers.js';

export default class Defaults extends Component {

  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Text: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     value={this.props.defaultNameObjectText}
                     onChange={e => this.props.handleSelectedObjectChange('defaultNameObjectText', e.target.value)}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Number: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     value={this.props.defaultNumberObjectText}
                     onChange={e => this.props.handleSelectedObjectChange('defaultNumberObjectText', e.target.value)}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Product: </p>
            </div>
            <div className='col-md-9'>
              <Select
                value={this.props.defaultProductId}
                options={this.props.products}
                className='onTop'
                placeholder='No default product selected...'
                labelKey='name'
                valueKey='id'
                onChange={o => o ? this.props.handleSelectedObjectChange('defaultProductId', o.id) :
                  this.props.handleSelectedObjectChange('defaultProductId', '')}
              />
            </div>
          </div>
          {this.props.defaultProductId &&
          this.props.defaultProductId.length ?
            <div className='form-group'>
              <div className='col-md-3'>
                <p>Product size: </p>
              </div>
              <div className='col-md-9'>
                <Creatable
                  arrowRenderer={function () {
                    return <span>+</span>;
                  }}
                  name='sizes'
                  value={getSelectedSizeOptions(this.props.defaultProductSize)}
                  multi={true}
                  isOptionUnique={() => true}
                  labelKey='name'
                  placeholder='Type to add new size...'
                  noResultsText=''
                  onChange={this.props.onSizeSelectChange}
                />
              </div>
            </div> : null}
        </div>
      </div>
    );
  }
}
