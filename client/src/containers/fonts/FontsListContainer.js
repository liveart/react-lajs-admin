import {connect} from 'react-redux';
import {fetchFonts, createFont, editFont, deleteFont} from '../../actions/fonts';
import {selectRow, enableEditing, enableCreating, enableDefaultStatus} from '../../actions/table';
import Table from '../../components/fonts/Fonts';

const mapStateToProps = state => {
  const {fonts, fontsError, fontsLoading} = state.fonts;
  const error = fontsError;
  const loading = fontsLoading;
  const {selectedRowId, status} = state.table;
  return {
    title: 'fontsList',
    data: fonts,
    error,
    loading,
    selectedRowId,
    status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData() {
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

export default connect(mapStateToProps, mapDispatchToProps)(Table);
