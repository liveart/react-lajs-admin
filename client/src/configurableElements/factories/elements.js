import React from 'react';
import {Elements} from '../config';
import FileInput from '../elements/FileInput';
import DefaultInput from '../elements/DefaultInput';
import TextArea from '../elements/TextArea';
import BinarySelect from '../elements/BinarySelect';
import DataSelect from '../elements/DataSelect';
import DataMultiselect from '../elements/DataMultiselect';
import ColorPicker from '../elements/ColorPicker';

export function getElement(type = Elements.DEFAULT_INPUT) {
  switch (type) {
    case Elements.DEFAULT_INPUT:
      return DefaultInput;
    case Elements.TEXTAREA:
      return TextArea;
    case Elements.FILE_INPUT:
      return FileInput;
    case Elements.BINARY_SELECT:
      return BinarySelect;
    case Elements.DATA_SELECT:
      return DataSelect;
    case Elements.DATA_MULTISELECT:
      return DataMultiselect;
    case Elements.COLOR_PICKER:
      return ColorPicker;
  }
}
