import {connect} from 'react-redux';
import * as colorActions from '../actions/colors';
import {selectRow, enableEditing, enableCreating, enableDefaultStatus} from '../actions/table';
import EntityExplorer from '../components/ColorsExplorer';

const mapStateToProps = state => {
  const {colors, colorsError, colorsLoading} = state.colors;
  const {selectedRowId, status} = state.table;
  return {
    colors: colors,
    error: colorsError,
    loading: colorsLoading,
    selectedRowId,
    status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities() {
      dispatch(colorActions.fetchColors());
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
    createEntity(color) {
      dispatch(colorActions.createColor(color));
    },
    editEntity(id, newColor) {
      dispatch(colorActions.editColor(id, newColor));
    },
    deleteEntity(id) {
      dispatch(colorActions.editColor(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityExplorer);
