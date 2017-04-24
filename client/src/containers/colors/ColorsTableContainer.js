import {connect} from 'react-redux';
import {fetchColors, createColor, editColor, deleteColor} from '../../actions/colors';
import {fetchColorgroups, createColorgroup} from '../../actions/colorgroups';

import {
  selectRow, setObjectHolderProperty,
  enableEditing, enableCreating, enableDefaultStatus, setInitialState
} from '../../actions/table';
import Table from '../../components/Colors';

const mapStateToProps = state => {
  const {token} = state.user;
  const {colors, colorsError, colorsLoading, colorsMessage} = state.colors;
  const {colorgroups, colorgroupsError, colorgroupsLoading} = state.colorgroups;
  const {objectHolder, status} = state.table;
  const errors = colorgroupsError || colorsError ? [colorsError, colorgroupsError] : [];
  const loading = colorsLoading || colorgroupsLoading;

  return {
    title: 'Color',
    data: colors,
    secondaryData: colorgroups,
    message: colorsMessage,
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
      dispatch(fetchColors());
    },
    fetchSecondaryData() {
      dispatch(fetchColorgroups());
    },
    createColorgroup(colorgroup, token) {
      dispatch(createColorgroup(colorgroup, token));
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
    createEntity(color, token) {
      dispatch(createColor(color, token));
    },
    editEntity(id, newColor, token) {
      dispatch(editColor(id, newColor, token));
    },
    deleteEntity(id, token) {
      dispatch(deleteColor(id, token));
    },
    restoreTableState(object) {
      dispatch(setInitialState(object));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
