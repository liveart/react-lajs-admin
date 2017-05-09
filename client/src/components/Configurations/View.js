import React, {Component} from 'react';
import AbstractPage from '../AbstractPage/index';
import Select, {Creatable} from 'react-select';
import ConfigurationOptions from './secondary/ConfigurationOptions.js';
import * as ConfigurationsModel from '../../../../common/models/configuration.json';
const Configuration = ConfigurationsModel.properties;
import {getSelectedSizeOptions, getMainConfigValue} from './secondary/helpers.js';

export default class ConfigurationsView extends Component {
  render() {
    return (
      <AbstractPage{...this.props} objectSample={Configuration} sortingSupport={true}
                   changedInputs={{
                     colors: {
                       elem: <div className='panel panel-default'>
                         <div className='panel-body'>
                           <div className='form-group'>
                             <div className='col-md-3'>
                               <p>Url: </p>
                             </div>
                             <div className='col-md-9'>
                               <input type='text' className='form-control'
                                      value={this.props.objectHolder.colors ? this.props.objectHolder.colors.url : ''}
                                      onChange={e => this.props.setEditingObjectProperty('colors', {
                                        ...this.props.objectHolder.colors,
                                        url: e.target.value
                                      })}/>
                             </div>
                           </div>
                           <div className='form-group'>
                             <div className='col-md-3'>
                               <p>Pantones Url: </p>
                             </div>
                             <div className='col-md-9'>
                               <input type='text' className='form-control'
                                      value={this.props.objectHolder.colors ? this.props.objectHolder.colors.colorsPantonesUrl : ''}
                                      onChange={e => this.props.setEditingObjectProperty('colors', {
                                        ...this.props.objectHolder.colors,
                                        pantones_url: e.target.value
                                      })}/>
                             </div>
                           </div>
                         </div>
                       </div>
                     },
                     textEffects: {
                       elem: <div className='panel panel-default'>
                         <div className='panel-body'>
                           <div className='form-group'>
                             <div className='col-md-3'>
                               <p>Config: </p>
                             </div>
                             <div className='col-md-9'>
                               <input type='text' className='form-control'
                                      value={this.props.objectHolder.textEffects ? this.props.objectHolder.textEffects.config : ''}
                                      onChange={e => this.props.setEditingObjectProperty('textEffects', {
                                        ...this.props.objectHolder.textEffects,
                                        config: e.target.value
                                      })}/>
                             </div>
                           </div>
                           <div className='form-group'>
                             <div className='col-md-3'>
                               <p>Url: </p>
                             </div>
                             <div className='col-md-9'>
                               <input type='text' className='form-control'
                                      value={this.props.objectHolder.textEffects ? this.props.objectHolder.textEffects.url : ''}
                                      onChange={e => this.props.setEditingObjectProperty('textEffects', {
                                        ...this.props.objectHolder.textEffects,
                                        url: e.target.value
                                      })}/>
                             </div>
                           </div>
                         </div>
                       </div>
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
                       elem: <ConfigurationOptions {...this.props}
                         // handleSelectedObjectAddNewArray={this.props.handleSelectedObjectAddNewArray}
                         //  handleSelectedObjectArrayArrayChange={this.props.handleSelectedObjectArrayArrayChange}
                         //  handleSelectedObjectArrayArrayDeleteElement={this.props.handleSelectedObjectArrayArrayDeleteElement}
                       />
                     }
                   }}
                   customInputs={{
                     defaults: {
                       elem: <div className='panel panel-default'>
                         <div className='panel-body'>
                           <div className='form-group'>
                             <div className='col-md-3'>
                               <p>Text: </p>
                             </div>
                             <div className='col-md-9'>
                               <input type='text' className='form-control'
                                      value={this.props.objectHolder.defaultNameObjectText}
                                      onChange={e => this.props.handleSelectedObjectChange('defaultNameObjectText', e)}/>
                             </div>
                           </div>
                           <div className='form-group'>
                             <div className='col-md-3'>
                               <p>Number: </p>
                             </div>
                             <div className='col-md-9'>
                               <input type='text' className='form-control'
                                      value={this.props.objectHolder.defaultNumberObjectText}
                                      onChange={e => this.props.handleSelectedObjectChange('defaultNumberObjectText', e)}/>
                             </div>
                           </div>
                           <div className='form-group'>
                             <div className='col-md-3'>
                               <p>Product: </p>
                             </div>
                             <div className='col-md-9'>
                               <Select
                                 value={this.props.objectHolder.defaultProductId}
                                 options={this.props.products}
                                 className='onTop'
                                 placeholder='No default product selected...'
                                 labelKey='name'
                                 valueKey='id'
                                 onChange={o => o ? this.props.setEditingObjectProperty('defaultProductId', o.id) :
                                   this.props.setEditingObjectProperty('defaultProductId', '')}
                               />
                             </div>
                           </div>
                           {this.props.objectHolder.defaultProductId &&
                           this.props.objectHolder.defaultProductId.length ?
                             <div className='form-group'>
                               <div className='col-md-3'>
                                 <p>Product size: </p>
                               </div>
                               <div className='col-md-9'>
                                 <Creatable
                                   arrowRenderer={function () {
                                     return <span>+</span>;
                                   }}
                                   name='sizes'
                                   value={getSelectedSizeOptions(this.props.objectHolder.defaultProductSize)}
                                   multi={true}
                                   isOptionUnique={() => true}
                                   labelKey='name'
                                   placeholder='Type to add new size...'
                                   noResultsText=''
                                   onChange={this.props.onSizeSelectChange}
                                 />
                               </div>
                             </div> : null}
                         </div>
                       </div>,
                       required: true
                     },
                     designs: {
                       elem: <div className='panel panel-default'>
                         <div className='panel-body'>
                           <div className='form-group'>
                             <div className='col-md-3'>
                               <p>Get Designs Url: </p>
                             </div>
                             <div className='col-md-9'>
                               <input type='text' className='form-control'
                                      value={this.props.objectHolder.getDesignsUrl}
                                      onChange={e => this.props.handleSelectedObjectChange('getDesignsUrl', e)}/>
                             </div>
                           </div>
                           <div className='form-group'>
                             <div className='col-md-3'>
                               <p>Save Design Url: </p>
                             </div>
                             <div className='col-md-9'>
                               <input type='text' className='form-control'
                                      value={this.props.objectHolder.saveDesignUrl}
                                      onChange={e => this.props.handleSelectedObjectChange('saveDesignUrl', e)}/>
                             </div>
                           </div>
                           <div className='form-group'>
                             <div className='col-md-3'>
                               <p>Load Design Url: </p>
                             </div>
                             <div className='col-md-9'>
                               <input type='text' className='form-control'
                                      value={this.props.objectHolder.loadDesignUrl}
                                      onChange={e => this.props.handleSelectedObjectChange('loadDesignUrl', e)}/>
                             </div>
                           </div>
                         </div>
                       </div>,
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

