import {connect} from 'react-redux';
import {fetchFonts, createFont, editFont, deleteFont} from '../actions/fonts';
import {selectRow, enableEditing, enableCreating, enableDefaultStatus} from '../actions/table';
import EntityExplorer from '../components/EntityExplorer';

const mapStateToProps = state => {
  const {fontsList, error, loading} = state.fonts;
  const {selectedRowId, status} = state.table;
  return {
    entitiesList: fontsList,
    error,
    loading,
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
    editEntity(id, newFont) {
      dispatch(editFont(id, newFont));
    },
    deleteEntity(id) {
      dispatch(deleteFont(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityExplorer);
