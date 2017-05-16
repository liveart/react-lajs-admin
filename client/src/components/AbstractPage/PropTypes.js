import PropTypes from 'prop-types';

export const PTypes = {
  addNotification: PropTypes.func.isRequired,
  message: PropTypes.string,
  title: PropTypes.string.isRequired,
  pluralTitle: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  objectHolder: PropTypes.object,
  status: PropTypes.string.isRequired,
  selectRow: PropTypes.func.isRequired,
  enableEditing: PropTypes.func.isRequired,
  enableCreating: PropTypes.func.isRequired,
  enableDefaultStatus: PropTypes.func.isRequired,
  /**
   * Function that handles Json import if it's supported.
   * @param text json raw text to import.
   */
  handleImportJson: PropTypes.func,
  createEntity: PropTypes.func.isRequired,
  editEntity: PropTypes.func.isRequired,
  deleteEntity: PropTypes.func.isRequired,
  setEditingObjectProperty: PropTypes.func.isRequired,
  restoreTableState: PropTypes.func.isRequired,
  token: PropTypes.string,
  objectSample: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
  deleteConfirmation: PropTypes.bool,
  enableConfirmDelete: PropTypes.func,
  renderDeleteConfirmationDialog: PropTypes.object,
  renderDeleteConfirmationButtons: PropTypes.object,
  /**
   * Function to enable import json state.
   * Defines if Json import is supported.
   */
  enableImportJson: PropTypes.func,
  sortingSupport: PropTypes.bool,
  hiddenProperties: PropTypes.array,
  hiddenInputs: PropTypes.array,
  changedInputs: PropTypes.object,
  customInputs: PropTypes.object,
  /**
   * Custom comparator for sorting.
   */
  sortComparators: PropTypes.object,
  customDefaultRender: PropTypes.object,
  secondaryData: PropTypes.array,
  uploadFile: PropTypes.func,
  beforeSaveHook: PropTypes.func
};
