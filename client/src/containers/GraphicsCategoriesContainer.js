import {connect} from 'react-redux';
import {
  fetchGraphicsCategories,
  createGraphicsCategory,
  deleteGraphicsCategory,
  editGraphicsCategory
} from '../actions/graphicsCategories';
import {uploadFile} from '../actions/files';
import {
  selectRow,
  enableEditing,
  enableCreating,
  enableDefaultStatus,
  setObjectHolderProperty,
  setInitialState,
  enableConfirmDelete
} from '../actions/table';
import {
  fetchGraphics,
  deleteGraphic,
  editGraphic
} from '../actions/graphics';
import GraphicsCategories from '../components/GraphicCategories';

const mapStateToProps = state => {
  const {graphics} = state.graphics;
  const {token} = state.user;
  const {graphicsCategories, graphicsCategoriesError, graphicsCategoriesLoading, graphicsCategoriesMessage} =
    state.graphicsCategories;
  const {status, objectHolder} = state.table;
  const errors = graphicsCategoriesError ? [graphicsCategoriesError] : [];
  return {
    title: 'Graphic Category',
    pluralTitle: 'Graphic Categories',
    data: graphicsCategories,
    graphicsCategories,
    secondaryData: graphics,
    message: graphicsCategoriesMessage,
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
    deleteEntity(id, token) {
      dispatch(deleteGraphicsCategory(id, token));
    },
    restoreTableState(object) {
      dispatch(setInitialState(object));
    },
    enableConfirmDelete() {
      dispatch(enableConfirmDelete());
    },
    fetchSecondaryData() {
      dispatch(fetchGraphics());
    },
    editSecondaryEntity(id, newGraphic, token) {
      dispatch(editGraphic(id, newGraphic, token));
    },
    deleteSecondaryEntity(id, token) {
      dispatch(deleteGraphic(id, token));
    },
    uploadFile(file, endpoint) {
      dispatch(uploadFile(file, endpoint));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphicsCategories);
