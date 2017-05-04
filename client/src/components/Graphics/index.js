import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import View from '../View/index';
import Select, {Creatable} from 'react-select';
import * as GraphicModel from '../../../../common/models/graphic.json';
import {
  STATUS_EDITING,
  STATUS_CREATING,
  STATUS_DEFAULT,
  RELATIVE_URL,
  GRAPHIC_IMG_FOLDER,
  GRAPHIC_THUMB_FOLDER,
  ASSIGN_GROUP,
  ADD_COLOR
} from '../../definitions';
import {parseJson} from '../../GraphicJsonParser';
import * as converter from '../../SvgConverter';
const Graphic = GraphicModel.properties;
const LEAVE_URL_OPTION = 'Import';
import * as _ from 'lodash';

export default class GraphicsComponent extends Component {
  static propTypes = PTypes;

  constructor(props) {
    super(props);
    this.state = {newColorizables: [], imgUrl: ''};
    if (!Array.prototype.remove) {
      Array.prototype.remove = function (from, to) {
        const rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
      };
    }
  }

  componentWillMount() {
    this.props.fetchGraphicsCategories();
  }

  componentWillReceiveProps(props) {
    if (this.props.status === STATUS_DEFAULT && (props.status === STATUS_CREATING || props.status === STATUS_EDITING)) {
      this.props.fetchColors();
      this.props.fetchColorgroups();
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

  handleSelectedObjectArrayArrayDeleteElement = (fArr, sArr, colorizableKey, key) => {
    const arr = (this.props.objectHolder[fArr]);
    arr[colorizableKey][sArr].remove(key);
    this.props.setEditingObjectProperty(fArr, [...arr]);
  };

  handleSelectedObjectArrayArrayChange = (fArrName, sArrName, fInd, sInd, propName, event) => {
    const arr = this.props.objectHolder[fArrName];
    arr[fInd][sArrName][sInd][propName] = event.target.value;
    this.props.setEditingObjectProperty(fArrName, [...arr]);
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  handleImgAsThumb = () => {
    this.props.setEditingObjectProperty('thumb', this.props.objectHolder.image);
    this.toCanvas('thumb');
  };

  toCanvas = prop => {
    const image = this.props.objectHolder[prop];
    const img = new Image();
    let imageOut = new Image();
    const reader = new FileReader();
    reader.onload = e => img.src = e.target.result;
    reader.readAsDataURL(image);
    let c = this.refs.canvas;
    let ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    img.onload = () => imageOut = ctx.drawImage(img, 0, 0, 100, 100);
  };

  handleFileChoose = (prop, e, overwrite) => {
    e.persist();
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      if (prop === 'image') {
        const image = e.target.files[0];
        this.props.setEditingObjectProperty(prop, image);
        const reader = new FileReader();
        reader.onloadend = () => {
          this.setState({
            ...this.state,
            imgUrl: reader.result
          });
          if (image.type === 'image/svg+xml') {
            if (overwrite) {
              const r = new FileReader();
              r.onload = e => {
                const contents = e.target.result;
                const {graphicObject, newDom, colors} = converter.processSVGContent(contents);
                const blob = new Blob([newDom], {type: 'application/octet-binary'});
                const file = new File([blob], image.name, {type: image.type});
                this.props.setEditingObjectProperty(prop, file);
                this.props.setEditingObjectProperty(null, {...this.props.objectHolder, ...graphicObject});
                const foundColors = _.intersection(this.props.colors.map(c => c.value), colors);
                if (foundColors.length < colors.length) {
                  this.props.addNotification('warning', 'Some of the colors from the selected image are not present' +
                    ' in the color list.');
                }
              };
              r.readAsText(image);
            } else {
              this.props.addNotification('info', 'Some options might be parsed from the selected svg image',
                'Try parsing multicolor option and colorizable elements from the image?',
                15, f => this.handleFileChoose(prop, e, true));
            }
          }
        };
        reader.readAsDataURL(image);
      }
      if (prop === 'thumb') {
        this.props.setEditingObjectProperty(prop, e.target.files[0]);
        this.toCanvas(prop);
      }
    }
  };

  handleImageUpload = img => {
    this.props.uploadGraphicImage(img);
  };

  handleThumbUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      const image = this.props.objectHolder['thumb'];
      const uploadThumbnail = thumb => {
        this.props.uploadGraphicThumb(thumb);
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
  getColorgroupsOptions = () => {
    if (!this.props.colorgroups || !this.props.colorgroups.length) {
      return [];
    }
    return this.props.colorgroups;
  };

  getColorizableColorsOptions = () => {
    return [{value: false, name: ADD_COLOR}, {value: true, name: ASSIGN_GROUP}];
  };

  getSelectedColorizableColorsOptions = key => {
    if (!this.props.objectHolder.colorizables[key]._colors || !this.props.objectHolder.colorizables[key]._colors.length) {
      return [];
    }
    let arr = this.props.objectHolder.colorizables;
    if (arr[key]._colors) {
      return _.map(arr[key]._colors, col => ({value: col.value, name: col.name}));
    }
  };
  getSelectedColorizableOptions = key => {
    let arr = this.props.objectHolder.colorizables;
    if (!arr[key].assignColorgroup) {
      return {value: arr[key].assignColorgroup, name: ADD_COLOR};
    } else {
      return {value: arr[key].assignColorgroup, name: ASSIGN_GROUP};
    }
  };

  getSelectedColorizableColorgroupOptions = key => {
    if (!this.props.objectHolder.colorizables[key].colorgroup) {
      return {};
    }
    let arr = this.props.objectHolder.colorizables;
    if (arr[key].colorgroup) {
      return {id: arr[key].colorgroup.id, name: arr[key].colorgroup.name};
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

  handleColorActionOption = (option, key) => {
    let colorizables = this.props.objectHolder.colorizables;
    colorizables[key].assignColorgroup = option.value;
    this.props.setEditingObjectProperty('colorizables', colorizables);
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

  addColorizableRow = () =>
    this.handleSelectedObjectArrayAddNew('colorizables', {name: '', id: '', _colors: []});

  deleteColorizableRow = key =>
    this.handleSelectedObjectArrayDeleteElement('colorizables', key);

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
    try {
      let parsed = parseJson(json, baseUrl);
      const categories = parsed.categories;
      if (categories && categories.length) {
        this.props.createGraphicsCategory(categories, this.props.token);
      }
      const graphics = parsed.graphics;
      if (graphics && graphics.length) {
        this.props.createEntity(graphics, this.props.token);
      }
      this.props.enableDefaultStatus();
      this.props.restoreTableState({...Graphic, colorizables: []});
      this.setState({...this.state, json: '', baseUrl: ''});
    } catch (e) {
      this.props.addNotification('error', 'Json structure is invalid.');
    }
  };

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

  getOptions = () => {
    if (!this.props.colors || !this.props.colors.length) {
      return [];
    }

    return this.props.colors;
  };

  getSelectedOptions = () => {
    if (!this.props.objectHolder['colors'] || !this.props.objectHolder['colors'].length) {
      return [];
    }

    if (typeof (this.props.objectHolder['colors'])[0] === 'string') {
      return _.map(this.props.objectHolder['colors'], col => ({value: col, name: col}));
    }

    return this.props.objectHolder['colors'];
  };

  onColorsSelectChange = val => {
    const arr = [];
    if (val) {
      _.forEach(val, v => arr.push({name: v.name, value: v.value}));
      this.props.setEditingObjectProperty('colors', arr);
    }
  };

  saveColorizables = () => {
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
  };

  render() {
    return (
      <View {...this.props} objectSample={{...Graphic}}
            sortingSupport={true}
            enableImportJson={this.props.enableImportJson}
            handleImportJson={this.handleImportJson}
            sortComparators={{categoryId: (data, id) => id === '' ? true : data === id}}
            representations={{
              thumb: {
                getElem: val =>
                  val ? <a href={this.getFileUrl(val)} className='thumbnail'
                           style={{width: 100}}><img
                    src={this.getFileUrl(val)} alt='thumb'
                    style={{width: 100}}/></a> :
                    null
              },
              image: {
                getElem: val => val ?
                  <a href={this.getFileUrl(val)} className='thumbnail'
                     style={{width: 100}}><img
                    src={this.getFileUrl(val)} alt='image'
                    style={{width: 100}}/></a> : null
              },
              categoryId: {
                getElem: val => {
                  let cat = this.props.graphicsCategories.find(c => String(c.id) === val);
                  if (cat) {
                    return cat.name;
                  }

                  return null;
                },
                sortElem: <select className='form-control'
                                  value={this.props.objectHolder.categoryId}
                                  onChange={e => this.handleSelectedObjectChange('categoryId', e)}>
                  <option key='any' value=''>...</option>
                  {_.sortBy(this.props.graphicsCategories, 'name').map((cat, key) =>
                    <option key={key}
                            value={cat.id}>{cat.name}</option>)}
                </select>
              }
            }}
            changedInputs={{
              image: {
                elem: <input type='file' className='form-control'
                             onChange={e => this.handleFileChoose('image', e)}/>,
                saveF: this.handleImageUpload,
                getName: obj => this.getName(obj, GRAPHIC_IMG_FOLDER)
              },
              thumb: {
                saveF: this.handleThumbUpload,
                getName: obj => this.getName(obj, GRAPHIC_THUMB_FOLDER)
              },
              colors: {
                elem: <Creatable
                  name='colors'
                  value={this.getSelectedOptions()}
                  multi={true}
                  labelKey='name'
                  options={this.getOptions()}
                  onChange={this.onColorsSelectChange}
                  isLoading={this.props.colorsLoading}
                />
              },
              description: {
                elem: <textarea className='form-control' rows='3'
                                value={this.props.objectHolder['description']}
                                onChange={e => this.handleSelectedObjectChange('description', e)}>

                </textarea>
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
                elem: this.renderColorizableTable(),
                saveF: this.saveColorizables
              }
            }
            }
            customInputs={{
              image: {
                elem: <div>
                  <input ref='file' type='file' className='form-control' accept='image/*'
                         onChange={e => this.handleFileChoose('image', e)}/>

                  {typeof (this.props.objectHolder['image']) === 'string' && this.props.status === STATUS_EDITING ?
                    <a href={this.getFileUrl(this.props.objectHolder['image'])}
                       className='thumbnail'
                       style={{marginTop: 8, width: 100}}><img
                      style={{width: 100}} src={this.getFileUrl(this.props.objectHolder['image'])}/>
                    </a>
                    : typeof (this.props.objectHolder['image']) === 'object' ?
                      <div><a
                        href={this.state.imgUrl}
                        className='thumbnail'
                        style={{
                          marginTop: 8,
                          width: 100
                        }}>
                        <img src={this.state.imgUrl}/>
                      </a>
                        <a className='btn btn-primary btn-xs' href='#' onClick={this.handleImgAsThumb}>
                          Use also as thumb</a>
                      </div> : null }
                </div>,
                required: true
              },
              thumb: {
                elem: <div>
                  <input type='file' className='form-control' accept='image/*'
                         onChange={e => this.handleFileChoose('thumb', e)}/>

                  {typeof (this.props.objectHolder['thumb']) === 'string' && this.props.status === STATUS_EDITING ?
                    <div style={{float: 'left'}}><a href={this.getFileUrl(this.props.objectHolder['thumb'])}
                                                    className='thumbnail'
                                                    style={{marginTop: 8, width: 100}}><img
                      style={{width: 100}} src={this.getFileUrl(this.props.objectHolder['thumb'])}/>
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
                              onChange={e => this.handleSelectedObjectChange('categoryId', e)}>
                  <option key='defGroup' value={undefined}>Choose category...</option>
                  {this.props.graphicsCategories.map((gc, key) => (
                    <option key={key} value={gc.id}>{gc.name}</option>
                  ))}
                </select>,
                required: true
              }
            }}
      />
    );
  }
}
