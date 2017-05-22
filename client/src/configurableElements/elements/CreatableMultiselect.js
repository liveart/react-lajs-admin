import React from 'react';
import Select from 'react-select';

/**
 * The select element with ability to select multiple entities and create new ones.
 * getValue prop is required as the element's onChange prop by default returns data object and not an Event.
 */
export default <Select.Creatable multi={true}
                                 arrowRenderer={() => <span>+</span>}
                                 placeholder={'Select options or type to add new...'}
                                 getValue={res => res ? res : []} acceptsOptions={true}/>;
