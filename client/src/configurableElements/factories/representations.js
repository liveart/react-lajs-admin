import React from 'react';
import {Representations} from '../config';
import {getNameFromUrl, getFileUrl} from '../../utils';

/**
 * The factory where an element is defined to be used for a specific representation string constant.
 */
export function getElement(type = Representations.TEXT, value = '') {
  switch (type) {
    case Representations.TEXT:
      return value;
    case Representations.LINK:
      return <a href={getFileUrl(value)}
                style={{width: 100}}>{getNameFromUrl(value)}</a>;
    case Representations.COLOR_VALUE:
      return <div>
        {value}
        <span className='label label-default pull-right' style={{background: value}}>&nbsp;</span>
      </div>;
    case Representations.THUMBNAIL: {
      let src = getFileUrl(value);
      if (value instanceof File) {
        return null;
      }
      return <a href={src} className='thumbnail' style={{width: 100, marginTop: 4}}>
        <img src={src} style={{width: 100}}/></a>;
    }
  }
}
