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
    case Representations.COLOR_VALUE:
      return <div>
        {value}
        <span className='label label-default pull-right'
              style={{background: value}}>&nbsp;
        </span>
      </div>;
    case Representations.THUMBNAIL:
      return <a href={getFileUrl(value)} className='thumbnail' style={{width: 100}}>
        <img src={getFileUrl(value)} style={{width: 100}}/></a>;
  }
}
