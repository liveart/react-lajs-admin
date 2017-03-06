import {connect} from 'react-redux';
import {fetchGraphicsCategories, createGraphicsCategory, deleteGraphicsCategory, editGraphicsCategory, uploadThumbnail} from '../actions/graphicsCategories';
import {
  selectRow,
  enableEditing,
  enableCreating,
  enableDefaultStatus,
  setObjectHolderProperty,
  setInitialState
} from '../actions/table';
import GraphicsCategories from '../components/GraphicsCategories';

const mapStateToProps = state => {
  const {token} = state.user;
  const {graphicsCategories, graphicsCategoriesError, graphicsCategoriesLoading} = state.graphicsCategories;
  const {status, objectHolder} = state.table;
  const errors = graphicsCategoriesError ? [graphicsCategoriesError] : [];
  return {
    title: 'Graphics Categories',
    data: graphicsCategories,
    errors,
    loading: graphicsCategoriesLoading,
    objectHolder,
    status,
    token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData() {
      dispatch(fetchGraphicsCategories());
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
    createEntity(graphicsCategory, token) {
      dispatch(createGraphicsCategory(graphicsCategory, token));
    },
    editEntity(id, newGraphicsCategory, token) {
      dispatch(editGraphicsCategory(id, newGraphicsCategory, token));
    },
    uploadThumbnail(thumbnail) {
      dispatch(uploadThumbnail(thumbnail));
    },
    deleteEntity(id, token) {
      dispatch(deleteGraphicsCategory(id, token));
    },
    restoreTableState(object) {
      dispatch(setInitialState(object));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphicsCategories);
