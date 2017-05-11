import React from 'react';
import Select from 'react-select';

export default <Select.Creatable valueKey='id' labelKey='name' multi={true}
                                 getValue={res => res ? res : []} acceptsOptions={true}/>;
