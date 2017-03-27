export const ID_PROP = 'id';

export const RELATIVE_URL = '@@RELATIVE';
export const GRAPHIC_IMG_FOLDER = 'files/graphicImages/';
export const GRAPHIC_THUMB_FOLDER = 'files/graphicThumbs/';
export const GRAPHIC_CATEGORY_FOLDER = 'files/thumb/';

export const STATUS_EDITING = 'STATUS_EDITING';
export const STATUS_CONFIRM_DELETE = 'STATUS_CONFIRM_DELETE';
export const STATUS_CREATING = 'STATUS_CREATING';
export const STATUS_DEFAULT = 'STATUS_DEFAULT';
export const STATUS_IMPORT_JSON = 'STATUS_IMPORT_JSON';

export function getAddress() {
  const protocol = window.location.protocol;
  const slashes = protocol.concat("//");
  const host = slashes.concat(window.location.hostname);
  const portDots = host.concat(':');
  return portDots.concat(window.location.port);
}
