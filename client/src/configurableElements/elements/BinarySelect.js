import React from 'react';
import Select from 'react-select';

export default React.cloneElement(<Select clearable={false}
                                          searchable={false}
                                          className='onTop1'
                                          options={[
                                            {value: false, label: 'No'},
                                            {value: true, label: 'Yes'}
                                          ]}/>, {getValue: res => res.value});
