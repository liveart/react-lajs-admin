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
        <td><a className='btn btn-default' href='#' onClick={e => this.handleColorizableRowDelete(c.i)}>
          <i className='fa fa-ban'/></a></td>
      </tr>
    ));

  renderColorsTable = colorizableId => (
    <table className='table'>
      <thead>
      <tr>
        <th>name</th>
        <th>value</th>
      </tr>
      </thead>
      <tbody>
      {this.renderColorsData(colorizableId)}
      </tbody>
    </table>
  );

  renderColorsData = colorizableId =>
    this.props.colors ?
      _.intersectionWith(this.props.colors, this.props.colorizableColorConnections,
        (color, conn) => colorizableId === conn.colorizableElementId && color.id === conn.colorId)
        .map((c, key) =>
          <tr key={key}>
            <td>{c.name}</td>
            <td>{c.value}</td>
          </tr>) : null;

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
    <div>
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
              <td>{c.name}</td>
              <td>{c.id}</td>
              <td>{this.renderColorsTable(c.id)}</td>
              <td><a className='btn btn-default' href='#'>
                <i className='fa fa-ban'/></a></td>
            </tr>) : null}
        {this.renderColorizableRow()}
        </tbody>
      </table>
      <button type='button'
              className='btn btn-default pull-right'
              onClick={() => this.addColorizableRow()}
      >Add new element
      </button>
    </div>
  );

  render() {
    return (
      <View {...this.props} objectSample={Graphic} sortingSupport={true}
            hiddenProperties={['id', 'colors', 'colorize',
              'colorizableElements', 'multicolor', 'description', 'image']}
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
              },
              colorizableElements: {
                elem: this.renderColorizableTable()
              }
            }}
      />
    );
  }
}
