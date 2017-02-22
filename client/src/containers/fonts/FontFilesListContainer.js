import {connect} from 'react-redux';
import {fetchFontFiles, createFontFile, uploadFontFile, editFontFile, deleteFontFile} from '../../actions/fontFiles';
import {selectRow, enableEditing, enableCreating, enableDefaultStatus} from '../../actions/table';
import Table from '../../components/fonts/FontFiles';

const mapStateToProps = state => {
  const {fontFiles, errorFontFiles, fontFilesLoading} = state.fontFiles;
  const error = errorFontFiles;
  const loading = fontFilesLoading;
  const {selectedRowId, status} = state.table;
  return {
    title: 'Fonts Files',
    data: fontFiles,
    error,
    loading,
    selectedRowId,
    status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData() {
      dispatch(fetchFontFiles());
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
    createEntity(fontFile) {
      dispatch(createFontFile(fontFile));
    },
    editEntity(id, newFontFile) {
      dispatch(editFontFile(id, newFontFile));
    },
    deleteEntity(id) {
      dispatch(deleteFontFile(id));
    },
    upload(fileWOFF) {
      dispatch(uploadFontFile(fileWOFF));
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
