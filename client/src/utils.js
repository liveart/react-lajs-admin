import {RELATIVE_URL} from './definitions';

export const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);
export const getFileUrl = url =>
  url.substring(0, RELATIVE_URL.length) === RELATIVE_URL ? url.substring(RELATIVE_URL.length) : url;
export const getName = (obj, url) => typeof obj === 'object' ? RELATIVE_URL + '/' + url + obj.name : null;
export const getNameFromUrl = name => typeof name === 'string' ? name.substring(name.lastIndexOf('/') + 1) : null;

