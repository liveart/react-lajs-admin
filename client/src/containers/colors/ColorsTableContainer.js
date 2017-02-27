import {connect} from 'react-redux';
import {fetchColors, createColor, editColor, deleteColor} from '../../actions/colors';
import {fetchColorgroups, createColorgroup} from '../../actions/colorgroups';

import {
  selectRow, setObjectHolderProperty,
  enableEditing, enableCreating, enableDefaultStatus, setInitialState
} from '../../actions/table';
import Table from '../../components/colors/Colors';

const mapStateToProps = state => {
  const {colors, colorsError, colorsLoading} = state.colors;
  const {colorgroups, colorgroupsError, colorgroupsLoading} = state.colorgroups;
  const {objectHolder, status} = state.table;
  const error = !!(colorsError || colorgroupsError);
  const loading = colorsLoading || colorgroupsLoading;

  return {
    title: 'Colors',
    data: colors,
    secondaryData: colorgroups,
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
    fetchSecondaryData() {
      dispatch(fetchColorgroups());
    },
    createColorgroup(colorgroup) {
      dispatch(createColorgroup(colorgroup));
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
