import React, {Component} from 'react';
import {RadioGroup, Radio} from 'react-radio-group';
import {
  ID_PROP,
  DELETE_CATEGORY,
  MOVE_PRODUCTS_TO_OTHER_CATEGORY,
  MOVE_CATEGORY_TO_OTHER_CATEGORY,
  DELETE_PRODUCTS
} from '../../../definitions';

export default class ProductCategoriesDeleteConfirmation extends Component {

  render() {
    return <div className='form-group'>
      <div className='col-md-3'>
      </div>
      <div className='col-md-6'>
        <h1>Choose an action</h1>
        <div className='form-group'>
          <h3>Linked categories</h3>
          <RadioGroup selectedValue={this.props.selectedValue}
                      onChange={e => this.props.handleCategoryActionOption(e)}>
            <div>
              <Radio value={DELETE_CATEGORY}/>&nbsp; Delete all the categories
              linked to this category
            </div>
            <div>
              <Radio value={MOVE_CATEGORY_TO_OTHER_CATEGORY}/>&nbsp; Move all the linked categories to other
              category &nbsp;
              <select
                value={this.props.newProductsCategory}
                onChange={this.props.handleMoveToCategory}>
                <option value={''}>Root category</option>
                {this.props.data.map((cg, key) => (
                  this.props.objectHolder[ID_PROP] !== cg.id ?
                    this.props.objectHolder[ID_PROP] !== cg.graphicsCategoryId ?
                      <option key={key} value={cg.id}>{cg.name}</option> :
                      <option disabled='disabled' key={key} value={cg.id}>{cg.name} </option> : null
                ))}
              </select>
            </div>
          </RadioGroup>
          <h3>Linked products</h3>
          <RadioGroup selectedValue={this.props.selectedSecondaryValue}
                      onChange={e => this.props.handleProductActionOption(e)}>
            <div>
              <Radio value={DELETE_PRODUCTS}/>&nbsp; Delete all the linked products
            </div>
            <div>
              <Radio value={MOVE_PRODUCTS_TO_OTHER_CATEGORY}/>&nbsp; Move products of this category to other
              category &nbsp;
              <select
                value={this.props.newProduct}
                onChange={this.props.handleMoveProductToCategory}>
                <option value=''>Select category</option>
                {this.props.data.map((cg, key) => (
                  this.props.objectHolder[ID_PROP] !== cg.id ?
                    this.props.objectHolder[ID_PROP] === cg.graphicsCategoryId && this.state.selectedValue === DELETE_CATEGORY ?
                      <option disabled='disabled' key={key}>{cg.name}</option> :
                      <option key={key} value={cg.id}>{cg.name} </option> : null
                ))}
              </select>
              {this.props.newProduct === '' && this.props.selectedSecondaryValue === MOVE_PRODUCTS_TO_OTHER_CATEGORY ?
                <div className='text-red'>Please choose category.</div> : null}
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>;
  }
}

