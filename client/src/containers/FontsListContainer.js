import {connect} from 'react-redux';
import {fetchFonts, editFont, deleteFont} from '../actions/fonts';
import {selectRow, enableEditing, disableEditing} from '../actions/table';
import EntityExplorer from '../components/EntityExplorer';

const mapStateToProps = state => {
  const {fontsList, error, loading} = state.fonts;
  const {selectedRowId, editing} = state.table;
  return {
    entitiesList: fontsList,
    error,
    loading,
    selectedRowId,
    editing
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
    disableEditing() {
      dispatch(disableEditing());
    },
    editEntity(newFont) {
      dispatch(editFont(newFont));
    },
    deleteEntity(id) {
      dispatch(deleteFont(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityExplorer);
