import {connect} from 'react-redux';
import {fetchProducts, createProduct, editProduct, deleteProduct} from '../actions/products';
import {fetchProductsCategories, createProductsCategory} from '../actions/productsCategories';
import {uploadFile} from '../actions/files';
import {
  selectRow, setObjectHolderProperty,
  enableEditing, enableCreating, enableDefaultStatus, setInitialState
} from '../actions/table';
import Products from '../components/Products';
import {fetchColors} from '../actions/colors';
import {fetchColorgroups} from '../actions/colorgroups';
import {enableImportJson} from '../actions/table';

const mapStateToProps = state => {
  const {token} = state.user;
  const {colors, colorsLoading} = state.colors;
  const {colorgroups, colorgroupsLoading} = state.colorgroups;
  const {products, productsError, productsLoading, productsMessage} = state.products;
  const {productsCategories, productsCategoriesLoading} = state.productsCategories;
  const {objectHolder, status} = state.table;
  const errors = productsError ? [productsError] : [];

  return {
    title: 'Product',
    data: products,
    colors,
    colorgroups,
    colorsLoading,
    colorgroupsLoading,
    message: productsMessage,
    errors,
    loading: productsLoading || productsCategoriesLoading,
    objectHolder,
    status,
    productsCategories,
    token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData() {
      dispatch(fetchProducts());
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
    createEntity(product, token) {
      dispatch(createProduct(product, token));
    },
    editEntity(id, newProduct, token) {
      dispatch(editProduct(id, newProduct, token));
    },
    deleteEntity(id, token) {
      dispatch(deleteProduct(id, token));
    },
    restoreTableState(object) {
      dispatch(setInitialState(object));
    },
    fetchProductsCategories() {
      dispatch(fetchProductsCategories());
    },
    fetchColors() {
      dispatch(fetchColors());
    },
    fetchColorgroups() {
      dispatch(fetchColorgroups());
    },
    enableImportJson() {
      dispatch(enableImportJson());
    },
    createProductsCategory(cat, token) {
      dispatch(createProductsCategory(cat, token));
    },
    uploadFile(file, endpoint) {
      dispatch(uploadFile(file, endpoint));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
