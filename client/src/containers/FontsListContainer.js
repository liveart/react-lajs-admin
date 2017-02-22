import {connect} from 'react-redux';
import {fetchFonts, createFont, editFont, deleteFont} from '../actions/fonts';
import {fetchFontFiles, createFontFile, uploadFontFile, editFontFile, deleteFontFile} from '../actions/fontFiles';
import {selectRow, enableEditing, enableCreating, enableDefaultStatus} from '../actions/table';
import EntityExplorer from '../components/EntityExplorer';

const mapStateToProps = state => {
  const {fontsList, error, fontsLoading} = state.fonts;
  const {selectedRowId, status} = state.table;
  return {
    entitiesList: fontsList,
    error,
    loading: fontsLoading,
    selectedRowId,
    status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities() {
      dispatch(fetchFonts());
    },
    selectRow(id) {
      dispatch(selectRow(id));
    },
    enableEditing() {
      dispatch(enableEditing());
    },
    enableCreating() {
      dispatch(enableCreating());
    },
    enableDefaultStatus() {
      dispatch(enableDefaultStatus());
    },
    createEntity(font) {
      dispatch(createFont(font));
    },
    upload(fileWOFF) {
      dispatch(uploadFontFile(fileWOFF));
    },
    editEntity(id, newFont) {
      dispatch(editFont(id, newFont));
    },
    deleteEntity(id) {
      dispatch(deleteFont(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityExplorer);
