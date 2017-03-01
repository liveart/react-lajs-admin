import {connect} from 'react-redux';
import {fetchFonts, createFont, editFont, deleteFont, uploadFontFile, uploadVectors} from '../actions/fonts';
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
  const {fonts, fontsError, fontsLoading} = state.fonts;
  const {status, objectHolder} = state.table;
  const errors = fontsError ? [fontsError] : [];
  return {
    title: 'Fonts',
    data: fonts,
    errors,
    loading: fontsLoading,
    objectHolder,
    status
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
    createEntity(color) {
      dispatch(createFont(color));
    },
    editEntity(id, newColor) {
      dispatch(editFont(id, newColor));
    },
    uploadFontFile(fileFont) {
      dispatch(uploadFontFile(fileFont));
    },
    uploadVector(vectorFile) {
      dispatch(uploadVectors(vectorFile));
    },
    deleteEntity(id) {
      dispatch(deleteFont(id));
    },
    restoreTableState(object) {
      dispatch(setInitialState(object));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fonts);
