import React, {Component} from 'react';
import AbstractPage from '../AbstractPage/index';
import Select, {Creatable} from 'react-select';
import {getMainConfigValue} from './secondary/helpers.js';
import Defaults from './secondary/Defaults';
import Designs from './secondary/Designs';
import Colors from './secondary/Colors';
import TextEffects from './secondary/TextEffects';
import ConfigurationOptions from './secondary/ConfigurationOptions.js';
import * as ConfigurationsModel from '../../../../common/models/configuration.json';
const Configuration = ConfigurationsModel.properties;

export default class ConfigurationsView extends Component {
  render() {
    return (
      <AbstractPage{...this.props} objectSample={Configuration} sortingSupport={true}
                   changedInputs={{
                     colors: {
                       elem: <Colors
                         colors={this.props.objectHolder.colors}
                         handleSelectedObjectChange={this.props.handleSelectedObjectChange}/>
                     },
                     textEffects: {
                       elem: <TextEffects
                         textEffects={this.props.objectHolder.textEffects}
                         handleSelectedObjectChange={this.props.handleSelectedObjectChange}/>
                     },
                     redirectWindow: {
                       elem: <Select
                         value={this.props.objectHolder.redirectWindow}
                         options={this.props.redirectWindowOptions}
                         onChange={option => this.props.setEditingObjectProperty('redirectWindow', option.value)}
                         isLoading={this.props.loading}
                         clearable={false}
                       />
                     },
                     options: {
                       elem: <ConfigurationOptions
                         options={this.props.objectHolder.options}
                         changeOptionsNestedHolderValue={this.props.changeOptionsNestedHolderValue}
                         handleSelectedObjectAddNewArray={this.props.handleSelectedObjectAddNewArray}
                         handleSelectedObjectArrayArrayChange={this.props.handleSelectedObjectArrayArrayChange}
                         handleSelectedObjectArrayArrayDeleteElement={this.props.handleSelectedObjectArrayArrayDeleteElement}
                       />
                     }
                   }}
                   customInputs={{
                     defaults: {
                       elem: <Defaults
                         products={this.props.products}
                         defaultProductSize={this.props.objectHolder.defaultProductSize}
                         defaultProductId={this.props.objectHolder.defaultProductId}
                         defaultNumberObjectText={this.props.objectHolder.defaultNumberObjectText}
                         defaultNameObjectText={this.props.objectHolder.defaultNameObjectText}
                         onSizeSelectChange={this.props.onSizeSelectChange}
                         handleSelectedObjectChange={this.props.handleSelectedObjectChange}/>,
                       required: true
                     },
                     designs: {
                       elem: <Designs
                         getDesignsUrl={this.props.objectHolder.getDesignsUrl}
                         saveDesignUrl={this.props.objectHolder.saveDesignUrl}
                         loadDesignUrl={this.props.objectHolder.loadDesignUrl}
                         handleSelectedObjectChange={this.props.handleSelectedObjectChange}/>,
                       required: true,
                       viewIndex: 12
                     }
                   }}
                   customDefaultRender={
                     <div>
                       <div className='col-md-12'>
                         <label>Used configuration:</label>
                         <Select style={{marginBottom: 8}}
                                 value={getMainConfigValue(this.props.data)}
                                 valueKey='id'
                                 labelKey='name'
                                 options={this.props.data}
                                 isLoading={this.props.loading}
                                 onChange={o => this.props.updateMainConfig(o)}
                         />
                       </div>
                     </div>
                   }

      />
    );
  }
}

