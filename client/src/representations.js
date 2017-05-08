import React from 'react';
import {Representations} from './definitions';
import {getNameFromUrl, getFileUrl} from './utils';

export function getElement(type = Representations.TEXT, value = '') {
  switch (type) {
    case Representations.TEXT:
      return value;
    case Representations.LINK:
      return <a href={getFileUrl(value)}
                style={{width: 100}}>{getNameFromUrl(value)}</a>;
  }
}
