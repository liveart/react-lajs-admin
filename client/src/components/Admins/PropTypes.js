import PropTypes from 'prop-types';

export const PTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  objectHolder: PropTypes.object,
  status: PropTypes.string.isRequired,
  selectRow: PropTypes.func.isRequired,
  enableEditing: PropTypes.func.isRequired,
  enableCreating: PropTypes.func.isRequired,
  enableDefaultStatus: PropTypes.func.isRequired,
  setEditingObjectProperty: PropTypes.func.isRequired,
  restoreTableState: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  validateUserToken: PropTypes.func.isRequired
};
