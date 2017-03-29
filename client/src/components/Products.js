import React, {Component, PropTypes} from 'react';
import View from './View';
import * as ProductModel from '../../../common/models/product.json';
import {STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';
const Product = ProductModel.properties;
const location = 'files/productThumbs/';
const locationImage = 'files/productImages/';

export default class ProductsComponent extends Component {
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
    productsCategories: PropTypes.array.isRequired,
    uploadProductImage: PropTypes.func.isRequired,
    uploadProductThumb: PropTypes.func.isRequired,
    fetchProductsCategories: PropTypes.func.isRequired,
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
    this.props.fetchProductsCategories();
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

  handleSelectedObjectDataChange = (prop, propertyName, event) => {
    this.props.objectHolder[prop][propertyName] = event.target.value;
    this.props.setEditingObjectProperty(prop, this.props.objectHolder[prop]);
  };

  handleImgAsThumb = () => {
    this.props.setEditingObjectProperty('thumbUrl', this.props.objectHolder['image']);
    this.toCanvas('thumbUrl');
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

  render() {
    return (
      <View {...this.props} objectSample={{...Product, colorizables: []}} sortingSupport={true}
            hiddenProperties={['id', 'colors', 'colorize',
              'colorizableElements', 'multicolor', 'description', 'colorizables', 'minDPU', 'minQuantity',
              'namesNumbersEnabled', 'hideEditableAreaBorder', 'namesNumbersEnabled', 'pantones', 'resizable',
              'editableAreaSizes', 'showRuler', 'template', 'data', 'sizes']}
            hiddenInputs={['id', 'categoryId', 'thumbUrl', 'data', 'pantones']}
            representations={{
              thumbUrl: {
                getElem: val =>
                  val ? <a href={`/files/productThumbs/${val}`} className='thumbnail' style={{width: 100}}><img
                    src={`/files/productThumbs/${val}`} alt='thumb' style={{width: 100}}/></a> :
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
                  {this.props.productsCategories.map((cat, key) => <option key={key}
                                                                           value={cat.id}>{cat.name}</option>)}
                </select>,
                header: 'Category'
              }
            }}
            changedInputs={{
              thumbUrl: {
                saveF: this.handleThumbUpload
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
              },
              colors: {
                elem: <div></div>
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
                         onChange={e => this.handleFileChoose('thumb', e)}/>

                  {typeof (this.props.objectHolder['thumbUrl']) === 'string' && this.props.status === STATUS_EDITING ?
                    <div style={{float: 'left'}}><a href={location + this.props.objectHolder['thumb']}
                                                    className='thumbnail'
                                                    style={{marginTop: 8, width: 100}}><img
                      style={{width: 100}} src={location + this.props.objectHolder['thumbUrl']}/>
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
    );
  }

}
