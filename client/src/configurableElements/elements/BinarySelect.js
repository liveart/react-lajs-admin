import React from 'react';
import Select from 'react-select';

/**
 * The select element with only 2 options -- true or false. The labels are Yes or No respectfully.
 */
export default <Select clearable={false}
                       searchable={false}
                       getValue={res => res ? res.value : undefined}
                       options={[
                         {value: false, label: 'No'},
                         {value: true, label: 'Yes'}
                       ]}/>;
