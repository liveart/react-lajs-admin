import React from 'react';
import Select from 'react-select';

export default <Select valueKey='id' labelKey='name' multi={true} getValue={res => res ? res : []}/>;
