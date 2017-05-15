import React from 'react';
import Select from 'react-select';

export default <Select multi={true} getValue={res => res ? res : []}
                       acceptsOptions={true}/>;
