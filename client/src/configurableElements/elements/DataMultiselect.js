import React from 'react';
import Select from 'react-select';

/**
 * The select element with ability to select multiple entities.
 * getValue prop is required as the element's onChange prop by default returns data object and not an Event.
 */
export default <Select multi={true} getValue={res => res ? res : []}
                       acceptsOptions={true}/>;
