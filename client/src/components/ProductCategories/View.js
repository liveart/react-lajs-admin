import React, {Component} from 'react';
import AbstractPage from '../AbstractPage/index';
import DeleteConfirmation from './secondary/DeleteConfirmation';
import * as ProductsCategoryModel from '../../../../common/models/products-category.json';
const ProductsCategory = ProductsCategoryModel.properties;
import DeleteButton from './secondary/DeleteButton';
import {
  ID_PROP,
  STATUS_EDITING,
  STATUS_CREATING,
  STATUS_CONFIRM_DELETE,
  PRODUCT_CATEGORIES_THUMB_FOLDER,
  DELETE_CATEGORY,
  MOVE_CATEGORY_TO_OTHER_CATEGORY,
  DELETE_PRODUCTS,
  MOVE_PRODUCTS_TO_OTHER_CATEGORY
}  from
  '../../definitions';

export default class ProductCategoriesView extends Component {
  render() {
    return (
      <AbstractPage {...this.props} objectSample={ProductsCategory} sortingSupport={true}
                    representations={{
                      thumbUrl: {
                        getElem: val =>
                          val ? <a href={this.props.getFileUrl(val)} className='thumbnail'
                                   style={{width: 100}}><img
                            src={this.props.getFileUrl(val)} alt='thumb'
                            style={{width: 100}}/></a> :
                            null
                      },
                    }}
                    changedInputs={{
                      thumbUrl: {
                        saveF: () => this.props.handleFileUpload(this.refs.canvas),
                        getName: obj => this.props.getName(obj, PRODUCT_CATEGORIES_THUMB_FOLDER)
                      }
                    }
                    }
                    customInputs={{
                      thumb: {
                        elem: <div>
                          <input type='file' className='form-control' accept='image/*'
                                 onChange={e => this.props.handleFileChoose('thumbUrl', e, this.refs.canvas)}/>

                          {typeof (this.props.objectHolder['thumbUrl']) === 'string' && this.props.status === STATUS_EDITING ?
                            <div style={{float: 'left'}}><a
                              href={this.props.getFileUrl(this.props.objectHolder['thumbUrl'])}
                              className='thumbnail'
                              style={{marginTop: 8, width: 100}}><img
                              style={{width: 100}} src={this.props.getFileUrl(this.props.objectHolder['thumbUrl'])}/>
                            </a>
                            </div>
                            : null}
                          <div style={{float: 'left'}}>
                            {this.props.status === STATUS_CREATING && !this.props.objectHolder['thumbUrl'] ?
                              <canvas style={{marginTop: 8}} ref='canvas' width='100'
                                      height='100' hidden/> :
                              <canvas style={{marginTop: 8}} ref='canvas' width='100'
                                      height='100'/>}
                          </div>
                        </div>,
                        required: true
                      },
                      category: {
                        elem: <select className='form-control'
                                      onChange={e => this.props.handleSelectedObjectChange('productsCategoryId', e)}
                                      value={this.props.objectHolder['productsCategoryId']}>
                          <option key='rootCategory' value={''}>Root category</option>
                          {this.props.data.map(cg => (
                            this.props.objectHolder[ID_PROP] !== cg.id ?
                              (this.props.objectHolder[ID_PROP] !== cg.productsCategoryId) || (cg.productsCategoryId === '') ?
                                <option key={cg.id} value={cg.id}>{cg.name}</option> :
                                <option disabled='disabled' key={cg.id} value={cg.id}>{cg.name} </option> : null
                          ))}
                        </select>
                      }
                    }

                    }
                    deleteConfirmation={true}
                    renderDeleteConfirmationDialog={
                      <DeleteConfirmation data={this.props.data}
                                          objectHolder={this.props.objectHolder}
                                          newProduct={this.props.newProduct}
                                          newProductsCategory={this.props.newProductsCategory}
                                          selectedValue={this.props.selectedValue}
                                          selectedSecondaryValue={this.props.selectedSecondaryValue}
                                          handleMoveToCategory={this.props.handleMoveToCategory}
                                          handleCategoryActionOption={this.props.handleCategoryActionOption}
                                          handleProductActionOption={this.props.handleProductActionOption}
                                          handleMoveProductToCategory={this.props.handleMoveProductToCategory}/>}

                    renderDeleteConfirmationButtons={
                      <DeleteButton newProduct={this.props.newProduct}
                                    selectedValue={this.props.selectedSecondaryValue}
                                    enableDefaultStatus={this.props.enableDefaultStatus}
                                    restoreTableState={this.props.restoreTableState}
                                    handleDeleteBtnClick={this.props.handleDeleteBtnClick}/>}

      />
    );
  }
}

