import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT, STATUS_CONFIRM_DELETE} from '../definitions';
import * as GraphicsCategoryModel from '../../../common/models/graphics-category.json';
import {RadioGroup, Radio} from 'react-radio-group';
const GraphicsCategory = GraphicsCategoryModel.properties;
const location = '/files/thumb/';
import View from './View';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const MOVE_CATEGORY_TO_OTHER_CATEGORY = 'MOVE_CATEGORY_TO_OTHER_CATEGORY';
const DELETE_GRAPHICS = 'DELETE_GRAPHICS';
const MOVE_GRAPHICS_TO_OTHER_CATEGORY = 'MOVE_GRAPHICS_TO_OTHER_CATEGORY';

export default class extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    objectHolder: PropTypes.object,
    status: PropTypes.string.isRequired,
    selectRow: PropTypes.func.isRequired,
    enableEditing: PropTypes.func.isRequired,
    enableCreating: PropTypes.func.isRequired,
    enableDefaultStatus: PropTypes.func.isRequired,
    createEntity: PropTypes.func.isRequired,
    editEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    setEditingObjectProperty: PropTypes.func.isRequired,
    restoreTableState: PropTypes.func.isRequired,
    uploadThumbnail: PropTypes.func.isRequired,
    deleteThumbnail: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    secondaryData: PropTypes.arrayOf(PropTypes.any).isRequired,
    fetchSecondaryData: PropTypes.func.isRequired,
    editSecondaryEntity: PropTypes.func.isRequired,
    deleteSecondaryEntity: PropTypes.func.isRequired
  };
  handleFileUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      const c = this.refs.canvas;
      const image = this.props.objectHolder['thumb'];
      const uploadThumbnail = (file) => {
        this.props.uploadThumbnail(file);
      };
      c.toBlob(function (blob) {
        blob.name = image.name;
        uploadThumbnail(blob);
      }, 'image/*', 0.95);
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
      const ctx = c.getContext("2d");
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
            <h3>for category</h3>
            <RadioGroup name='fruit' selectedValue={this.state.selectedValue}
                        onChange={e => this.handleCategoryActionOption(e)}>
              <div className='form-group'>
                <Radio value={DELETE_CATEGORY}/>&nbsp; Delete all the category linked to this category
              </div>
              <div className='form-group'>
                <Radio value={MOVE_CATEGORY_TO_OTHER_CATEGORY}/>&nbsp; Move category to other category &nbsp;
                <select
                  value={this.state.newGraphicsCategory}
                  onChange={this.handleMoveToCategory}>
                  <option key='rootCategory' value={' '}>Root category</option>
                  {this.props.data.map((cg, key) => (
                    this.props.objectHolder[ID_PROP] !== cg.id ?
                      this.props.objectHolder[ID_PROP] !== cg.graphicsCategoryId ?
                        <option key={key} value={cg.id}>{cg.name}</option> :
                        <option disabled='disabled' key={key} value={cg.id}>{cg.name} </option> : null
                  ))}
                </select>
              </div>
            </RadioGroup>
          </div>
          <div className='form-group'>
            <h3>for graphics</h3>
            <RadioGroup name='fruit2' selectedValue={this.state.selectedSecondaryValue}
                        onChange={e => this.handleGraphicActionOption(e)}>
              <div className='form-group'>
                <Radio value={DELETE_GRAPHICS}/>&nbsp; Delete all the graphics linked to this category
              </div>
              <div className='form-group'>
                <Radio value={MOVE_GRAPHICS_TO_OTHER_CATEGORY}/>&nbsp; Move graphics to other category &nbsp;
                <select
                  value={this.state.newGraphic}
                  onChange={this.handleMoveGraphicToCategory}>
                  {this.props.data.map((cg, key) => (
                    this.props.objectHolder[ID_PROP] !== cg.id ?
                      <option key={key} value={cg.id}>{cg.name}</option> : null
                  ))}
                </select>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    );
  };

  handleDeleteBtnClick = (confirmed) => {
    if (this.props.status === STATUS_CONFIRM_DELETE) {
      this.props.fetchData();
      if (confirmed) {
        if (this.state.selectedValue === DELETE_CATEGORY) {
          this.props.data.map(c => {
            if (c.graphicsCategoryId === this.props.objectHolder.id) {
              this.props.deleteEntity(c.id, this.props.token);
              this.props.deleteThumbnail(c.thumb);
            }
          });
        } else if (this.state.selectedValue === MOVE_CATEGORY_TO_OTHER_CATEGORY) {
          this.props.data.map(c => {
            if (c.graphicsCategoryId === this.props.objectHolder.id) {
              this.props.editEntity(c.id, {...c, graphicsCategoryId: this.state.newGraphicsCategory}, this.props.token);
            }
          });
        }
        if (this.state.selectedSecondaryValue === DELETE_GRAPHICS) {
          this.props.secondaryData.map(c => {
            if (c.categoryId === this.props.objectHolder.id) {
              this.props.deleteEntity(c.id, this.props.token);
            }
          });
        } else if (this.state.selectedSecondaryValue === MOVE_GRAPHICS_TO_OTHER_CATEGORY) {
          this.props.secondaryData.map(c => {
            if (c.categoryId === this.props.objectHolder.id) {
              this.props.editSecondaryEntity(c.id, {...c, categoryId: this.state.newGraphic}, this.props.token);
            }
          });
        }
        this.props.deleteEntity(this.props.objectHolder.id, this.props.token);
        this.props.deleteThumbnail(this.props.objectHolder.thumb);
        this.props.enableDefaultStatus();
        this.props.restoreTableState(GraphicsCategory);
      }
    }
  };

  handleCategoryActionOption = option => {
    this.setState({...this.state, selectedValue: option});
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
        <button type='button' className='btn btn-danger'
                onClick={() => this.handleDeleteBtnClick(true)}>Delete
        </button>
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

  render() {
    return (
      <View {...this.props} objectSample={GraphicsCategory} sortingSupport={true}
            hiddenProperties={['id', 'graphicsCategoryId']}
            hiddenInputs={['id', 'graphicsCategoryId', 'thumb']}
            representations={{
              name: {
                getElem: val =>
                  val,
                sortable: true
              },
              thumb: {
                getElem: val => <img src={location + val} alt='thumb' style={{width: 100}}/>,
                sortable: false
              },
            }}
            changedInputs={{
              thumb: {
                saveF: this.handleFileUpload
              }
            }
            }
            customInputs={{
              thumb: {
                elem: <div>
                  <input type='file' className='form-control' accept='image/*'
                         onChange={e => this.handleFileChoose('thumb', e)}/>

                  {typeof(this.props.objectHolder['thumb']) === 'string' && this.props.status === STATUS_EDITING ?
                    <div style={{float: 'left'}}><img
                      style={{marginTop: 3}} src={location + this.props.objectHolder['thumb']}/>
                    </div>
                    : null}
                  <div style={{float: 'left'}}>
                    <canvas style={{marginTop: 3}} ref='canvas' width='100' height='100'/>
                  </div>
                </div>,
                required: true
              },
              category: {
                elem: <select className='form-control'
                              onChange={e => this.handleSelectedObjectChange('graphicsCategoryId', e)}
                              value={this.props.objectHolder['graphicsCategoryId']}>
                  <option key='rootCategory' value={' '}>Root category</option>
                  {this.props.data.map((cg, key) => (
                    this.props.objectHolder[ID_PROP] !== cg.id ?
                      this.props.objectHolder[ID_PROP] !== cg.graphicsCategoryId ?
                        <option key={key} value={cg.id}>{cg.name}</option> :
                        <option disabled='disabled' key={key} value={cg.id}>{cg.name} </option> : null
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
