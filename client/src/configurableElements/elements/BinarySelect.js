import React from 'react';
import Select from 'react-select';

export default <Select clearable={false}
                       searchable={false}
                       getValue={ res => res.value}
                       options={[
                         {value: false, label: 'No'},
                         {value: true, label: 'Yes'}
                       ]}/>;
