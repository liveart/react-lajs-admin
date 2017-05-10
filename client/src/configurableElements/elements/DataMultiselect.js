import React from 'react';
import Select from 'react-select';

export default <Select valueKey='id' labelKey='name' multi={true} className='onTop1' getValue={res => res ? res : []}
                       acceptsOptions={true}/>;
