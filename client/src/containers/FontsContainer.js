import {connect} from 'react-redux';
import {fetchFonts, createFont, editFont, deleteFont} from '../actions/fonts';
import {uploadFile} from '../actions/files';
import {
  selectRow,
  enableEditing,
  enableCreating,
  enableDefaultStatus,
  setObjectHolderProperty,
  setInitialState
} from '../actions/table';
import Fonts from '../components/Fonts';

const mapStateToProps = state => {
  const {token} = state.user;
  const {fonts, fontsError, fontsLoading, fontsMessage} = state.fonts;
  const {status, objectHolder} = state.table;
  const errors = fontsError ? [fontsError] : [];
  return {
    title: 'Font',
    data: fonts,
    errors,
    message: fontsMessage,
    loading: fontsLoading,
    objectHolder,
    status,
    token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData() {
      dispatch(fetchFonts());
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
    createEntity(color, token) {
      dispatch(createFont(color, token));
    },
    editEntity(id, newColor, token) {
      dispatch(editFont(id, newColor, token));
    },
    uploadFile(file, endpoint) {
      dispatch(uploadFile(file, endpoint));
    },
    deleteEntity(id, token) {
      dispatch(deleteFont(id, token));
    },
    restoreTableState(object) {
      dispatch(setInitialState(object));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fonts);
