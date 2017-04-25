import {connect} from 'react-redux';
import {
  fetchConfigurations, createConfiguration, editConfiguration, deleteConfiguration
} from '../actions/configurations';
import {fetchProducts} from '../actions/products';
import {
  selectRow, setObjectHolderProperty, enableEditing, enableCreating, enableDefaultStatus, setInitialState
} from '../actions/table';
import Configurations from '../components/Configurations';

const mapStateToProps = state => {
  const {token} = state.user;
  const {configurations, configurationsError, configurationsLoading, configurationsMessage} = state.configurations;
  const {objectHolder, status} = state.table;
  const {products} = state.products;
  const errors = configurationsError ? [configurationsError] : [];
  return {
    title: 'Configuration',
    data: configurations,
    products,
    errors,
    loading: configurationsLoading,
    message: configurationsMessage,
    objectHolder,
    status,
    token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData() {
      dispatch(fetchConfigurations());
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
    createEntity(config, token) {
      dispatch(createConfiguration(config, token));
    },
    editEntity(id, newConfig, token) {
      dispatch(editConfiguration(id, newConfig, token));
    },
    deleteEntity(id, token) {
      dispatch(deleteConfiguration(id, token));
    },
    restoreTableState(object) {
      dispatch(setInitialState(object));
    },
    fetchProducts() {
      dispatch(fetchProducts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Configurations);
