import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import {
  STATUS_CONFIRM_DELETE,
  DELETE_CATEGORY,
  MOVE_CATEGORY_TO_OTHER_CATEGORY,
  DELETE_PRODUCTS,
  MOVE_PRODUCTS_TO_OTHER_CATEGORY
} from '../../definitions';
import * as ProductsCategoryModel from '../../../../common/models/products-category.json';
const ProductsCategory = ProductsCategoryModel.properties;
import View from './View';
import filter from 'lodash/filter';
import {getFileUrl, getName} from '../../utils';

export default class extends Component {
  static propTypes = PTypes;

  constructor(props) {
    super(props);
    this.state = {
      deleting: false,
      selectedValue: DELETE_CATEGORY,
      newProductsCategory: '',
      selectedSecondaryValue: DELETE_PRODUCTS,
      newProduct: ''
    };
  }

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  deleteRelatedCats = (catId, cats, productsAction) => {
    this.props.deleteEntity(catId, this.props.token);
    if (productsAction !== MOVE_PRODUCTS_TO_OTHER_CATEGORY || catId !== this.props.objectHolder.id) {
      this.props.secondaryData.forEach(g => {
        if (g.categoryId === catId) {
          this.props.deleteSecondaryEntity(g.id, this.props.token);
        }
      });
    }
    cats = filter(cats, cat => cat.id !== catId);
    cats.forEach(cat => {
      if (cat.productsCategoryId === catId) {
        this.deleteRelatedCats(cat.id, cats, productsAction);
      }
    });
  };

  handleDeleteBtnClick = confirmed => {
    if (this.props.status === STATUS_CONFIRM_DELETE && confirmed) {
      if (this.state.selectedValue === DELETE_CATEGORY) {
        const cats = [...this.props.data];
        this.deleteRelatedCats(this.props.objectHolder.id, cats, this.state.selectedSecondaryValue);
      } else {
        if (this.state.selectedValue === MOVE_CATEGORY_TO_OTHER_CATEGORY) {
          this.props.data.forEach(c => {
            if (c.productsCategoryId === this.props.objectHolder.id) {
              this.props.editEntity(c.id, {...c, productsCategoryId: this.state.newProductsCategory}, this.props.token);
            }
          });
          this.props.deleteEntity(this.props.objectHolder.id, this.props.token);
        }
      }
      if (this.state.selectedSecondaryValue === MOVE_PRODUCTS_TO_OTHER_CATEGORY) {
        this.props.secondaryData.forEach(c => {
          if (c.categoryId === this.props.objectHolder.id) {
            this.props.editSecondaryEntity(c.id, {...c, categoryId: this.state.newProduct}, this.props.token);
          }
        });
      }
      this.props.enableDefaultStatus();
      this.props.restoreTableState(ProductsCategory);

    }
  };

  handleCategoryActionOption = option => {
    if (option === DELETE_CATEGORY) {
      this.setState({...this.state, selectedValue: option, newProduct: ''});
    } else if (option === MOVE_CATEGORY_TO_OTHER_CATEGORY) {
      this.setState({...this.state, selectedValue: option});
    }

  };

  handleMoveToCategory = e => {
    this.setState({...this.state, newProductsCategory: e.target.value});

  };

  handleProductActionOption = option => {
    this.setState({...this.state, selectedSecondaryValue: option});

  };

  handleMoveProductToCategory = e => {
    this.setState({...this.state, newProduct: e.target.value});
  };

  render() {
    return (
      <View {...this.props} {...this}
            newProduct={this.state.newProduct}
            newProductsCategory={this.state.newProductsCategory}
            selectedValue={this.state.selectedValue}
            selectedSecondaryValue={this.state.selectedSecondaryValue}
            imgUrl={this.state.imgUrl}
            getFileUrl={getFileUrl}
            getName={getName}
      />
    );
  }


}

