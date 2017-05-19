/**
 * Config for required constants.
 */

/**
 * The property name that represents ID.
 * @type {string}
 */
export const ID_PROP = 'id';

/**
 * The prefix indicating that the link has relative url.
 * @type {string}
 */
export const RELATIVE_URL = '@@RELATIVE';

/**
 * A number of containers and directories which are required for the nested components with file inputs.
 */
export const PRODUCT_LOCATION_IMAGE_CONTAINER = 'containers/productLocationImage';
export const PRODUCT_LOCATION_MASK_CONTAINER = 'containers/productLocationMask';
export const PRODUCT_LOCATION_OVERLAY_CONTAINER = 'containers/productLocationOverlay';
export const PRODUCT_LOCATION_COLORS_CONTAINER = 'containers/productColors';
export const PRODUCT_LOCATION_COLORS_DIR = 'files/productColors/';
export const PRODUCT_LOCATION_IMAGE_DIR = 'files/productLocationImage/';
export const PRODUCT_LOCATION_MASK_DIR = 'files/productLocationMask/';
export const PRODUCT_LOCATION_OVERLAY_DIR = 'files/productLocationOverlay/';

/**
 * Options for Graphic colorizable elements property that indicate
 * if the colors individually or a colorogroup should be assigned.
 * @type {string}
 */
export const ASSIGN_GROUP = 'Assign Color Group';
export const ADD_COLOR = 'Add Individual Colors';

/**
 * Options for the confirmation dialog when deleting a colorgroup.
 * @type {string}
 */
export const DELETE_COLORS = 'DELETE_COLORS';
export const MOVE_COLORS_TO_OTHER_GROUP = 'MOVE_COLORS_TO_OTHER_GROUP';
export const LEAVE_COLORS_WITHOUT_GROUP = 'LEAVE_COLORS_WITHOUT_GROUP';

/**
 * Options for the confirmation dialog when deleting a graphic or product category.
 * @type {string}
 */
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const MOVE_CATEGORY_TO_OTHER_CATEGORY = 'MOVE_CATEGORY_TO_OTHER_CATEGORY';
export const DELETE_GRAPHICS = 'DELETE_GRAPHICS';
export const MOVE_GRAPHICS_TO_OTHER_CATEGORY = 'MOVE_GRAPHICS_TO_OTHER_CATEGORY';
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS';
export const MOVE_PRODUCTS_TO_OTHER_CATEGORY = 'MOVE_PRODUCTS_TO_OTHER_CATEGORY';

/**
 * Statuses that represent the current view state.
 * @type {string}
 */
export const STATUS_EDITING = 'STATUS_EDITING';
export const STATUS_CONFIRM_DELETE = 'STATUS_CONFIRM_DELETE';
export const STATUS_CREATING = 'STATUS_CREATING';
export const STATUS_DEFAULT = 'STATUS_DEFAULT';
export const STATUS_IMPORT_JSON = 'STATUS_IMPORT_JSON';
export const STATUS_BEFORE_SAVING = 'STATUS_BEFORE_SAVING';
export const STATUS_ADDITIONAL_SAVING_COMPLETE = 'STATUS_ADDITIONAL_SAVING_COMPLETE';

/**
 * Message strings that are added to the notifications when entity is changed.
 * @type {string}
 */
export const MESSAGE_ENTITY_CREATED = 'has been successfully added.';
export const MESSAGE_ENTITY_UPDATED = 'has been successfully updated.';
export const MESSAGE_ENTITY_DELETED = 'has been successfully deleted.';

/**
 * Constant that indicates that the urls should not be changed on import.
 * @type {string}
 */
export const LEAVE_URL_OPTION = 'Import';
