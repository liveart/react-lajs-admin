import {connect} from 'react-redux';
import {fetchFonts, createFont, editFont, deleteFont} from '../actions/fonts';
import {fetchFontFiles, createFontFile, uploadFontFile, editFontFile, deleteFontFile} from '../actions/fontFiles';
import {selectRow, selectSecondaryRow, enableEditing, enableCreating, enableDefaultStatus} from '../actions/table';
import Table from '../components/Fonts';

const mapStateToProps = state => {
  const {fontsList, fontsError, fontsLoading} = state.fonts;
  const {fontFilesList, errorFontFiles, fontFilesLoading} = state.fontFiles;
  const error = fontsError || errorFontFiles;
  const loading = !!(fontsLoading || fontFilesLoading);
  const {selectedRowId, selected2RowId, status} = state.table;
  return {
    title: 'fontsList',
    secondaryData: fontFilesList,
    data: fontsList,
    error,
    loading,
    selectedRowId,
    selected2RowId,
    status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData() {
      dispatch(fetchFonts());
    },
    fetchSecondaryData() {
      dispatch(fetchFontFiles());
    },
    selectRow(id) {
      dispatch(selectRow(id));
    },
    selectSecondaryRow(id) {
      dispatch(selectSecondaryRow(id));
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
    createSecondaryEntity(fontFile) {
      dispatch(createFontFile(fontFile));
    },
    editEntity(id, newFont) {
      dispatch(editFont(id, newFont));
    },
    editSecondaryEntity(id, newFontFile) {
      dispatch(editFontFile(id, newFontFile));
    },
    deleteEntity(id) {
      dispatch(deleteFont(id));
    },
    deleteSecondaryEntity(id) {
      dispatch(deleteFontFile(id));
    },
    upload(fileWOFF) {
      dispatch(uploadFontFile(fileWOFF));
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
