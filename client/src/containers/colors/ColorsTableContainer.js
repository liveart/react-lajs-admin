import {connect} from 'react-redux';
import {fetchColors, createColor, editColor, deleteColor} from '../../actions/colors';

import {
  selectRow, setObjectHolderProperty,
  enableEditing, enableCreating, enableDefaultStatus, setInitialState
} from '../../actions/table';
import {fetchColorgroups} from '../../actions/colorgroups';
import Table from '../../components/colors/Colors';

const mapStateToProps = state => {
  const {colors, colorsError, colorsLoading} = state.colors;
  const {colorgroups, colorgroupsError, colorgroupsLoading} = state.colorgroups;
  const error = colorsError || colorgroupsError;
  const loading = !!(colorsLoading || colorgroupsLoading);
  const {objectHolder, status} = state.table;

  return {
    title: 'Colors',
    secondaryTitle: 'Color Groups',
    secondaryData: colorgroups,
    data: colors,
    error,
    loading,
    objectHolder,
    status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData() {
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
    createEntity(color) {
      dispatch(createColor(color));
    },
    editEntity(id, newColor) {
      dispatch(editColor(id, newColor));
    },
    deleteEntity(id) {
      dispatch(deleteColor(id));
    },
    restoreTableState() {
      dispatch(setInitialState());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
