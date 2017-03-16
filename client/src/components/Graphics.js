import React, {Component, PropTypes} from 'react';
import View from './View';
import * as GraphicModel from '../../../common/models/graphic.json';
import {STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';
import * as _ from 'lodash';
const Graphic = GraphicModel.properties;

export default class GraphicsComponent extends Component {
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
    graphicsCategories: PropTypes.array.isRequired,
    uploadGraphicImage: PropTypes.func.isRequired,
    uploadGraphicThumb: PropTypes.func.isRequired,
    token: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {newColorizables: []};
    if (!Array.prototype.remove) {
      Array.prototype.remove = function (from, to) {
        const rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
      };
    }
  }

  handleSelectedObjectArrayChange = (arrName, ind, propName, event) => {
    const arr = this.props.objectHolder[arrName];
    (arr[ind])[propName] = event.target.value;
    this.props.setEditingObjectProperty(arrName, [...arr]);
  };

  handleSelectedObjectArrayArrayChange = (fArrName, sArrName, fInd, sInd, propName, event) => {
    const colorizables = this.props.objectHolder[fArrName];
    ((((colorizables[fInd])[sArrName])[sInd])[propName]) = event.target.value;
    this.props.setEditingObjectProperty(fArrName, [...colorizables]);
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  handleFileChoose = (prop, e) => {
    this.props.setEditingObjectProperty(prop, e.target.files[0]);
  };

  handleImageUpload = file => {
    this.props.uploadGraphicImage(file);
  };

  handleThumbUpload = file => {
    this.props.uploadGraphicThumb(file);
  };

  handleColorizableRowChange = (i, objectProp, e) => {
    const items = this.state.newColorizables;
    this.state.newColorizables.map((c, ind) => {
      if (c.i === i) {
        items[ind][objectProp] = e.target.value;
      }
    });
    this.setState({...this.state, newColorizables: [...items]});
  };

  handleColorizableRowDelete = i => {
    const arr = this.state.newColorizables;
    this.state.newColorizables.map((c, ind) => {
      if (c.i === i) {
        arr.remove(ind);
      }
    });
    this.setState({...this.state, newColorizables: [...arr]});
  };

  renderColorizableRow = () => (
    this.state.newColorizables.map(c =>
      <tr key={c.i}>
        <td>
          <input type='text' className='form-control'
                 value={_.filter(this.state.newColorizables, cr => cr.id === c.id)[0]['name']}
                 onChange={e => this.handleColorizableRowChange(c.i, 'name', e)}/></td>
        <td>
          <input type='text' className='form-control'
                 value={_.filter(this.state.newColorizables, cr => cr.id === c.id)[0]['id']}
                 onChange={e => this.handleColorizableRowChange(c.i, 'id', e)}/>
        </td>
        <td>
          <table className='table'>
            <thead>
            <tr>
              <th>name</th>
              <th>value</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </td>
        <td><a className='btn btn-danger btn-xs' href='#' onClick={e => this.handleColorizableRowDelete(c.i)}>
          <i className='fa fa-ban'/></a></td>
      </tr>
    ));

  addColorizableRow = () => {
    this.setState({
      ...this.state,
      newColorizables: [...this.state.newColorizables, {
        i: this.state.newColorizables.length,
        name: '',
        id: '',
        colors: []
      }]
    });
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
                <table className='table'>
                  <thead>
                  <tr>
                    <th>name</th>
                    <th>value</th>
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
                    </tr>
                  ))}
                  </tbody>
                </table>
                <button type='button'
                        className='btn btn-default pull-right'
                        onClick={() => this.addColorRow()}
                >Add color
                </button>
              </td>
              <td><a className='btn btn-danger btn-xs' href='#'>
                <i className='fa fa-ban'/></a></td>
            </tr>) : null}
        {this.renderColorizableRow()}
        </tbody>
      </table>
      <div className='panel-footer'>
        <a className='btn btn-primary btn-xs' href='#' onClick={() => this.addColorizableRow()}>
          <i className='fa fa-plus'/> Add element</a>
      </div>
    </div>
  );

  render() {
    return (
      <View {...this.props} objectSample={{...Graphic, colorizables: []}} sortingSupport={true}
            hiddenProperties={['id', 'colors', 'colorize',
              'colorizableElements', 'multicolor', 'description', 'image', 'colorizables']}
            hiddenInputs={['id', 'categoryId']}
            representations={{
              thumb: {
                getElem: val =>
                  val ? <a href={`/files/graphicThumbs/${val}`} className='thumbnail' style={{width: 100}}><img
                      src={`/files/graphicThumbs/${val}`} alt='thumb'
                      style={{width: 100}}/></a> :
                    null,
                sortable: false
              },
              image: {
                getElem: val => val ?
                  <a href={`/files/graphicImages/${val}`} className='thumbnail' style={{width: 100}}><img
                    src={`/files/graphicImages/${val}`} alt='image' style={{width: 100}}/></a> : null,
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
                header: 'category'
              }
            }}
            changedInputs={{
              image: {
                elem: <input type='file' className='form-control'
                             onChange={e => this.handleFileChoose('image', e)}/>,
                saveF: this.handleImageUpload
              },
              thumb: {
                elem: <input type='file' className='form-control'
                             onChange={e => this.handleFileChoose('thumb', e)}/>,
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
              colorizables: {
                elem: this.renderColorizableTable()
              }
            }
            }
            customInputs={{
              category: {
                elem: <select className='form-control'
                              value={this.props.objectHolder['categoryId']}
                              onChange={e => this.handleSelectedObjectChange('categoryId', e)}>
                  <option key='defGroup' value={''}>Choose category...</option>
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
