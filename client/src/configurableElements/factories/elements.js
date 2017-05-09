import React from 'react';
import {Elements} from '../config';
import FileInput from '../elements/FileInput';
import DefaultInput from '../elements/DefaultInput';
import BinarySelect from '../elements/BinarySelect';

export function getElement(type = Elements.DEFAULT_INPUT) {
  switch (type) {
    case Elements.DEFAULT_INPUT:
      return DefaultInput;
    case Elements.FILE_INPUT:
      return FileInput;
    case Elements.BINARY_SELECT:
      return BinarySelect;
  }
}
