import React from 'react';
import Select from 'react-select';

export default <Select.Creatable valueKey='id' labelKey='name' multi={true}
                                 arrowRenderer={() => <span>+</span>} placeholder={'Select options or type to add new...'}
                                 getValue={res => res ? res : []} acceptsOptions={true}/>;
