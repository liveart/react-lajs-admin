import {connect} from 'react-redux';

import {
  selectRow, setObjectHolderProperty, enableEditing, enableCreating,
  enableDefaultStatus, setInitialState, enableConfirmDelete
} from '../../actions/table';
import {fetchColorgroups, createColorgroup, editColorgroup, deleteColorgroup} from '../../actions/colorgroups';
import {fetchColors, deleteColor, editColor} from '../../actions/colors';
import Table from '../../components/Colorgroups';

const mapStateToProps = state => {
  const {token} = state.user;
  const {colorgroups, colorgroupsError, colorgroupsLoading, colorgroupsMessage} = state.colorgroups;
  const {colors} = state.colors;
  const errors = colorgroupsError ? [colorgroupsError] : [];
  const loading = colorgroupsLoading;
  const {objectHolder, status} = state.table;

  return {
    title: 'Color Group',
    data: colorgroups,
    secondaryData: colors,
    message: colorgroupsMessage,
    errors,
    loading,
    objectHolder,
    status,
    token
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
    enableEditing(object) {
      dispatch(enableEditing(object));
    },
    enableCreating(object) {
      dispatch(enableCreating(object));
    },
    enableDefaultStatus() {
      dispatch(enableDefaultStatus());
    },
    createEntity(colorgroup, token) {
      dispatch(createColorgroup(colorgroup, token));
    },
    editEntity(id, newColorgroup, token) {
      dispatch(editColorgroup(id, newColorgroup, token));
    },
    deleteEntity(id, token) {
      dispatch(deleteColorgroup(id, token));
    },
    deleteSecondary(id, token) {
      dispatch(deleteColor(id, token));
    },
    editSecondary(id, newColor, token) {
      dispatch(editColor(id, newColor, token));
    },
    restoreTableState(object) {
      dispatch(setInitialState(object));
    },
    enableConfirmDelete() {
      dispatch(enableConfirmDelete());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
