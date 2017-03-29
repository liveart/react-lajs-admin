import React, {Component, PropTypes} from 'react';
import View from './View';
import * as GraphicModel from '../../../common/models/graphic.json';
import {
  STATUS_EDITING,
  STATUS_CREATING,
  RELATIVE_URL,
  GRAPHIC_IMG_FOLDER,
  GRAPHIC_THUMB_FOLDER
} from '../definitions';
import {parseJson} from '../GraphicJsonParser';
const Graphic = GraphicModel.properties;

export default class GraphicsComponent extends Component {
  static propTypes = {
    addNotification: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
    message: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    objectHolder: PropTypes.object,
    status: PropTypes.string.isRequired,
    selectRow: PropTypes.func.isRequired,
    enableEditing: PropTypes.func.isRequired,
    enableImportJson: PropTypes.func.isRequired,
    enableCreating: PropTypes.func.isRequired,
    enableDefaultStatus: PropTypes.func.isRequired,
    createGraphicsCategory: PropTypes.func.isRequired,
    createEntity: PropTypes.func.isRequired,
    editEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    setEditingObjectProperty: PropTypes.func.isRequired,
    restoreTableState: PropTypes.func.isRequired,
    graphicsCategories: PropTypes.array.isRequired,
    uploadGraphicImage: PropTypes.func.isRequired,
    uploadGraphicThumb: PropTypes.func.isRequired,
    fetchGraphicsCategories: PropTypes.func.isRequired,
    token: PropTypes.string
  };

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

  handleSelectedObjectArrayArrayDeleteElement = (fArr, sArr, colorizableKey, key) => {
    const arr = (this.props.objectHolder[fArr]);
    ((arr[colorizableKey])[sArr]).remove(key);
    this.props.setEditingObjectProperty(fArr, [...arr]);
  };

  handleSelectedObjectArrayArrayChange = (fArrName, sArrName, fInd, sInd, propName, event) => {
    const colorizables = this.props.objectHolder[fArrName];
    ((((colorizables[fInd])[sArrName])[sInd])[propName]) = event.target.value;
    this.props.setEditingObjectProperty(fArrName, [...colorizables]);
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  handleImgAsThumb = () => {
    this.props.setEditingObjectProperty('thumb', this.props.objectHolder['image']);
    this.toCanvas('thumb');
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
      if (prop === 'thumb') {
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

  renderColorizableTable = () => (
    <div className='panel panel-default'>
      <table className='table table-bordered'>
        <thead>
        <tr>
          <th>name</th>
          <th>id</th>
          <th>colors</th>
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
                      <th>name</th>
                      <th>value</th>
                      <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {!c._colors ? null : c._colors.map((col, k) => (
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

  handleImportJson = (json, baseUrl, forceNoBase) => {
    if (!baseUrl.length && !forceNoBase) {
      this.props.addNotification('warning', 'Base url is not set', 'Not setting correct base url might result in broken links.',
        15, (f) => this.handleImportJson(json, baseUrl, true));
      return;
    }
    if (!forceNoBase) {
      const r = new RegExp('^(?:[a-z]+:)?//', 'i');
      if (!r.test(baseUrl)) {
        this.props.addNotification('warning', 'The specified base url seems to not have a protocol',
          'Not setting correct base url might result in broken links.',
          15, (f) => this.handleImportJson(json, baseUrl, true));
        return;
      }
    }
    try {
      const parsed = parseJson(json, baseUrl);
      const categories = parsed.categories;
      if (categories && categories.length) {
        this.props.createGraphicsCategory(categories, this.props.token);
      }
      const graphics = parsed.graphics;
      if (graphics && graphics.length) {
        this.props.createEntity(graphics, this.props.token);
      }
      this.props.enableDefaultStatus();
      this.props.restoreTableState(this.props.objectSample);
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

  render() {
    return (
      <View {...this.props} objectSample={{...Graphic, colorizables: []}}
            sortingSupport={true}
            enableImportJson={this.props.enableImportJson}
            handleImportJson={this.handleImportJson}
            hiddenProperties={['id', 'colors', 'colorize',
              'colorizableElements', 'multicolor', 'description', 'image', 'colorizables']}
            hiddenInputs={['id', 'categoryId', 'thumb', 'image']}
            sortComparators={{categoryId: (data, id) => id === '' ? true : data === id}}
            representations={{
              thumb: {
                getElem: val =>
                  val ? <a href={this.getFileUrl(val)} className='thumbnail'
                           style={{width: 100}}><img
                    src={this.getFileUrl(val)} alt='thumb'
                    style={{width: 100}}/></a> :
                    null,
                sortable: false
              },
              image: {
                getElem: val => val ?
                  <a href={this.getFileUrl(val)} className='thumbnail'
                     style={{width: 100}}><img
                    src={this.getFileUrl(val)} alt='image'
                    style={{width: 100}}/></a> : null,
                sortable: false
              },
              categoryId: {
                getElem: val => {
                  let cat = this.props.graphicsCategories.find(c => String(c.id) === val);
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
                  {this.props.graphicsCategories.map((cat, key) => <option key={key}
                                                                           value={cat.id}>{cat.name}</option>)}
                </select>,
                header: 'Category'
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
                elem: this.renderColorizableTable()
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
