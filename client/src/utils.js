import {RELATIVE_URL} from './definitions';

/**
 * Capitalizes the first letter of the string.
 * @param str the string to process.
 */
export const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Transforms the url from the internal url representation.
 * @param url
 */
export const getFileUrl = url => {
  if (typeof url !== 'string') {
    return;
  }
  return url.substring(0, RELATIVE_URL.length) === RELATIVE_URL ? url.substring(RELATIVE_URL.length) : url;
};

/**
 * Returns the name for the file represented as internal url.
 * @param obj the object to get the name from.
 * @param url the original url.
 */
export const getName = (obj, url) => typeof obj === 'object' ? RELATIVE_URL + '/' + url + obj.name : null;

/**
 * Returns the name of the internal url string.
 * @param url the url to get the name from.
 */
export const getNameFromUrl = url => typeof url === 'string' ? url.substring(url.lastIndexOf('/') + 1) : null;

/**
 * Return the header property or capitalized property name.
 * @param propName the property name.
 * @param sample the object sample.
 */
export const getHeader = (propName, sample) => sample[propName].header ?
  sample[propName].header : capitalizeFirstLetter(propName);

/**
 * Returns Blob object.
 */
export const dataUriToBlob = dataurl => {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    // eslint-disable-next-line no-undef
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
};
