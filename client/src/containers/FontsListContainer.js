import {connect} from 'react-redux';
import {fetchFonts} from '../actions/fonts';
import {selectRow, enableEditing} from '../actions/table';
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityExplorer);
