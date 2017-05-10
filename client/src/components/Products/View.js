import React, {Component} from 'react';
import AbstractPage from '../AbstractPage/index';
import {capitalizeFirstLetter} from '../../utils';
import ColorizableTable from './secondary/ColorizableTable';
import ColorsTable from './secondary/ColorsTable';
import EditableAreaSizes from './secondary/EditableAreaSizesTable';
import Locations from './secondary/Locations';
import * as ProductModel from '../../../../common/models/product.json';
const Product = ProductModel.properties;

export default class ProductView extends Component {
  render() {
    return <AbstractPage {...this.props} objectSample={{...Product}}
                         sortingSupport={true}
                         secondaryData={this.props.productsCategories}
                         handleImportJson={this.handleImportJson}
                         enableImportJson={this.props.enableImportJson}
                         nested={{
                           colorizables: <ColorizableTable
                             colors={this.props.colors}
                             colorsLoading={this.props.colorsLoading}
                             colorgroupsLoading={this.props.colorgroupsLoading}
                             colorgroups={this.props.colorgroups}
                             colorizables={this.props.objectHolder.colorizables}
                             handleSelectedObjectArrayChange={this.props.handleSelectedObjectArrayChange}
                             handleColorActionOption={this.props.handleColorActionOption}
                             onColorizableColorsSelectChange={this.props.onColorizableColorsSelectChange}
                             onColorizableColorgroupSelectChange={this.props.onColorizableColorgroupSelectChange}
                             deleteColorizableRow={this.props.deleteColorizableRow}
                             addColorizableRow={this.props.addColorizableRow}
                           />,
                           colors: <ColorsTable
                             colorList={this.props.colors}
                             colors={this.props.objectHolder.colors}
                             locations={this.props.objectHolder.locations}
                             onColorsSelectChange={this.props.onColorsSelectChange}
                             handleColorLocationActionOption={this.props.handleColorLocationActionOption}
                             handleSelectedObjectArrayArrayChange={this.props.handleSelectedObjectArrayArrayChange}
                             deleteLocationRow={this.props.deleteLocationRow}
                             addLocationRow={this.props.addLocationRow}
                             deleteColorsRow={this.props.deleteColorsRow}
                             addColorsRow={this.props.addColorsRow}/>,
                           editableAreaSizes: <EditableAreaSizes
                             editableAreaSizes={this.props.objectHolder.editableAreaSizes}
                             handleSelectedObjectArrayChange={this.props.handleSelectedObjectArrayChange}
                             deleteEditableAreaSizeRow={this.props.deleteEditableAreaSizeRow}
                             addEditableAreaSizeRow={this.props.addEditableAreaSizeRow}
                           />,
                           locations: <Locations
                             location={this.props.location}
                             crop={ref => this.props.crop(ref)}
                             objectHolder={this.props.objectHolder}
                             getImageUrl={this.props.getImageUrl}
                             getLocationsInputValue={this.props.getLocationsInputValue}
                             changeLocationsNestedArrValue={this.props.changeLocationsNestedArrValue}
                             changeLocationsNestedHolderValue={this.props.changeLocationsNestedHolderValue}
                             handleLocationsNestedFileChoose={this.props.handleLocationsNestedFileChoose}
                             deleteCurrentLocation={this.props.deleteCurrentLocation}
                             handleNewLocation={this.props.handleNewLocation}
                             handleOptionChange={this.props.handleOptionChange}
                             handleNewOption={this.props.handleNewOption}
                             addUnitsRangeRow={this.props.addUnitsRangeRow}
                             deleteUnitsRangeRow={this.props.deleteUnitsRangeRow}
                             updateDblNestedArray={this.props.updateDblNestedArray}
                             updateArray={this.props.updateArray}/>
                         }}
                         customInputs={{
                           pantones: {
                             elem: <div className='panel panel-default'>
                               <div className='panel-body'>
                                 <div className='form-group'>
                                   <div className='col-md-3'>
                                     <p>Use for decoration: </p>
                                   </div>
                                   <div className='col-md-9'>
                                     <select className='form-control'
                                             value={this.props.objectHolder.pantones ?
                                               this.props.objectHolder.pantones.useForDecoration : ''}
                                             onChange={e => this.handleSelectedObjectDataChange('pantones', 'useForDecoration', e)}>
                                       <option value={false}>No</option>
                                       <option value={true}>Yes</option>
                                     </select>
                                   </div>
                                 </div>
                                 <div className='form-group'>
                                   <div className='col-md-3'>
                                     <p>Use for product: </p>
                                   </div>
                                   <div className='col-md-9'>
                                     <select className='form-control'
                                             value={this.props.objectHolder.pantones ?
                                               this.props.objectHolder.pantones.useForProduct : ''}
                                             onChange={e => this.handleSelectedObjectDataChange('pantones', 'useForProduct', e)}>
                                       <option value={false}>No</option>
                                       <option value={true}>Yes</option>
                                     </select>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           },
                           options: {
                             elem: <div className='panel panel-default'>
                               <div className='panel-body'>
                                 <div className='form-group'>
                                   <div className='col-md-3'>
                                     <p>Is multicolor: </p>
                                   </div>
                                   <div className='col-md-9'>
                                     <select className='form-control'
                                             value={this.props.objectHolder.multicolor}
                                             onChange={e => this.props.setEditingObjectProperty('multicolor', e.target.value === 'true')}>
                                       <option value={false}>No</option>
                                       <option value={true}>Yes</option>
                                     </select>
                                   </div>
                                 </div>
                                 <div className='form-group'>
                                   <div className='col-md-3'>
                                     <p>Show editable area border: </p>
                                   </div>
                                   <div className='col-md-9'>
                                     <select className='form-control'
                                             value={this.props.objectHolder.hideEditableAreaBorder}
                                             onChange={e => this.handleSelectedObjectChange('hideEditableAreaBorder', e)}>
                                       <option value={false}>No</option>
                                       <option value={true}>Yes</option>
                                     </select>
                                   </div>
                                 </div>
                                 <div className='form-group'>
                                   <div className='col-md-3'>
                                     <p>Names / Numbers enabled: </p>
                                   </div>
                                   <div className='col-md-9'>
                                     <select className='form-control'
                                             value={this.props.objectHolder.namesNumbersEnabled}
                                             onChange={e => this.handleSelectedObjectChange('namesNumbersEnabled', e)}>
                                       <option value={false}>No</option>
                                       <option value={true}>Yes</option>
                                     </select>
                                   </div>
                                 </div>
                                 <div className='form-group'>
                                   <div className='col-md-3'>
                                     <p>Resizable: </p>
                                   </div>
                                   <div className='col-md-9'>
                                     <select className='form-control'
                                             value={this.props.objectHolder.resizable}
                                             onChange={e => this.handleSelectedObjectChange('resizable', e)}>
                                       <option value={false}>No</option>
                                       <option value={true}>Yes</option>
                                     </select>
                                   </div>
                                 </div>
                                 <div className='form-group'>
                                   <div className='col-md-3'>
                                     <p>Show ruler: </p>
                                   </div>
                                   <div className='col-md-9'>
                                     <select className='form-control'
                                             value={this.props.objectHolder.showRuler}
                                             onChange={e => this.handleSelectedObjectChange('showRuler', e)}>
                                       <option value={false}>No</option>
                                       <option value={true}>Yes</option>
                                     </select>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           },
                           customOptions: {
                             elem: <div className='panel panel-default'>
                               <div className='panel-body'>
                                 {this.props.objectHolder.data ? Object.getOwnPropertyNames(this.props.objectHolder.data).map(prop =>
                                   <div key={prop} className='form-group'>
                                     <div className='col-md-2'>
                                       <p>{capitalizeFirstLetter(prop)}: </p>
                                     </div>
                                     <div className='col-md-9'>
                                       <input type='text' className='form-control'
                                              value={this.props.objectHolder.data[prop]}
                                              onChange={e => this.handleSelectedObjectDataChange('data', prop, e)}/>
                                     </div>
                                     <div className='col-md-1'>
                                       <a className='btn btn-default' href='#' aria-label='Remove'
                                          onClick={() => this.removeCustomOption(prop)}>
                                         <i className='fa fa-times' aria-hidden='true'/>
                                       </a>
                                     </div>
                                   </div>
                                 ) : null}
                               </div>
                               <div className='panel-footer'>
                                 <div className='input-group'>
                                   <input type='text' className='form-control' ref={r => this.customOptionInput = r}
                                          placeholder='New option name'/>
                                   <span className='input-group-btn'>
                      <button type='button' className='btn btn-primary btn-n'
                              onClick={this.createCustomOption}>Create
                      </button>
                    </span>
                                 </div>
                               </div>
                             </div>
                           }
                         }}/>;
  }
}
