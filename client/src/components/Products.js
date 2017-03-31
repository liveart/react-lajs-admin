import React, {Component, PropTypes} from 'react';
import View from './View';
import * as ProductModel from '../../../common/models/product.json';
import {
  STATUS_EDITING,
  STATUS_CREATING,
  STATUS_DEFAULT,
  RELATIVE_URL,
  PRODUCT_THUMB_FOLDER,
  PRODUCT_IMG_FOLDER,
  SIZES
} from '../definitions';
const Product = ProductModel.properties;
import * as LocationModel from '../../../common/models/location.json';
const Location = LocationModel.properties;
import * as _ from 'lodash';
import Select, {Creatable} from 'react-select';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
const locationImage = 'files/productImages/';

export default class ProductsComponent extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    addNotification: PropTypes.func.isRequired,
    fetchColors: PropTypes.func.isRequired,
    colors: PropTypes.arrayOf(PropTypes.object),
    colorsLoading: PropTypes.bool.isRequired,
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
    productsCategories: PropTypes.array.isRequired,
    uploadProductImage: PropTypes.func.isRequired,
    uploadProductThumb: PropTypes.func.isRequired,
    fetchProductsCategories: PropTypes.func.isRequired,
    token: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {newColorizables: [], newColors: [], imgUrl: '', location: -1};
    if (!Array.prototype.remove) {
      Array.prototype.remove = function (from, to) {
        const rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
      };
    }
  }

  componentWillMount() {
    this.props.fetchProductsCategories();
  }

  componentWillReceiveProps(props) {
    if (this.props.status === STATUS_DEFAULT && (props.status === STATUS_CREATING || props.status === STATUS_EDITING)) {
      this.props.fetchColors();
    }
  }

  handleSelectedObjectArrayChange = (arrName, ind, propName, event) => {
    const arr = this.props.objectHolder[arrName];
    (arr[ind])[propName] = event.target.value;
    this.props.setEditingObjectProperty(arrName, [...arr]);
  };

  handleSelectedObjectArrayAddNew = (arrName, obj) => {
    let arr = this.props.objectHolder[arrName];
    if (typeof arr !== 'object') {
      arr = [];
    }
    arr[arr.length] = {...obj};
    this.props.setEditingObjectProperty(arrName, [...arr]);
  };

  changeNestedHolderArrValue = (topArrPropName, topInd, changingArrPropName, changingArrInd, value) => {
    const topArr = this.props.objectHolder[topArrPropName];
    ((topArr[topInd])[changingArrPropName])[changingArrInd] = value;
    this.props.setEditingObjectProperty(topArrPropName, [...topArr]);
  };

  changeLocationsNestedArrValue = (changingArrPropName, changingArrInd, value) =>
    this.changeNestedHolderArrValue('locations', this.state.location, changingArrPropName, changingArrInd, value);

  changeNestedHolderValue = (topArrPropName, topInd, changingPropName, value) => {
    const topArr = this.props.objectHolder[topArrPropName];
    ((topArr[topInd])[changingPropName]) = value;
    this.props.setEditingObjectProperty(topArrPropName, [...topArr]);
  };

  changeLocationsNestedHolderValue = (changingPropName, value) =>
    this.changeNestedHolderValue('locations', this.state.location, changingPropName, value);

  handleSelectedObjectArrayDeleteElement = (arrName, key) => {
    const arr = this.props.objectHolder[arrName];
    arr.remove(key);
    this.props.setEditingObjectProperty(arrName, [...arr]);
  };

  handleSelectedObjectArrayArrayAddNew = (fArr, sArr, colorizableKey, obj) => {
    let arr = (this.props.objectHolder[fArr]);
    if (typeof (arr[colorizableKey])[sArr] !== 'object') {
      (arr[colorizableKey])[sArr] = [];
    }
    ((arr[colorizableKey])[sArr])[(arr[colorizableKey])[sArr].length] = {...obj};
    this.props.setEditingObjectProperty(fArr, [...arr]);
  };

  handleSelectedObjectArrayArrayDeleteElement = (fArr, sArr, colorizableKey, key) => {
    const arr = (this.props.objectHolder[fArr]);
    ((arr[colorizableKey])[sArr]).remove(key);
    this.props.setEditingObjectProperty(fArr, [...arr]);
  };

  handleSelectedObjectArrayArrayChange = (fArrName, sArrName, fInd, sInd, propName, event) => {
    const colorizables = this.props.objectHolder[fArrName];
    if (propName === 'image') {
      ((((colorizables[fInd])[sArrName])[sInd])[propName]) = event.target.files[0].name;
    } else {
      ((((colorizables[fInd])[sArrName])[sInd])[propName]) = event.target.value;
    }
    this.props.setEditingObjectProperty(fArrName, [...colorizables]);
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  handleSelectedObjectDataChange = (prop, propertyName, event) => {
    const object = this.props.objectHolder[prop];
    object[propertyName] = event.target.value;
    this.props.setEditingObjectProperty(prop, object);
  };

  toCanvas = prop => {
    const image = this.props.objectHolder[prop];
    const img = new Image();
    let imageOut = new Image();
    const reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
    };
    reader.readAsDataURL(image);
    const c = this.refs.canvas;
    const ctx = c.getContext('2d');
    img.onload = function () {
      imageOut = ctx.drawImage(img, 0, 0, 100, 100);
    };
  };

  handleFileChoose = (prop, e) => {
    this.props.setEditingObjectProperty(prop, e.target.files[0]);
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      if (prop === 'image') {
        const image = this.props.objectHolder['image'];
        const reader = new FileReader();
        reader.onloadend = () => {
          this.setState({
            ...this.state,
            imgUrl: reader.result
          });
        };
        reader.readAsDataURL(image);
      }
      if (prop === 'thumbUrl') {
        this.toCanvas(prop);
      }
    }
  };

  handleLocationsNestedFileChoose = (prop, e) => {
    const locs = [...this.props.objectHolder['locations']];
    (locs[this.state.location])[prop] = e.target.files[0];
    this.props.setEditingObjectProperty('locations', locs);
  };

  handleImageUpload = file => {
    this.props.uploadProductImage(file);
  };

  handleThumbUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      const image = this.props.objectHolder['thumbUrl'];
      const uploadThumbnail = (file) => {
        this.props.uploadProductThumb(file);
      };
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

  getOptions = () => {
    if (!this.props.colorsList || !this.props.colorsList.length) {
      return [];
    }

    return this.props.colorsList;
  };

  getSelectedOptions = key => {
    if (!this.props.objectHolder['_colors'] || !this.props.objectHolder['_colors'].length) {
      return [];
    }

    if (this.props.objectHolder['_colors'][key]) {
      return this.props.objectHolder['_colors'][key];
    }

  };


  onColorsSelectChange = (val, key) => {
    const arr = this.props.objectHolder['_colors'];
    if (val) {
      (arr[key])['name'] = val.name;
      (arr[key])['value'] = val.value;
      this.props.setEditingObjectProperty('_colors', [...arr]);
    }
  };


  renderColorsTable = () => (
    <div className='panel panel-default'>
      <table className='table table-bordered'>
        <thead>
        <tr>
          <th>Color</th>
          <th>Locations</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {this.props.objectHolder._colors ?
          this.props.objectHolder._colors.map((c, key) =>
            <tr key={key}>
              <td className='col-md-4'>
                <Select
                  name='colors'
                  value={this.getSelectedOptions(key)}
                  multi={false}
                  labelKey='name'
                  options={this.getOptions()}
                  onChange={os => this.onColorsSelectChange(os, key)}
                  isLoading={this.props.colorsLoading}
                />
              </td>
              <td className='col-md-8'>
                <div className='panel panel-default'>
                  <table className='table'>
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>Image</th>
                      <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {c._locations.map((col, k) => (
                      <tr key={k}>
                        <td><input type='text' className='form-control'
                                   value={col.name}
                                   onChange={e =>
                                     this.handleSelectedObjectArrayArrayChange('_colors', '_locations', key, k, 'name', e)}/>
                        </td>
                        <td><input type='file' className='form-control' accept='image/*'
                                   onChange={e =>
                                     this.handleSelectedObjectArrayArrayChange('_colors', '_locations', key, k, 'image', e)}/>

                        </td>
                        <td><a className='btn btn-danger btn-xs' href='#'
                               onClick={() => this.deleteLocationRow(key, k)}>
                          <i className='fa fa-ban'/></a></td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                  <div className='panel-footer'>
                    <a className='btn btn-primary btn-xs' href='#' onClick={() => this.addLocationRow(key)}>
                      <i className='fa fa-plus'/> Add location</a>
                  </div>
                </div>
              </td>
              <td><a className='btn btn-danger btn-xs' href='#' onClick={() => this.deleteColorsRow(key)}>
                <i className='fa fa-ban'/></a></td>
            </tr>) : null}
        </tbody>
      </table>
      <div className='panel-footer'>
        <a className='btn btn-primary btn-xs' href='#' onClick={() => this.addColorsRow()}>
          <i className='fa fa-plus'/> Add color</a>
      </div>
    </div>
  );

  renderColorizableTable = () => (
    <div className='panel panel-default'>
      <table className='table table-bordered'>
        <thead>
        <tr>
          <th>Name</th>
          <th>Id</th>
          <th>Colors</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {this.props.objectHolder.colorizables ?
          this.props.objectHolder.colorizables.map((c, key) =>
            <tr key={key}>
              <td><input type='text' className='form-control'
                         value={c.name}
                         onChange={e => this.handleSelectedObjectArrayChange('colorizables', key, 'name', e)}/>
              </td>
              <td><input type='text' className='form-control'
                         value={c.id}
                         onChange={e => this.handleSelectedObjectArrayChange('colorizables', key, 'id', e)}/>
              </td>
              <td>
                <div className='panel panel-default'>
                  <table className='table'>
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>Value</th>
                      <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {c._colors.map((col, k) => (
                      <tr key={k}>
                        <td><input type='text' className='form-control'
                                   value={col.name}
                                   onChange={e =>
                                     this.handleSelectedObjectArrayArrayChange('colorizables', '_colors', key, k, 'name', e)}/>
                        </td>
                        <td><input type='text' className='form-control'
                                   value={col.value}
                                   onChange={e =>
                                     this.handleSelectedObjectArrayArrayChange('colorizables', '_colors', key, k, 'value', e)}/>

                          <span className='label label-default pull-right'
                                style={{background: col.value}}>{' '}</span></td>
                        <td><a className='btn btn-danger btn-xs' href='#' onClick={() => this.deleteColorRow(key, k)}>
                          <i className='fa fa-ban'/></a></td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                  <div className='panel-footer'>
                    <a className='btn btn-primary btn-xs' href='#' onClick={() => this.addColorRow(key)}>
                      <i className='fa fa-plus'/> Add color</a>
                  </div>
                </div>
              </td>
              <td><a className='btn btn-danger btn-xs' href='#' onClick={() => this.deleteColorizableRow(key)}>
                <i className='fa fa-ban'/></a></td>
            </tr>) : null}
        </tbody>
      </table>
      <div className='panel-footer'>
        <a className='btn btn-primary btn-xs' href='#' onClick={() => this.addColorizableRow()}>
          <i className='fa fa-plus'/> Add element</a>
      </div>
    </div>
  );

  addColorsRow = () => (
    this.handleSelectedObjectArrayAddNew('_colors', {name: '', value: '', _locations: []})
  );

  deleteColorsRow = key => (
    this.handleSelectedObjectArrayDeleteElement('_colors', key)
  );

  addLocationRow = colorId => (
    this.handleSelectedObjectArrayArrayAddNew('_colors', '_locations', colorId, {name: '', image: ''})
  );

  deleteLocationRow = (colorId, key) => (
    this.handleSelectedObjectArrayArrayDeleteElement('_colors', '_locations', colorId, key)
  );

  addColorizableRow = () => (
    this.handleSelectedObjectArrayAddNew('colorizables', {name: '', id: '', _colors: []})
  );

  deleteColorizableRow = key => (
    this.handleSelectedObjectArrayDeleteElement('colorizables', key)
  );

  addColorRow = colorizableId => (
    this.handleSelectedObjectArrayArrayAddNew('colorizables', '_colors', colorizableId, {name: '', value: ''})
  );

  deleteColorRow = (colorizableId, key) => (
    this.handleSelectedObjectArrayArrayDeleteElement('colorizables', '_colors', colorizableId, key)
  );

  getFileUrl = url => {
    if (url.substring(0, RELATIVE_URL.length) === RELATIVE_URL) {
      return url.substring(RELATIVE_URL.length);
    }
    return url;
  };

  getName = (obj, url) => {
    if (typeof obj === 'object') {
      return RELATIVE_URL + '/' + url + obj.name;
    }

    return undefined;
  };

  getSizeOptions = () => {
    if (!SIZES || !SIZES.length) {
      return [];
    }

    return _.map(SIZES, col => ({value: col, name: col}));
  };

  getSelectedSizeOptions = () => {
    if (!this.props.objectHolder['sizes'] || !this.props.objectHolder['sizes'].length) {
      return [];
    }

    if (typeof (this.props.objectHolder['sizes'])[0] === 'string') {
      return _.map(this.props.objectHolder['sizes'], col => ({value: col, name: col}));
    }

    return this.props.objectHolder['sizes'];

  };

  crop = e => {
    this.changeLocationsNestedArrValue('editableArea', 0, (e.detail.x).toFixed(2));
    this.changeLocationsNestedArrValue('editableArea', 1, (e.detail.y).toFixed(2));
    this.changeLocationsNestedArrValue('editableArea', 2, (e.detail.x + e.detail.width).toFixed(2));
    this.changeLocationsNestedArrValue('editableArea', 3, (e.detail.y + e.detail.height).toFixed(2));
  }

  onSizeSelectChange = val => {
    const arr = [];
    if (val) {
      _.forEach(val, v => arr.push(v.name));
      this.props.setEditingObjectProperty('sizes', arr);
    }
  };

  getLocationsInputValue = propertyName => {
    if (this.state.location < 0 || !this.props.objectHolder['locations'] ||
      !this.props.objectHolder['locations'].length) {
      return '';
    }
    return ((this.props.objectHolder['locations'])[this.state.location])[propertyName];
  };

  render() {
    return (
      <View {...this.props} objectSample={{...Product, colorizables: [], _colors: [], locations: []}}
            sortingSupport={true}
            hiddenProperties={['id', '_colors', 'colorize', 'locations',
              'colorizableElements', 'multicolor', 'description', 'colorizables', 'minDPU', 'minQuantity',
              'namesNumbersEnabled', 'hideEditableAreaBorder', 'namesNumbersEnabled', 'pantones', 'resizable',
              'editableAreaSizes', 'showRuler', 'template', 'data', 'sizes']}
            hiddenInputs={['id', 'categoryId', 'thumbUrl', 'data', 'pantones']}
            representations={{
              thumbUrl: {
                getElem: val =>
                  val ? <a href={this.getFileUrl(val)} className='thumbnail'
                           style={{width: 100}}><img
                    src={this.getFileUrl(val)} alt='thumb'
                    style={{width: 100}}/></a> :
                    null,
                sortable: false,
                header: 'Thumb'
              },
              categoryId: {
                getElem: val => {
                  let cat = this.props.productsCategories.find(c => String(c.id) === val);
                  if (cat) {
                    return cat.name;
                  }

                  return null;
                },
                sortable: true,
                sortElem: <select className='form-control'
                                  value={this.props.objectHolder['categoryId']}
                                  onChange={e => this.handleSelectedObjectChange('categoryId', e)}>
                  <option key='any' value=''>...</option>
                  {this.props.productsCategories.map(cat => <option key={cat.id}
                                                                    value={cat.id}>{cat.name}</option>)}
                </select>,
                header: 'Category'
              }
            }}
            changedInputs={{
              thumbUrl: {
                saveF: this.handleThumbUpload,
                getName: obj => this.getName(obj, PRODUCT_THUMB_FOLDER)
              },
              locations: {
                elem: <div>
                  <div className='row' style={{marginBottom: 6}}>
                    <div className='col-lg-12'>
                      <Creatable
                        name='location'
                        className='onTop'
                        placeholder={this.props.objectHolder['locations'] && this.props.objectHolder['locations'].length ?
                          _.map(this.props.objectHolder['locations'], 'name').join(', ') :
                          'No locations linked. Type a name to add location...'}
                        noResultsText='No locations currently linked...'
                        labelKey='name'
                        valueKey='name'
                        value={this.state.location > -1 && this.props.objectHolder['locations'] &&
                        this.props.objectHolder['locations'].length ?
                          (this.props.objectHolder['locations'])[this.state.location] : null}
                        options={this.props.objectHolder['locations'] && this.props.objectHolder['locations'].length ?
                          this.props.objectHolder['locations'] : []}
                        onNewOptionClick={val => {
                          let obj = {};
                          for (let p in Location) {
                            if (Location[p].type === 'array') {
                              obj[p] = [];
                            } else {
                              obj[p] = '';
                            }
                          }
                          this.props.setEditingObjectProperty('locations', [...this.props.objectHolder['locations'],
                            {...obj, name: val.name}]);
                          this.setState({
                            ...this.state, location: _.findIndex(this.props.objectHolder['locations'],
                              loc => loc.name === val.name)
                          });
                        }}
                        onChange={val => {
                          if (!val) {
                            this.setState({
                              ...this.state, location: -1
                            });
                            return;
                          }
                          this.setState({
                            ...this.state, location: _.findIndex(this.props.objectHolder['locations'],
                              loc => loc.name === val.name)
                          })
                        }}
                      />
                    </div>
                  </div>
                  {this.state.location < 0 ||
                  !this.props.objectHolder['locations'] || !this.props.objectHolder['locations'].length ? null :
                    <div className='panel panel-default'>
                      <div className='panel-body'>
                        <div className='row'>
                          <div className='col-lg-4'>

                            <div className='row' style={{marginBottom: 6}}>
                              <div className='col-lg-12'>
                                <div className='input-group input-group-sm'>
                                  <span className='input-group-addon'>Name</span>
                                  <input type='text' className='form-control'
                                         onChange={e => this.changeLocationsNestedHolderValue('name', e.target.value)}
                                         value={this.getLocationsInputValue('name')}/>
                                </div>
                              </div>
                            </div>

                            <div className='row' style={{marginBottom: 6}}>
                              <div className='col-lg-12'>
                                <div className='input-group input-group-sm'>
                                  <span className='input-group-addon'>Mask</span>
                                  <input type='file' className='form-control'
                                         onChange={e => this.handleLocationsNestedFileChoose('mask', e)}/>
                                </div>
                              </div>
                            </div>

                            <div className='row' style={{marginBottom: 6}}>
                              <div className='col-lg-12'>
                                <div className='input-group input-group-sm'>
                                  <span className='input-group-addon'>Overlay</span>
                                  <input type='file' className='form-control'
                                         onChange={e => this.handleLocationsNestedFileChoose('overlayInfo', e)}/>
                                </div>
                              </div>
                            </div>

                            <div className='row' style={{marginBottom: 6}}>
                              <div className='col-lg-6'>
                                <div className='input-group input-group-sm'>
                                  <span className='input-group-addon'>Width</span>
                                  <input type='text' className='form-control'
                                         onChange={e =>
                                           this.changeLocationsNestedArrValue('editableAreaUnits', 0, e.target.value)}
                                         value={this.getLocationsInputValue('editableAreaUnits')[0]}/>
                                </div>
                              </div>
                              <div className='col-lg-6'>
                                <div className='input-group input-group-sm'>
                                  <span className='input-group-addon'>Height</span>
                                  <input type='text' className='form-control'
                                         onChange={e =>
                                           this.changeLocationsNestedArrValue('editableAreaUnits', 1, e.target.value)}
                                         value={this.getLocationsInputValue('editableAreaUnits')[1]}/>
                                </div>
                              </div>
                            </div>

                            <div className='row' style={{marginBottom: 6}}>
                              <div className='col-lg-12'>
                                <div className='panel panel-default'>
                                  <div className='panel panel-heading'>
                                    Units Range
                                  </div>
                                  <div className='panel panel-body'>
                                    <div className='input-group input-group-sm'>
                                      <input type='text' className='form-control'/>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='row' style={{marginBottom: 6}}>
                              <div className='col-lg-6'>
                                <div className='input-group input-group-sm'>
                                  <span className='input-group-addon'>x0</span>
                                  <input type='text' className='form-control'
                                         onChange={e => {
                                           if (this.cropper) {
                                             this.cropper.setData({
                                               x: Number(event.target.value)
                                             });
                                           }
                                           this.changeLocationsNestedArrValue('editableArea', 0, e.target.value)
                                         }}
                                         value={this.getLocationsInputValue('editableArea')[0]}/>
                                </div>
                              </div>
                              <div className='col-lg-6'>
                                <div className='input-group input-group-sm'>
                                  <span className='input-group-addon'>x1</span>
                                  <input type='text' className='form-control'
                                         onChange={e =>
                                           this.changeLocationsNestedArrValue('editableArea', 2, e.target.value)}
                                         value={this.getLocationsInputValue('editableArea')[2]}/>
                                </div>
                              </div>
                            </div>
                            <div className='row' style={{marginBottom: 6}}>
                              <div className='col-lg-6'>
                                <div className='input-group input-group-sm'>
                                  <span className='input-group-addon'>y0</span>
                                  <input type='text' className='form-control'
                                         onChange={e =>
                                           this.changeLocationsNestedArrValue('editableArea', 1, e.target.value)}
                                         value={this.getLocationsInputValue('editableArea')[1]}/>
                                </div>
                              </div>
                              <div className='col-lg-6'>
                                <div className='input-group input-group-sm'>
                                  <span className='input-group-addon'>y1</span>
                                  <input type='text' className='form-control'
                                         onChange={e =>
                                           this.changeLocationsNestedArrValue('editableArea', 3, e.target.value)}
                                         value={this.getLocationsInputValue('editableArea')[3]}/>
                                </div>
                              </div>
                            </div>
                            <div className='row' style={{marginBottom: 6}}>
                              <div className='col-lg-12'>
                                <Select
                                  name='rotation'
                                  placeholder='Restrict rotation...'
                                  searchable={false}
                                  options={[{value: false, label: 'Rotation restricted'},
                                    {value: true, label: 'Rotation allowed'}]}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-8'>
                            <div className="panel panel-default">
                              <Cropper
                                ref={cr => this.cropper = cr}
                                src='https://pp.userapi.com/c636816/v636816840/3496e/5f548Gc89_0.jpg'
                                style={{height: 400, width: '100%'}}
                                guides={false}
                                zoomable={false}
                                crop={this.crop}
                                viewMode={3}
                              />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>}
                </div>
              },
              description: {
                elem: <textarea className='form-control' rows='3'
                                value={this.props.objectHolder['description']}
                                onChange={e => this.handleSelectedObjectChange('description', e)}>
              </textarea>
              },
              sizes: {
                elem: <Creatable
                  name='sizes'
                  value={this.getSelectedSizeOptions()}
                  multi={true}
                  labelKey='name'
                  options={this.getSizeOptions()}
                  onChange={this.onSizeSelectChange}
                />
              },
              colorize: {
                elem: <select className='form-control'
                              value={this.props.objectHolder['colorize']}
                              onChange={e => this.handleSelectedObjectChange('colorize', e)}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              },
              multicolor: {
                elem: <select className='form-control'
                              value={this.props.objectHolder['multicolor']}
                              onChange={e => this.handleSelectedObjectChange('multicolor', e)}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              },
              colorizables: {
                elem: this.renderColorizableTable()
              },
              _colors: {
                elem: this.renderColorsTable(),
                saveF: this.handleImageUpload
              },
              hideEditableAreaBorder: {
                elem: <select className='form-control'
                              value={this.props.objectHolder['hideEditableAreaBorder']}
                              onChange={e => this.handleSelectedObjectChange('hideEditableAreaBorder', e)}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              },
              namesNumbersEnabled: {
                elem: <select className='form-control'
                              value={this.props.objectHolder['namesNumbersEnabled']}
                              onChange={e => this.handleSelectedObjectChange('namesNumbersEnabled', e)}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              },
              resizable: {
                elem: <select className='form-control'
                              value={this.props.objectHolder['resizable']}
                              onChange={e => this.handleSelectedObjectChange('resizable', e)}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              },
              showRuler: {
                elem: <select className='form-control'
                              value={this.props.objectHolder['showRuler']}
                              onChange={e => this.handleSelectedObjectChange('showRuler', e)}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              },
            }
            }
            customInputs={{
              price: {
                elem: <input type='text' className='form-control'
                             value={this.props.objectHolder['data'] ? this.props.objectHolder['data'].price : ''}
                             onChange={e => this.handleSelectedObjectDataChange('data', 'price', e)}/>
              },
              material: {
                elem: <input type='text' className='form-control'
                             value={this.props.objectHolder['data'] ? this.props.objectHolder['data'].material : ''}
                             onChange={e => this.handleSelectedObjectDataChange('data', 'material', e)}/>
              },
              useForDecoration: {
                elem: <select className='form-control'
                              value={this.props.objectHolder['pantones'] ? this.props.objectHolder['pantones'].useForDecoration : ''}
                              onChange={e => this.handleSelectedObjectDataChange('pantones', 'useForDecoration', e)}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              },
              useForProduct: {
                elem: <select className='form-control'
                              value={this.props.objectHolder['pantones'] ? this.props.objectHolder['pantones'].useForProduct : ''}
                              onChange={e => this.handleSelectedObjectDataChange('pantones', 'useForProduct', e)}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              },
              thumb: {
                elem: <div>
                  <input type='file' className='form-control' accept='image/*'
                         onChange={e => this.handleFileChoose('thumbUrl', e)}/>

                  {typeof (this.props.objectHolder['thumbUrl']) === 'string' && this.props.status === STATUS_EDITING ?
                    <div style={{float: 'left'}}><a href={this.getFileUrl(this.props.objectHolder['thumbUrl'])}
                                                    className='thumbnail'
                                                    style={{marginTop: 8, width: 100}}><img
                      style={{width: 100}} src={this.getFileUrl(this.props.objectHolder['thumbUrl'])}/>
                    </a>
                    </div>
                    : null}
                  <div style={{float: 'left'}}>
                    {this.props.status === STATUS_CREATING && !this.props.objectHolder['thumbUrl'] ?
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
                              onChange={e => this.handleSelectedObjectChange('categoryId', e)}>
                  <option key='defGroup' value={undefined}>Choose category...</option>
                  {this.props.productsCategories.map((gc, key) => (
                    <option key={key} value={gc.id}>{gc.name}</option>
                  ))}
                </select>,
                required: true
              }
            }}
      />
    )
      ;
  }

}
