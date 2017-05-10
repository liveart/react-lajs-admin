import React from 'react';
import Select from 'react-select';

export default <Select valueKey='id' labelKey='name' className='onTop1' getValue={res => res ? res.id : ''}
                       acceptsOptions={true}/>;
