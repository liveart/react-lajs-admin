import React, {Component} from 'react';
import AbstractPage from '../AbstractPage/index';
import ColorizableTable from './secondary/ColorizableTable';
import sortBy from 'lodash/sortBy';
import {Creatable} from 'react-select';
import * as GraphicModel from '../../../../common/models/graphic.json';
import {STATUS_EDITING, STATUS_CREATING, GRAPHIC_IMG_FOLDER, GRAPHIC_THUMB_FOLDER,} from '../../definitions';
import {getName} from '../../utils';
const Graphic = GraphicModel.properties;

export default class GraphicsView extends Component {
  render() {
    return <AbstractPage {...this.props}
                         objectSample={Graphic}
                         sortingSupport={true}
                         secondaryData={this.props.graphicsCategories}
                         enableImportJson={this.props.enableImportJson}
                         handleImportJson={this.props.handleImportJson}
                         sortComparators={{categoryId: (data, id) => id === '' ? true : data === id}}
                         changedInputs={{
                           image: {
                             elem: <input type='file' className='form-control'
                                          onChange={e =>
                                            this.props.handleFileSelection('image', e)}/>,
                             saveF: this.props.handleImageUpload,
                             getName: obj => getName(obj, GRAPHIC_IMG_FOLDER)
                           },
                           thumb: {
                             saveF: () => this.props.handleThumbUpload(this.refs.canvas),
                             getName: obj => getName(obj, GRAPHIC_THUMB_FOLDER)
                           },
                           colors: {
                             elem: <Creatable
                               name='colors'
                               value={this.props.getSelectedOptions(this.props.objectHolder.colors)}
                               multi={true}
                               labelKey='name'
                               options={this.props.getOptions(this.props.colors)}
                               onChange={this.props.onColorsSelectChange}
                               isLoading={this.props.colorsLoading}
                             />
                           },
                           description: {
                             elem: <textarea className='form-control' rows='3'
                                             value={this.props.objectHolder['description']}
                                             onChange={e => this.props.updateObject('description', e)}>

                                   </textarea>
                           },
                           colorize: {
                             elem: <select className='form-control'
                                           value={this.props.objectHolder['colorize']}
                                           onChange={e => this.props.updateObject('colorize', e)}>
                               <option value={false}>No</option>
                               <option value={true}>Yes</option>
                             </select>
                           },
                           multicolor: {
                             elem: <select className='form-control'
                                           value={this.props.objectHolder['multicolor']}
                                           onChange={e => this.props.updateObject('multicolor', e)}>
                               <option value={false}>No</option>
                               <option value={true}>Yes</option>
                             </select>
                           },
                           colorizables: {
                             elem: <ColorizableTable
                               colorizables={ this.props.objectHolder.colorizables || []}
                               nameInputHandler={(e, key) => this.props.updateArray(this.props.updateNestedArray('colorizables', key, 'name', e))}
                               idInputHandler={(e, key) => this.props.updateArray(this.props.updateNestedArray('colorizables', key, 'id', e))}
                               getColorizableValue={key => this.props.getSelectedColorizableOptions(this.props.objectHolder.colorizables, key)}
                               colorizableHandler={(o, key) => this.props.handleColorActionOption(o, key)}
                               colorizableOptions={this.props.getColorizableColorsOptions}
                               deleteColorizableRow={key => this.props.deleteColorizableRow(key)}
                               getColorgroupValue={key => this.props.getSelectedColorizableColorgroupOptions(this.props.objectHolder.colorizables, key)}
                               colorgroupHandler={(o, key) => this.props.onColorizableColorgroupSelectChange(o, key)}
                               colorgroupOptions={this.props.getColorgroupsOptions(this.props.colorgroups)}
                               getColorValue={key => this.props.getColorsOptionsByColorizable(this.props.objectHolder.colorizables, key)}
                               colorHandler={(o, key) => this.props.onColorizableColorsSelectChange(o, key)}
                               colorOptions={this.props.getOptions(this.props.colors)}
                               colorsLoading={this.props.colorsLoading}
                               colorgroupsLoading={this.props.colorgroupsLoading}
                               addColorizableRow={this.props.addColorizableRow}/>,
                             saveF: this.props.saveColorizables
                           }
                         }}
                         customInputs={{
                           image: {
                             elem: <div>
                               <input ref='file' type='file' className='form-control' accept='image/*'
                                      onChange={e => this.props.handleFileSelection('image', e)}/>

                               {typeof (this.props.objectHolder['image']) === 'string' && this.props.status === STATUS_EDITING ?
                                 <a href={this.props.getFileUrl(this.props.objectHolder['image'])}
                                    className='thumbnail'
                                    style={{marginTop: 8, width: 100}}><img
                                   style={{width: 100}} src={this.props.getFileUrl(this.props.objectHolder['image'])}/>
                                 </a>
                                 : typeof (this.props.objectHolder['image']) === 'object' ?
                                   <div><a
                                     href={this.props.imgUrl}
                                     className='thumbnail'
                                     style={{
                                       marginTop: 8,
                                       width: 100
                                     }}>
                                     <img src={this.props.imgUrl}/>
                                   </a>
                                     <a className='btn btn-primary btn-xs' href='#'
                                        onClick={() => this.props.handleImgAsThumb(this.refs.canvas)}>
                                       Use also as thumb</a>
                                   </div> : null }
                             </div>,
                             required: true
                           },
                           thumb: {
                             elem: <div>
                               <input type='file' className='form-control' accept='image/*'
                                      onChange={e => this.props.handleFileSelection('thumb', e, null, this.refs.canvas)}/>

                               {typeof (this.props.objectHolder['thumb']) === 'string' && this.props.status === STATUS_EDITING ?
                                 <div style={{float: 'left'}}><a
                                   href={this.props.getFileUrl(this.props.objectHolder['thumb'])}
                                   className='thumbnail'
                                   style={{marginTop: 8, width: 100}}><img
                                   style={{width: 100}} src={this.props.getFileUrl(this.props.objectHolder['thumb'])}/>
                                 </a>
                                 </div>
                                 : null}
                               <div style={{float: 'left'}}>
                                 {this.props.status === STATUS_CREATING && !this.props.objectHolder['thumb'] ?
                                   <canvas style={{marginTop: 8}} ref='canvas' width='100'
                                           height='100' hidden/> :
                                   <canvas style={{marginTop: 8}} ref='canvas' width='100'
                                           height='100'/>}
                               </div>
                             </div>,
                             required: true
                           },
                           category: {
                             elem: <select className='form-control'
                                           value={this.props.objectHolder['categoryId']}
                                           onChange={e => this.props.updateObject('categoryId', e)}>
                               <option value={undefined}>Choose category...</option>
                               {this.props.graphicsCategories.map((gc, key) => (
                                 <option key={key} value={gc.id}>{gc.name}</option>
                               ))}
                             </select>,
                             required: true
                           }
                         }}/>;
  }
}
