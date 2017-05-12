import React from 'react';
import {SketchPicker} from 'react-color';

export default <SketchPicker getValue={res => res.hex}
                             valueProp={'color'}/>;
