import {connect} from 'react-redux';
import {
  fetchProductsCategories,
  createProductsCategory,
  deleteProductsCategory,
  editProductsCategory,
  uploadThumbnail,
  deleteThumbnail
} from '../actions/productsCategories';
import {
  selectRow,
  enableEditing,
  enableCreating,
  enableDefaultStatus,
  setObjectHolderProperty,
  setInitialState,
  enableConfirmDelete
} from '../actions/table';
//import {
//  fetchProducts,
//  deleteProduct,
//  editProduct
//} from '../actions/products';
import ProductsCategories from '../components/ProductsCategories';

const mapStateToProps = state => {
  //const {products} = state.products;
  const {token} = state.user;
  const {productsCategories, productsCategoriesError, productsCategoriesLoading} = state.productsCategories;
  const {status, objectHolder} = state.table;
  const errors = productsCategoriesError ? [productsCategoriesError] : [];
  return {
    title: 'Product Category',
    pluralTitle: 'Product Categories',
    data: productsCategories,
    secondaryData: [],
    errors,
    loading: productsCategoriesLoading,
    objectHolder,
    status,
    token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData() {
      dispatch(fetchProductsCategories());
    },
    selectRow(object) {
      dispatch(selectRow(object));
    },
    setEditingObjectProperty(propertyName, value) {
      dispatch(setObjectHolderProperty(propertyName, value));
    },
    enableEditing(object) {
      dispatch(enableEditing(object));
    },
    enableCreating(object) {
      dispatch(enableCreating(object));
    },
    enableDefaultStatus() {
      dispatch(enableDefaultStatus());
    },
    createEntity(productsCategory, token) {
      dispatch(createProductsCategory(productsCategory, token));
    },
    editEntity(id, newProductsCategory, token) {
      dispatch(editProductsCategory(id, newProductsCategory, token));
    },
    uploadThumbnail(thumbnail) {
      dispatch(uploadThumbnail(thumbnail));
    },
    deleteThumbnail(name) {
      dispatch(deleteThumbnail(name));
    },
    deleteEntity(id, token) {
      dispatch(deleteProductsCategory(id, token));
    },
    restoreTableState(object) {
      dispatch(setInitialState(object));
    },
    enableConfirmDelete() {
      dispatch(enableConfirmDelete());
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsCategories);

