import {connect} from 'react-redux';

import {
  selectRow, setObjectHolderProperty, enableEditing, enableCreating,
  enableDefaultStatus, setInitialState
} from '../../actions/table';
import {fetchColorgroups, createColorgroup, editColorgroup, deleteColorgroup} from '../../actions/colorgroups';
import {fetchColors} from '../../actions/colors';
import Table from '../../components/colors/Colorgroups';

const mapStateToProps = state => {
  const {colorgroups, colorgroupsError, colorgroupsLoading} = state.colorgroups;
  const {colors} = state.colors;
  const error = colorgroupsError;
  const loading = colorgroupsLoading;
  const {objectHolder, status} = state.table;

  return {
    title: 'Color Groups',
    data: colorgroups,
    secondaryData: colors,
    error,
    loading,
    objectHolder,
    status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData() {
      dispatch(fetchColorgroups());
    },
    fetchSecondaryData() {
      dispatch(fetchColors());
    },
    selectRow(object) {
      dispatch(selectRow(object));
    },
    setEditingObjectProperty(propertyName, value) {
      dispatch(setObjectHolderProperty(propertyName, value));
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
    createEntity(colorgroup) {
      dispatch(createColorgroup(colorgroup));
    },
    editEntity(id, newColorgroup) {
      dispatch(editColorgroup(id, newColorgroup));
    },
    deleteEntity(id) {
      dispatch(deleteColorgroup(id));
    },
    restoreTableState() {
      dispatch(setInitialState());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
