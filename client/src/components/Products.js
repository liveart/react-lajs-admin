import React, {Component, PropTypes} from 'react';
import View from './View/View';
import * as ProductModel from '../../../common/models/product.json';
import {
  STATUS_EDITING,
  STATUS_CREATING,
  STATUS_DEFAULT,
  RELATIVE_URL,
  PRODUCT_THUMB_FOLDER,
  PRODUCT_IMG_FOLDER,
  PRODUCT_LOCATION_IMAGE_FOLDER,
  PRODUCT_LOCATION_MASK_FOLDER,
  PRODUCT_LOCATION_OVERLAY_FOLDER,
  SIZES,
  PRODUCT_TEMPLATES_FOLDER
} from '../definitions';
const LEAVE_URL_OPTION = 'Import';
const ASSIGN_GROUP = 'Assign Color Group';
const ADD_COLOR = 'Add Individual Colors';
const COLORS_OPTIONS = ['Assign Color Group', 'Add Individual Colors'];
const Product = ProductModel.properties;

import {parseJson} from '../ProductJsonParser';
import Locations from './Locations';
import * as _ from 'lodash';
import Select, {Creatable} from 'react-select';
import 'cropperjs/dist/cropper.css';

export default class ProductsComponent extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    addNotification: PropTypes.func.isRequired,
    fetchColors: PropTypes.func.isRequired,
    fetchColorgroups: PropTypes.func.isRequired,
    colors: PropTypes.arrayOf(PropTypes.object),
    colorsLoading: PropTypes.bool.isRequired,
    colorgroups: PropTypes.arrayOf(PropTypes.object),
    colorgroupsLoading: PropTypes.bool.isRequired,
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
    createProductsCategory: PropTypes.func.isRequired,
    setEditingObjectProperty: PropTypes.func.isRequired,
    restoreTableState: PropTypes.func.isRequired,
    productsCategories: PropTypes.array.isRequired,
    uploadProductImage: PropTypes.func.isRequired,
    uploadProductThumb: PropTypes.func.isRequired,
    uploadProductLocationMask: PropTypes.func.isRequired,
    uploadProductLocationOverlay: PropTypes.func.isRequired,
    uploadProductLocationImage: PropTypes.func.isRequired,
    fetchProductsCategories: PropTypes.func.isRequired,
    token: PropTypes.string,
    uploadProductTemplate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {newColorizables: [], newColors: [], imgUrl: ''};
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
      this.props.fetchColorgroups();
      if (this.state.location > -1) {
        this.setState({
          ...this.state, location: -1
        });
      }
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

  handleSelectedObjectAddNewArray = (fArr, sArr, key, obj) => {
    let arr = (this.props.objectHolder[fArr]);
    if (typeof (arr[key])[sArr] !== 'object') {
      (arr[key])[sArr] = [];
    }
    ((arr[key])[sArr])[(arr[key])[sArr].length] = [...obj];
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
      colorizables[fInd][sArrName][sInd][propName] = event.target.files[0];
    } else if (sArrName === 'editableAreaUnitsRange') {
      colorizables[fInd][sArrName][sInd][propName] = Number(event.target.value);
    } else {
      colorizables[fInd][sArrName][sInd][propName] = event.target.value;
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
      imageOut = ctx.drawImage(img, 0, 0, 110, 110);
    };
  };

  handleFileChoose = (prop, e) => {
    this.props.setEditingObjectProperty(prop, e.target.files[0]);
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      if (prop === 'image') {
        const image = this.props.objectHolder.image;
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

  handleImageUpload = file => {
    this.props.uploadProductImage(file);
  };

  handleThumbUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      const image = this.props.objectHolder.thumbUrl;
      const uploadThumbnail = file => {
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
  getColorgroupsOptions = () => {
    if (!this.props.colorgroups || !this.props.colorgroups.length) {
      return [];
    }

    return this.props.colorgroups;
  };

  getColorizableColorsOptions = () => {
    return [{value: false, name: ADD_COLOR}, {value: true, name: ASSIGN_GROUP}];
  };

  getColorsLocationsOptions = () => {
    if (!this.props.objectHolder.locations || !this.props.objectHolder.locations.length) {
      return [];
    }
    return _.map(this.props.objectHolder.locations, l => ({name: l.name, value: l.name}));
  };

  getSelectedOptions = key => {
    if (!this.props.objectHolder.colors || !this.props.objectHolder.colors.length) {
      return [];
    }

    if (this.props.objectHolder.colors[key]) {
      return {name: this.props.objectHolder.colors[key].name, value: this.props.objectHolder.colors[key].value};
    }
  };

  getSelectedColorizableColorsOptions = (key) => {
    if (!this.props.objectHolder.colorizables[key]._colors || !this.props.objectHolder.colorizables[key]._colors.length) {
      return [];
    }
    let arr = this.props.objectHolder.colorizables;
    if (arr[key]._colors) {
      return _.map(arr[key]._colors, col => ({value: col.value, name: col.name}));
    }
  };
  getSelectedColorizableOptions = (key) => {
    let arr = this.props.objectHolder.colorizables;
    if (!arr[key].assignColorgroup) {
      return {value: arr[key].assignColorgroup, name: ADD_COLOR};
    } else {
      return {value: arr[key].assignColorgroup, name: ASSIGN_GROUP};
    }
  };

  getSelectedColorizableColorgroupOptions = (key) => {
    if (!this.props.objectHolder.colorizables[key].colorgroup) {
      return {};
    }
    let arr = this.props.objectHolder.colorizables;
    if (arr[key].colorgroup) {
      return {id: arr[key].colorgroup.id, name: arr[key].colorgroup.name};
    }
  };

  getSelectedColorLocationsOptions = (key, k) => {
    if (!this.props.objectHolder.colors[key]._locations[k]) {
      return {};
    }
    let arr = this.props.objectHolder.colors;
    console.log(arr[key]._locations[k]);
    return {name: arr[key]._locations[k].name};

  };


  onColorsSelectChange = (val, key) => {
    const arr = this.props.objectHolder.colors;
    if (val) {
      arr[key].name = val.name;
      arr[key].value = val.value;
      this.props.setEditingObjectProperty('colors', [...arr]);
    }
  };
  onColorizableColorsSelectChange = (val, key) => {
    let colorizables = this.props.objectHolder.colorizables;
    let colors = [];
    if (val) {
      _.forEach(val, v => colors.push({name: v.name, value: v.value}));
      colorizables[key]._colors = colors;
      this.props.setEditingObjectProperty('colorizables', colorizables);
    }
  };
  onColorizableColorgroupSelectChange = (val, key) => {
    let colorizables = this.props.objectHolder.colorizables;
    if (val) {
      colorizables[key].colorgroup = {name: val.name, id: val.id};
      this.props.setEditingObjectProperty('colorizables', colorizables);
    }
  };

  getNameFromUrl = name => {
    if (typeof name === 'string') {
      return name.substring(name.lastIndexOf('/') + 1);
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
        {this.props.objectHolder.colors ?
          this.props.objectHolder.colors.map((c, key) =>
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
                    {c._locations ? c._locations.map((col, k) => (
                      <tr key={k}>
                        <td>
                          <Select style={{marginBottom: 6}}
                                  name='locations'
                                  value={this.getSelectedColorLocationsOptions(key, k)}
                                  multi={false}
                                  labelKey='name'
                                  options={this.getColorsLocationsOptions()}
                                  onChange={os => this.handleColorLocationActionOption(os, key, k)}
                                  clearable={false}
                          />
                        </td>
                        <td>
                          <input type='file' className='form-control' accept='image/*'
                                 onChange={e =>
                                   this.handleSelectedObjectArrayArrayChange('colors', '_locations', key, k, 'image', e)}/>
                          {typeof (col.image) === 'string' ?
                            <a href={this.getFileUrl(col.image)}>{this.getNameFromUrl(col.image)}</a> : null
                          }  </td>
                        <td><a className='btn btn-danger btn-xs' href='#'
                               onClick={() => this.deleteLocationRow(key, k)}>
                          <i className='fa fa-ban'/></a></td>
                      </tr>
                    )) : null}
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

  handleColorActionOption = (option, key) => {
    let colorizables = this.props.objectHolder.colorizables;
    colorizables[key].assignColorgroup = option.value;
    this.props.setEditingObjectProperty('colorizables', colorizables);
  };
  handleColorLocationActionOption = (option, key, k) => {
    let colors = this.props.objectHolder.colors;
    colors[key]._locations[k].name = option.value;
    this.props.setEditingObjectProperty('colors', colors);
  };

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
              <td className='col-md-4'><input type='text' className='form-control'
                                              value={c.name}
                                              onChange={e => this.handleSelectedObjectArrayChange('colorizables', key, 'name', e)}/>
              </td>
              <td className='col-md-4'><input type='text' className='form-control'
                                              value={c.id}
                                              onChange={e => this.handleSelectedObjectArrayChange('colorizables', key, 'id', e)}/>
              </td>
              <td className='col-md-4'>
                <Select style={{marginBottom: 6}}
                        name='colors'
                        value={this.getSelectedColorizableOptions(key)}
                        multi={false}
                        labelKey='name'
                        options={this.getColorizableColorsOptions()}
                        onChange={os => this.handleColorActionOption(os, key)}
                        clearable={false}
                />
                {!c.assignColorgroup ?
                  <Creatable
                    name='colors'
                    value={this.getSelectedColorizableColorsOptions(key)}
                    multi={true}
                    labelKey='name'
                    options={this.getOptions()}
                    onChange={os => this.onColorizableColorsSelectChange(os, key)}
                    isLoading={this.props.colorsLoading}
                  /> : <Select
                    name='colorgroup'
                    value={this.getSelectedColorizableColorgroupOptions(key)}
                    multi={false}
                    labelKey='name'
                    options={this.getColorgroupsOptions()}
                    onChange={os => this.onColorizableColorgroupSelectChange(os, key)}
                    isLoading={this.props.colorgroupsLoading}
                  /> }
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
    this.handleSelectedObjectArrayAddNew('colors', {name: '', value: '', _locations: []})
  );

  deleteColorsRow = key => (
    this.handleSelectedObjectArrayDeleteElement('colors', key)
  );

  addEditableAreaSizeRow = () => (
    this.handleSelectedObjectArrayAddNew('editableAreaSizes', {label: '', width: 0, height: 0})
  );

  deleteEditableAreaSizeRow = key => (
    this.handleSelectedObjectArrayDeleteElement('editableAreaSizes', key)
  );

  addLocationRow = colorId => (
    this.handleSelectedObjectArrayArrayAddNew('colors', '_locations', colorId, {name: '', image: ''})
  );

  deleteLocationRow = (colorId, key) => (
    this.handleSelectedObjectArrayArrayDeleteElement('colors', '_locations', colorId, key)
  );

  addColorizableRow = () => (
    this.handleSelectedObjectArrayAddNew('colorizables', {
      name: '',
      id: '',
      assignColorgroup: false,
      _colors: [],
      colorgroup: {}
    })
  );

  deleteColorizableRow = key => (
    this.handleSelectedObjectArrayDeleteElement('colorizables', key)
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
    if (!this.props.objectHolder.sizes || !this.props.objectHolder.sizes.length) {
      return [];
    }

    if (typeof (this.props.objectHolder.sizes)[0] === 'string') {
      return _.map(this.props.objectHolder.sizes, col => ({value: col, name: col}));
    }

    return this.props.objectHolder.sizes;
  };

  onSizeSelectChange = val => {
    const arr = [];
    if (val) {
      _.forEach(val, v => arr.push(v.name));
      this.props.setEditingObjectProperty('sizes', arr);
    }
  };

  handleImportJson = (json, baseUrl, urlOption, forceNoBase) => {
    if (!baseUrl.length && !forceNoBase && urlOption !== LEAVE_URL_OPTION) {
      this.props.addNotification('warning', 'Base url is not set',
        'Not setting correct base url will result in broken links.',
        15, f => this.handleImportJson(json, baseUrl, urlOption, true));
      return;
    }
    if (!forceNoBase && urlOption !== LEAVE_URL_OPTION) {
      const r = new RegExp('^(?:[a-z]+:)?//', 'i');
      if (!r.test(baseUrl)) {
        this.props.addNotification('warning', 'The specified base url seems not to have a protocol',
          'Not setting correct base url will result in broken links.',
          15, f => this.handleImportJson(json, baseUrl, urlOption, true));
        return;
      }
    }
    let parsed = parseJson(json, baseUrl);
    try {
      const categories = [...parsed.categories];
      if (categories && categories.length) {
        this.props.createProductsCategory(categories, this.props.token);
      }
      const products = [...parsed.products];
      if (products && products.length) {
        this.props.createEntity(products, this.props.token);
      }
      this.props.enableDefaultStatus();
      this.props.restoreTableState({...Product});
      this.setState({...this.state, json: '', baseUrl: ''});
    } catch (e) {
      this.props.addNotification('error', 'Json structure is invalid.');
    }
  };

  renderEditableAreaSizesTable = () => (
    <div className='panel panel-default'>
      <table className='table table-bordered'>
        <thead>
        <tr>
          <th>Label</th>
          <th>Width</th>
          <th>Height</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {this.props.objectHolder.editableAreaSizes ?
          this.props.objectHolder.editableAreaSizes.map((c, key) =>
            <tr key={key}>
              <td><input type='text' className='form-control'
                         value={c.label}
                         onChange={e =>
                           this.handleSelectedObjectArrayChange('editableAreaSizes', key, 'label', e)}/>
              </td>
              <td><input type='text' className='form-control'
                         value={c.width}
                         onChange={e =>
                           this.handleSelectedObjectArrayChange('editableAreaSizes', key, 'width', e)}/>
              </td>
              <td><input type='text' className='form-control'
                         value={c.height}
                         onChange={e =>
                           this.handleSelectedObjectArrayChange('editableAreaSizes', key, 'height', e)}/>
              </td>
              <td><a className='btn btn-danger btn-xs' href='#' onClick={() => this.deleteEditableAreaSizeRow(key)}>
                <i className='fa fa-ban'/></a></td>
            </tr>) : null}
        </tbody>
      </table>
      <div className='panel-footer'>
        <a className='btn btn-primary btn-xs' href='#' onClick={() => this.addEditableAreaSizeRow()}>
          <i className='fa fa-plus'/> Add size</a>
      </div>
    </div>
  );

  handleFileUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      this.props.uploadProductTemplate(this.props.objectHolder['template']);
    }
  };

  saveMulticolor = () => {
    if (this.props.objectHolder.multicolor === true) {
      this.props.setEditingObjectProperty('colors', []);
      let colorizables = this.props.objectHolder.colorizables;
      _.forEach(colorizables, c => {
        if (c.assignColorgroup) {
          c._colors = [];
          this.props.setEditingObjectProperty('colorizables', colorizables);
        } else {
          c.colorgroup = {};
          this.props.setEditingObjectProperty('colorizables', colorizables);
        }
      });
    } else if (this.props.objectHolder.multicolor === false) {
      this.props.setEditingObjectProperty('colorizables', []);
    }
  };

  createCustomOption = () => {
    if (!this.customOptionInput || !this.customOptionInput.value || !this.customOptionInput.value.length) {
      this.props.addNotification('error', 'Incorrect custom property name.');
      return;
    }
    let data = this.props.objectHolder.data;
    data[this.customOptionInput.value] = '';
    this.customOptionInput.value = '';
    this.props.setEditingObjectProperty('data', {...data});
  };

  removeCustomOption = (prop, accepted) => {
    if (!accepted) {
      this.props.addNotification('info', 'Are you sure?',
        `Option ${prop} will be deleted.`,
        15, f => this.removeCustomOption(prop, true));
      return;
    }
    let data = this.props.objectHolder.data;
    delete data[prop];
    this.props.setEditingObjectProperty('data', {...data});
  };

  render() {
    return (
      <View {...this.props} objectSample={{...Product}}
            sortingSupport={true}
            hiddenProperties={['id', 'colors', 'locations', 'multicolor', 'description', 'colorizables', 'minDPU',
              'minQuantity', 'hideEditableAreaBorder', 'namesNumbersEnabled', 'pantones',
              'resizable', 'editableAreaSizes', 'showRuler', 'template', 'data', 'sizes']}
            changedLabels={{
              editableAreaSizes: 'Editable Area Sizes', minDPU: 'Min DPU', minQuantity: 'Min quantity',
              customOptions: 'Custom Options'
            }}
            handleImportJson={this.handleImportJson}
            hiddenInputs={['id', 'categoryId', 'thumbUrl', 'data', 'pantones', 'hideEditableAreaBorder',
              'namesNumbersEnabled', 'showRuler', 'resizable', 'multicolor',
              this.props.objectHolder.multicolor === true ?
                'colors' : 'colorizables']}
            enableImportJson={this.props.enableImportJson}
            representations={{
              thumbUrl: {
                getElem: val =>
                  val ? <a href={this.getFileUrl(val)} className='thumbnail'
                           style={{width: 110}}><img
                    src={this.getFileUrl(val)} alt='thumb'
                    style={{width: 110}}/></a> :
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
                sortElem: <Select value={this.props.objectHolder.categoryId}
                                  options={_.sortBy(this.props.productsCategories, 'name')}
                                  valueKey='id'
                                  labelKey='name'
                                  onChange={el => {
                                    if (el) {
                                      this.props.setEditingObjectProperty('categoryId', el.id);
                                    } else {
                                      this.props.setEditingObjectProperty('categoryId', '');
                                    }
                                  }}
                />,
                header: 'Category'
              }
            }}
            changedInputs={{
              template: {
                elem: <div><input type='file' className='form-control'
                                  onChange={e => this.handleFileChoose('template', e)}/>
                  {typeof (this.props.objectHolder.template) === 'string' ?
                    <a
                      href={this.getFileUrl(this.props.objectHolder.template)}>
                      {this.getNameFromUrl(this.props.objectHolder.template)}
                    </a> : null
                  }
                </div>,
                saveF: this.handleFileUpload,
                getName: obj => this.getName(obj, PRODUCT_TEMPLATES_FOLDER)
              },
              thumbUrl: {
                saveF: this.handleThumbUpload,
                getName: obj => this.getName(obj, PRODUCT_THUMB_FOLDER)
              },
              locations: {
                saveF: locs => {
                  _.forEach(locs, loc => {
                    if (loc.image && typeof loc.image === 'object') {
                      this.props.uploadProductLocationImage(loc.image);
                      loc.image = this.getName(loc.image, PRODUCT_LOCATION_IMAGE_FOLDER);
                    }

                    if (loc.mask && typeof loc.mask === 'object') {
                      this.props.uploadProductLocationMask(loc.mask);
                      loc.mask = this.getName(loc.mask, PRODUCT_LOCATION_MASK_FOLDER);
                    }

                    if (loc.overlayInfo && typeof loc.overlayInfo === 'object') {
                      this.props.uploadProductLocationOverlay(loc.overlayInfo);
                      loc.overlayInfo = this.getName(loc.overlayInfo, PRODUCT_LOCATION_OVERLAY_FOLDER);
                    }
                  });

                },
                elem: <Locations {...this.props} getFileUrl={this.getFileUrl}
                                 handleSelectedObjectAddNewArray={this.handleSelectedObjectAddNewArray}
                                 handleSelectedObjectArrayArrayChange={this.handleSelectedObjectArrayArrayChange}
                                 handleSelectedObjectArrayArrayDeleteElement={this.handleSelectedObjectArrayArrayDeleteElement}/>
              },
              description: {
                elem: <textarea className='form-control' rows='3'
                                value={this.props.objectHolder.description}
                                onChange={e => this.handleSelectedObjectChange('description', e)}>
              </textarea>
              },
              sizes: {
                elem: <Creatable
                  name='sizes'
                  className='onTop1'
                  value={this.getSelectedSizeOptions()}
                  multi={true}
                  labelKey='name'
                  options={this.getSizeOptions()}
                  onChange={this.onSizeSelectChange}
                />
              },
              colorizables: {
                elem: this.renderColorizableTable(),
                saveF: this.saveMulticolor
              },
              colors: {
                elem: this.renderColorsTable(),
                saveF: this.saveMulticolor,
                getName: color => _.forEach(color, clr => {
                  if (clr !== null && clr._locations) {
                    if (clr._locations.length) {
                      _.forEach(clr._locations, lc => {
                        if (typeof (lc.image) === 'object') {
                          this.handleImageUpload(lc.image);
                          lc.image = this.getName(lc.image, PRODUCT_IMG_FOLDER);
                        }
                      });
                    }
                  }
                })
              },
              editableAreaSizes: {
                elem: this.renderEditableAreaSizesTable()
              }
            }
            }
            customInputs={{
              thumb: {
                elem: <div>
                  <input type='file' className='form-control' accept='image/*'
                         onChange={e => this.handleFileChoose('thumbUrl', e)}/>

                  {typeof (this.props.objectHolder.thumbUrl) === 'string' && this.props.status === STATUS_EDITING ?
                    <div style={{float: 'left'}}><a href={this.getFileUrl(this.props.objectHolder.thumbUrl)}
                                                    className='thumbnail'
                                                    style={{marginTop: 8, width: 110}}><img
                      style={{width: 110}} src={this.getFileUrl(this.props.objectHolder.thumbUrl)}/>
                    </a>
                    </div>
                    : null}
                  <div style={{float: 'left'}}>
                    {this.props.status === STATUS_CREATING && !this.props.objectHolder.thumbUrl ?
                      <canvas style={{marginTop: 8}} ref='canvas' width='110'
                              height='110' hidden/> :
                      <canvas style={{marginTop: 8}} ref='canvas' width='110'
                              height='110'/>}
                  </div>
                </div>,
                required: true,
                viewIndex: Product.thumbUrl.viewIndex
              },
              category: {
                elem: <select className='form-control'
                              value={this.props.objectHolder.categoryId}
                              onChange={e => this.handleSelectedObjectChange('categoryId', e)}>
                  <option value={undefined}>Choose category...</option>
                  {this.props.productsCategories.map((gc, key) => (
                    <option key={key} value={gc.id}>{gc.name}</option>
                  ))}
                </select>,
                required: true,
                viewIndex: Product.categoryId.viewIndex
              },
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
                          <p>{prop.capitalizeFirstLetter()}: </p>
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
            }}
      />
    );
  }
}
