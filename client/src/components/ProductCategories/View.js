import React, {Component} from 'react';
import AbstractPage from '../AbstractPage/index';
import DeleteConfirmation from './secondary/DeleteConfirmation';
import * as ProductsCategoryModel from '../../../../common/models/products-category.json';
const ProductsCategory = ProductsCategoryModel.properties;
import DeleteButton from './secondary/DeleteButton';

export default class ProductCategoriesView extends Component {
  render() {
    return (
      <AbstractPage {...this.props} objectSample={ProductsCategory} sortingSupport={true}
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
