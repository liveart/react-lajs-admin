import {RELATIVE_URL} from './definitions';

export const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

export const getFileUrl = url => {
  if (typeof url !== 'string') {
    return;
  }
  return url.substring(0, RELATIVE_URL.length) === RELATIVE_URL ? url.substring(RELATIVE_URL.length) : url;
};

export const getName = (obj, url) => typeof obj === 'object' ? RELATIVE_URL + '/' + url + obj.name : null;

export const getNameFromUrl = name => typeof name === 'string' ? name.substring(name.lastIndexOf('/') + 1) : null;

export const getHeader = (propName, sample) => sample[propName].header ?
  sample[propName].header : capitalizeFirstLetter(propName);

export const dataUriToBlob = dataurl => {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    // eslint-disable-next-line no-undef
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
};
