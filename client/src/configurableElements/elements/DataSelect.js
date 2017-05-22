import React from 'react';
import Select from 'react-select';

/**
 * The select element to store a single entity.
 * getValue prop is required as the element's onChange prop by default returns data object and not an Event.
 */
export default <Select valueKey='id' labelKey='name' getValue={res => res ? res.id : ''}
                       acceptsOptions={true}/>;
