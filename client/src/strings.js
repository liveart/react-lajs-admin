export const NotificationTypes = {
  WARN: 'warning',
  ERR: 'error',
  INFO: 'info',
  SUCCESS: 'success'
};

export const NotificationMessages = {
  SVG_COLORS_MISSED: 'Some of the colors from the selected image are not present in the color list.',
  SVG_CAN_BE_PARSED: 'Some options might be parsed from the selected svg image',
  SVG_IF_PARSE: 'Try parsing multicolor option and colorizable elements from the image?',
  INCORRECT_PROPERTY_NAME: 'Incorrect custom property name.',
  ARE_YOU_SURE: 'Are you sure?',
  FILL_REQUIRED: 'Please, fill all the required fields.',
  PARSER_NOT_FOUND: 'The parser is not found for this model.',
  BASE_URL_NOT_SET_TITLE: 'Base url is not set',
  BASE_URL_NOT_SET: 'Not setting correct base url will result in broken links.',
  NO_PROTOCOL_TITLE: 'The specified base url seems not to have a protocol',
  NO_PROTOCOL: 'Not setting correct base url will result in broken links.',
  INVALID_JSON: 'Json structure is invalid.'
};

export const IMPORT_URL_INFO = 'Base url for links. Requires protocol (example http://site.com/)';
