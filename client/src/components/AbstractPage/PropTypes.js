import PropTypes from 'prop-types';

/**
 * Describes prop types for the Abstract Page component.
 */
export const PTypes = {
  /**
   * Adds notification.
   */
  addNotification: PropTypes.func.isRequired,
  /**
   * Will be shown as notification on component update.
   */
  message: PropTypes.string,
  /**
   * Title of the entity.
   */
  title: PropTypes.string.isRequired,
  /**
   * Plural title of the entity.
   * By default it is a title with 's' added.
   */
  pluralTitle: PropTypes.string,
  /**
   * The array of entities.
   */
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  /**
   * The array of errors, each will be displayed as a notification on component update.
   */
  errors: PropTypes.arrayOf(PropTypes.string),
  /**
   * Whether or not some of the data is being loaded.
   * The loader animation will be shown.
   */
  loading: PropTypes.bool.isRequired,
  /**
   * Method that creates an action to fetch entities.
   */
  fetchData: PropTypes.func.isRequired,
  /**
   * The object that holds all the properties of the editing object.
   */
  objectHolder: PropTypes.object,
  /**
   * One of the defined constants representing the current view status.
   */
  status: PropTypes.string.isRequired,
  /**
   * Method that handles entity select from the table.
   */
  selectRow: PropTypes.func.isRequired,
  /**
   * Method that creates an action to enable editing status.
   */
  enableEditing: PropTypes.func.isRequired,
  /**
   * Method that creates an action to enable creating status.
   */
  enableCreating: PropTypes.func.isRequired,
  /**
   * Method that creates an action to enable default status.
   */
  enableDefaultStatus: PropTypes.func.isRequired,
  /**
   * Handles Json import if it's supported.
   * @param text json raw text to import.
   */
  handleImportJson: PropTypes.func,
  /**
   * Method that creates an action to create entity.
   */
  createEntity: PropTypes.func.isRequired,
  /**
   * Method that creates an action to edit entity.
   */
  editEntity: PropTypes.func.isRequired,
  /**
   * Method that creates an action to delete entity.
   */
  deleteEntity: PropTypes.func.isRequired,
  /**
   * Method that sets object holder's value.
   */
  setEditingObjectProperty: PropTypes.func.isRequired,
  /**
   * Method that restore the table's state.
   */
  restoreTableState: PropTypes.func.isRequired,
  /**
   * User token.
   */
  token: PropTypes.string,
  /**
   * Sample object that describes properies and their configuration.
   */
  objectSample: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
  deleteConfirmation: PropTypes.bool,
  enableConfirmDelete: PropTypes.func,
  renderDeleteConfirmationDialog: PropTypes.object,
  renderDeleteConfirmationButtons: PropTypes.object,
  /**
   * Enables import json state.
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
  /**
   * The array of secondary entities which might represent categories or groups.
   */
  secondaryData: PropTypes.array,
  uploadFile: PropTypes.func,
  beforeSaveHook: PropTypes.func
};
