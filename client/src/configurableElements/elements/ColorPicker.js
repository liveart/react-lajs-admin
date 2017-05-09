import React from 'react';
import {SketchPicker} from 'react-color';

export default React.cloneElement(
  <SketchPicker/>,
  {
    getValue: res => res.hex,
    valueProp: 'color'
  });
