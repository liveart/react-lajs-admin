import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import {
  ID_PROP,
  STATUS_EDITING,
  STATUS_CREATING,
  STATUS_CONFIRM_DELETE,
  GRAPHIC_CATEGORY_FOLDER,
  RELATIVE_URL
} from '../../definitions';
import * as GraphicsCategoryModel from '../../../../common/models/graphics-category.json';
import {RadioGroup, Radio} from 'react-radio-group';
const GraphicsCategory = GraphicsCategoryModel.properties;
import View from '../View/index';
import * as _ from 'lodash';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const MOVE_CATEGORY_TO_OTHER_CATEGORY = 'MOVE_CATEGORY_TO_OTHER_CATEGORY';
const DELETE_GRAPHICS = 'DELETE_GRAPHICS';
const MOVE_GRAPHICS_TO_OTHER_CATEGORY = 'MOVE_GRAPHICS_TO_OTHER_CATEGORY';

export default class extends Component {
  static propTypes = PTypes;

  handleFileUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      const image = this.props.objectHolder.thumb;
      if (typeof image === 'string') {
        return;
      }
      const uploadThumbnail = file => this.props.uploadThumbnail(file);
      if (image.type !== 'image/svg+xml') {
        const c = this.refs.canvas;
        c.toBlob(function (blob) {
          blob.name = image.name;
          uploadThumbnail(blob);
        }, 'image/*', 0.95);
      } else {
        uploadThumbnail(image);
      }
    }
  };

  handleFileChoose = (prop, e) => {
    this.props.setEditingObjectProperty(prop, e.target.files[0]);
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      const image = this.props.objectHolder['thumb'];
      const img = new Image();
      let imageOut = new Image();
      const reader = new FileReader();
      reader.onload = function (e) {
        img.src = e.target.result;
      };
      reader.readAsDataURL(image);
      const c = this.refs.canvas;
      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, 100, 100);
      img.onload = function () {
        imageOut = ctx.drawImage(img, 0, 0, 100, 100);
      };
    }
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  renderDelete = () => {
    return (
      <div className='form-group'>
        <div className='col-md-3'>
        </div>
        <div className='col-md-6'>
          <h1>Choose an action</h1>
          <div className='form-group'>
            <h3>Linked categories</h3>
            <RadioGroup selectedValue={this.state.selectedValue}
                        onChange={e => this.handleCategoryActionOption(e)}>
              <div>
                <Radio value={DELETE_CATEGORY}/>&nbsp; Delete all the categories
                linked to this category
              </div>
              <div>
                <Radio value={MOVE_CATEGORY_TO_OTHER_CATEGORY}/>&nbsp; Move all the linked categories to other
                category &nbsp;
                <select
                  value={this.state.newGraphicsCategory}
                  onChange={this.handleMoveToCategory}>
                  <option value={''}>Root category</option>
                  {this.props.data.map((cg, key) => (
                    this.props.objectHolder[ID_PROP] !== cg.id ?
                      this.props.objectHolder[ID_PROP] !== cg.graphicsCategoryId ?
                        <option key={key} value={cg.id}>{cg.name}</option> :
                        <option disabled='disabled' key={key} value={cg.id}>{cg.name} </option> : null
                  ))}
                </select>
              </div>
            </RadioGroup>
            <h3>Linked graphics</h3>
            <RadioGroup selectedValue={this.state.selectedSecondaryValue}
                        onChange={e => this.handleGraphicActionOption(e)}>
              <div>
                <Radio value={DELETE_GRAPHICS}/>&nbsp; Delete all the linked graphics
              </div>
              <div>
                <Radio value={MOVE_GRAPHICS_TO_OTHER_CATEGORY}/>&nbsp; Move graphics of this category to other
                category &nbsp;
                <select
                  value={this.state.newGraphic}
                  onChange={this.handleMoveGraphicToCategory}>
                  <option value=''>Select category</option>
                  {this.props.data.map((cg, key) => (
                    this.props.objectHolder[ID_PROP] !== cg.id ?
                      this.props.objectHolder[ID_PROP] === cg.graphicsCategoryId && this.state.selectedValue === DELETE_CATEGORY ?
                        <option disabled='disabled' key={key}>{cg.name}</option> :
                        <option key={key} value={cg.id}>{cg.name} </option> : null
                  ))}
                </select>
                {this.state.newGraphic === '' && this.state.selectedSecondaryValue === MOVE_GRAPHICS_TO_OTHER_CATEGORY ?
                  <div className='text-red'>Please choose category.</div> : null}
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    );
  };

  deleteRelatedCats = (catId, cats, graphicsAction) => {
    this.props.deleteEntity(catId, this.props.token);

    if (graphicsAction !== MOVE_GRAPHICS_TO_OTHER_CATEGORY || catId !== this.props.objectHolder.id) {
      this.props.secondaryData.forEach(g => {
        if (g.categoryId === catId) {
          this.props.deleteSecondaryEntity(g.id, this.props.token);
        }
      });
    }
    cats = _.filter(cats, cat => cat.id !== catId);
    cats.forEach(cat => {
      if (cat.graphicsCategoryId === catId) {
        this.deleteRelatedCats(cat.id, cats, graphicsAction);
      }
    });
  };

  handleDeleteBtnClick = confirmed => {
    if (this.props.status === STATUS_CONFIRM_DELETE && confirmed) {
      if (this.state.selectedValue === DELETE_CATEGORY) {
        const cats = [...this.props.data];
        this.deleteRelatedCats(this.props.objectHolder.id, cats, this.state.selectedSecondaryValue);
      } else {
        if (this.state.selectedValue === MOVE_CATEGORY_TO_OTHER_CATEGORY) {
          this.props.data.forEach(c => {
            if (c.graphicsCategoryId === this.props.objectHolder.id) {
              this.props.editEntity(c.id, {...c, graphicsCategoryId: this.state.newGraphicsCategory}, this.props.token);
            }
          });
          this.props.deleteEntity(this.props.objectHolder.id, this.props.token);
        }
      }
      if (this.state.selectedSecondaryValue === MOVE_GRAPHICS_TO_OTHER_CATEGORY) {
        this.props.secondaryData.forEach(c => {
          if (c.categoryId === this.props.objectHolder.id) {
            this.props.editSecondaryEntity(c.id, {...c, categoryId: this.state.newGraphic}, this.props.token);
          }
        });
      }
      this.props.enableDefaultStatus();
      this.props.restoreTableState(GraphicsCategory);

    }
  };

  handleCategoryActionOption = option => {
    if (option === DELETE_CATEGORY) {
      this.setState({...this.state, selectedValue: option, newGraphic: ''});
    } else if (option === MOVE_CATEGORY_TO_OTHER_CATEGORY) {
      this.setState({...this.state, selectedValue: option});
    }

  };

  handleMoveToCategory = e => {
    this.setState({...this.state, newGraphicsCategory: e.target.value});

  };

  handleGraphicActionOption = option => {
    this.setState({...this.state, selectedSecondaryValue: option});

  };

  handleMoveGraphicToCategory = e => {
    this.setState({...this.state, newGraphic: e.target.value});
  };

  renderDeleteBtn = () => (
    <div>
      <div className='pull-right'>
        {this.state.newGraphic === '' && this.state.selectedSecondaryValue === MOVE_GRAPHICS_TO_OTHER_CATEGORY ?
          <button disabled type='button' className='btn btn-danger'
                  onClick={() => this.handleDeleteBtnClick(true)}>Delete
          </button> :
          <button type='button' className='btn btn-danger'
                  onClick={() => this.handleDeleteBtnClick(true)}>Delete
          </button>}
        <button type='button' className='btn btn-default'
                onClick={() => {
                  this.props.enableDefaultStatus();
                  this.props.restoreTableState(GraphicsCategory);
                }}>Cancel
        </button>
      </div>
    </div>
  );

  constructor() {
    super();
    this.state = {
      deleting: false,
      selectedValue: DELETE_CATEGORY,
      newGraphicsCategory: '',
      selectedSecondaryValue: DELETE_GRAPHICS,
      newGraphic: ''
    };
  }

  getFileUrl = url => _.includes(url, RELATIVE_URL) ? url.substring(RELATIVE_URL.length) : url;

  getName = (obj, url) => {
    if (typeof obj === 'object') {
      return RELATIVE_URL + '/' + url + obj.name;
    }

    return undefined;
  };

  render() {
    return (
      <View {...this.props} objectSample={GraphicsCategory} sortingSupport={true}
            hiddenProperties={['id', 'graphicsCategoryId']}
            representations={{
              thumb: {
                getElem: val => <a href={this.getFileUrl(val)} className='thumbnail' style={{width: 100}}>
                  <img src={this.getFileUrl(val)} alt='thumb' style={{width: 100}}/></a>,
                sortable: false
              },
            }}
            changedInputs={{
              thumb: {
                saveF: this.handleFileUpload,
                getName: obj => this.getName(obj, GRAPHIC_CATEGORY_FOLDER)
              }
            }
            }
            customInputs={{
              thumb: {
                elem: <div>
                  <input type='file' className='form-control' accept='image/*'
                         onChange={e => this.handleFileChoose('thumb', e)}/>

                  {typeof (this.props.objectHolder['thumb']) === 'string' && this.props.status === STATUS_EDITING ?
                    <div style={{float: 'left'}}><a href={this.getFileUrl(this.props.objectHolder['thumb'])}
                                                    className='thumbnail'
                                                    style={{marginTop: 8, width: 100}}><img style={{width: 100}}
                                                                                            src={this.getFileUrl(this.props.objectHolder['thumb'])}/></a>
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
                              onChange={e => this.handleSelectedObjectChange('graphicsCategoryId', e)}
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
            renderDeleteConfirmationDialog={this.renderDelete}
            renderDeleteConfirmationButtons={this.renderDeleteBtn}

      />
    );
  }
}
