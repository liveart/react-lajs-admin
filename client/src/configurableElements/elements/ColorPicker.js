import React from 'react';
import {SketchPicker} from 'react-color';

/**
 * The color picker element. Used to set the value property in Color.
 * getValue prop is required as the element's onChange prop returns an object containing a color
 * value represented in different options as an object, whereas Color's property 'value' needs hex.
 */
export default <SketchPicker getValue={res => res.hex}
                             valueProp={'color'}/>;
