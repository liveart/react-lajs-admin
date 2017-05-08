import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  MOVE_GRAPHICS_TO_OTHER_CATEGORY
} from '../../../definitions';
import * as ProductsCategoryModel from '../../../../../common/models/graphics-category.json';
const ProductsCategory = ProductsCategoryModel.properties;

export default class ProductCategoriesDeleteButton extends Component {

  render() {
    return <div>
      <div className='pull-right'>
        {this.props.newProduct === '' && this.props.selectedSecondaryValue === MOVE_GRAPHICS_TO_OTHER_CATEGORY ?
          <button disabled type='button' className='btn btn-danger'
                  onClick={() => this.props.handleDeleteBtnClick(true)}>Delete
          </button> :
          <button type='button' className='btn btn-danger'
                  onClick={() => this.props.handleDeleteBtnClick(true)}>Delete
          </button>}
        <button type='button' className='btn btn-default'
                onClick={() => {
                  this.props.enableDefaultStatus();
                  this.props.restoreTableState(ProductsCategory);
                }}>Cancel
        </button>
      </div>
    </div>;
  }
}

