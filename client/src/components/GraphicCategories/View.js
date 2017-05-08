import React, {Component} from 'react';
import AbstractPage from '../AbstractPage/index';
import DeleteConfirmation from './secondary/DeleteConfirmation';
import * as GraphicsCategoryModel from '../../../../common/models/graphics-category.json';
const GraphicsCategory = GraphicsCategoryModel.properties;
import DeleteButton from './secondary/DeleteButton';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, GRAPHIC_CATEGORY_FOLDER} from '../../definitions';

export default class View extends Component {
  render() {
    return (
      <AbstractPage {...this.props} objectSample={GraphicsCategory} sortingSupport={true}
                    representations={{
                      thumb: {
                        getElem: val => <a href={this.props.getFileUrl(val)} className='thumbnail' style={{width: 100}}>
                          <img src={this.props.getFileUrl(val)} alt='thumb' style={{width: 100}}/></a>
                      },
                    }}
                    changedInputs={{
                      thumb: {
                        saveF: () => this.props.handleFileUpload(this.refs.canvas),
                        getName: obj => this.props.getName(obj, GRAPHIC_CATEGORY_FOLDER)
                      }
                    }
                    }
                    customInputs={{
                      thumb: {
                        elem: <div>
                          <input type='file' className='form-control' accept='image/*'
                                 onChange={e => this.props.handleFileChoose('thumb', e, this.refs.canvas)}/>

                          {typeof (this.props.objectHolder['thumb']) === 'string' && this.props.status === STATUS_EDITING ?
                            <div style={{float: 'left'}}><a
                              href={this.props.getFileUrl(this.props.objectHolder['thumb'])}
                              className='thumbnail'
                              style={{marginTop: 8, width: 100}}><img style={{width: 100}}
                                                                      src={this.props.getFileUrl(this.props.objectHolder['thumb'])}/></a>
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
                                      onChange={e => this.props.handleSelectedObjectChange('graphicsCategoryId', e)}
                                      value={this.props.objectHolder['graphicsCategoryId']}>
                          <option key='rootCategory' value={''}>Root category</option>
                          {this.props.data.map(cg => (
                            this.props.objectHolder[ID_PROP] !== cg.id ?
                              (this.props.objectHolder[ID_PROP] !== cg.graphicsCategoryId) || (cg.graphicsCategoryId === '') ?
                                <option key={cg.id} value={cg.id}>{cg.name}</option> :
                                <option disabled='disabled' key={cg.id} value={cg.id}>{cg.name} </option> : null
                          ))}
                        </select>
                      }
                    }

                    }
                    deleteConfirmation={true}
                    renderDeleteConfirmationDialog={
                      <DeleteConfirmation data={this.props.data}
                                          objectHolder={this.props.objectHolder}
                                          newGraphic={this.props.newGraphic}
                                          newGraphicsCategory={this.props.newGraphicsCategory}
                                          selectedValue={this.props.selectedValue}
                                          selectedSecondaryValue={this.props.selectedSecondaryValue}
                                          handleMoveToCategory={this.props.handleMoveToCategory}
                                          handleCategoryActionOption={this.props.handleCategoryActionOption}
                                          handleGraphicActionOption={this.props.handleGraphicActionOption}
                                          handleMoveGraphicToCategory={this.props.handleMoveGraphicToCategory}/>}

                    renderDeleteConfirmationButtons={
                      <DeleteButton newGroup={this.props.newGroup}
                                    selectedValue={this.props.selectedSecondaryValue}
                                    enableDefaultStatus={this.props.enableDefaultStatus}
                                    restoreTableState={this.props.restoreTableState}
                                    handleDeleteBtnClick={this.props.handleDeleteBtnClick}/>}

      />
    );
  }
}

