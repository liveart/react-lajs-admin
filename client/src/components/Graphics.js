import React, {Component, PropTypes} from 'react';
import View from './View';
import * as GraphicModel from '../../../common/models/graphic.json';
import {STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';
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
    fetchColorizables: PropTypes.func.isRequired,
    fetchColorizableColorConnections: PropTypes.func.isRequired,
    colorizableColorConnections: PropTypes.arrayOf(PropTypes.any).isRequired,
    colors: PropTypes.arrayOf(PropTypes.any).isRequired,
    token: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {colorizableNum: 0}
  }

  componentWillReceiveProps(props) {
    if (props.status !== this.props.status && props.status === STATUS_EDITING) {
      this.props.fetchColorizables(props.objectHolder.id);
      this.props.fetchColorizableColorConnections();
      this.props.fetchColors();
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

  handleColorizableRowChange = (prop, i, objectProp, e) => {
//TODO
  };

  renderColorizableRow = () => {
    let rows = '';
    for (let i = 0; i < this.state.colorizableNum; ++i) {
      rows += <tr key={`inputs${i}`}>
        <td><input type='text' className='form-control'
                   value={(this.props.objectHolder['colorizableElements'])[i]['name']}
                   onChange={e => this.handleColorizableRowChange('colorizableElements', i, 'name', e)}/></td>
        <td><input type='text' className='form-control'
                   value={(this.props.objectHolder['colorizableElements'])[i]['id']}
                   onChange={e => this.handleColorizableRowChange('colorizableElements', i, 'id', e)}/></td>
      </tr>;
    }
    return rows.length ? rows : null;
  };

  renderColorizableData = () => this.props.colorizables.map((c, key) =>
    <tr key={key}>
      <td>{c.name}</td>
      <td>{c.id}</td>
      <td>{this.renderColorsTable()}</td>
    </tr>);

  renderColorsTable = () => (
    <table className='table'>
      <thead>
      <tr>
        <th>name</th>
        <th>value</th>
      </tr>
      </thead>
      <tbody>
      {this.renderColorsData()}
      </tbody>
    </table>
  );

  renderColorsData = () =>
    this.props.colors && this.props.colorizableColorConnections && this.props.colorizableColorConnections.length ?
      this.props.colors
        .filter(c => this.props.colorizableColorConnections.filter(conn => conn.colorId === c.id).length > 0)
        .map((c, key) =>
          <tr key={key}>
            <td>{c.name}</td>
            <td>{c.value}</td>
          </tr>) : null;

  changeColorizableRowsNum = inc => {
    if (inc) {
      this.setState({...this.state, colorizableNum: this.state.colorizableNum + 1});
    } else {
      if (this.state.colorizableNum > 0) {
        this.setState({...this.state, colorizableNum: this.state.colorizableNum - 1});
      }
    }
  };

  renderColorizableTable = () => (
    <div>
      <table className='table table-bordered'>
        <thead>
        <tr>
          <th>name</th>
          <th>id</th>
          <th>colors</th>
        </tr>
        </thead>
        <tbody>
        {this.renderColorizableData()}
        {this.renderColorizableRow()}
        </tbody>
      </table>
      <button type='button'
              className='btn btn-default pull-right'
              onClick={() => this.changeColorizableRowsNum(true)}
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
                getElem: val => <img src={`/files/graphicThumbs/${val}`} alt='thumb' style={{width: 100}}/>,
                sortable: false
              },
              image: {
                getElem: val => <img src={`/files/graphicImages/${val}`} alt='image' style={{width: 100}}/>,
                sortable: false
              },
              categoryId: {
                getElem: val => {
                  let cat = this.props.graphicsCategories.find(c => String(c.id) === val);
                  if (cat) {
                    return cat.name;
                  }

                  return '';
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
