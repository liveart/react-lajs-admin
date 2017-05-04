import PropTypes from 'prop-types';

export const PTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  addNotification: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
  graphics: PropTypes.arrayOf(PropTypes.any).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  fetchSecondaryData: PropTypes.func.isRequired,
  fetchGraphics: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  objectHolder: PropTypes.object,
  status: PropTypes.string.isRequired,
  selectRow: PropTypes.func.isRequired,
  enableEditing: PropTypes.func.isRequired,
  enableCreating: PropTypes.func.isRequired,
  enableDefaultStatus: PropTypes.func.isRequired,
  createEntity: PropTypes.func.isRequired,
  editEntity: PropTypes.func.isRequired,
  deleteEntity: PropTypes.func.isRequired,
  deleteSecondary: PropTypes.func.isRequired,
  setEditingObjectProperty: PropTypes.func.isRequired,
  restoreTableState: PropTypes.func.isRequired,
  token: PropTypes.string
};
