import {connect} from 'react-redux';
import {fetchFonts} from '../actions/fonts';
import {selectRow} from '../actions/table';
import EntityExplorer from '../components/EntityExplorer';

const mapStateToProps = state => {
  const {fontsList, error, loading} = state.fonts;
  const selectedRowId = state.table.selectedRowId;
  return {
    entitiesList: fontsList,
    error,
    loading,
    selectedRowId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities() {
      dispatch(fetchFonts());
    },
    selectRow(id) {
      dispatch(selectRow(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityExplorer);
