import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../../definitions';
import {SketchPicker} from 'react-color';
import * as ColorModel from '../../../../common/models/color.json';
import * as _ from 'lodash';
const Color = ColorModel.properties;

export default class ColorsComponent extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    addNotification: PropTypes.func.isRequired,
    message: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    secondaryData: PropTypes.arrayOf(PropTypes.any).isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    fetchSecondaryData: PropTypes.func.isRequired,
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
    token: PropTypes.string
  };

  constructor(props) {
    super(props);
    if (!String.prototype.capitalizeFirstLetter) {
      String.prototype.capitalizeFirstLetter = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
      };
    }
  }

  componentWillMount() {
    this.props.restoreTableState(Color);
    this.props.fetchData();
    this.props.fetchSecondaryData();
  }

  componentDidUpdate() {
    if (this.props.errors && this.props.errors.length) {
      this.props.errors.forEach(prop => this.props.addNotification('error', prop));
    }

    if (this.props.message) {
      this.props.addNotification('success', this.props.message);
    }
  }

  renderTableHeadings = object => (
    Object.getOwnPropertyNames(object).map((prop, i) => {
      if (prop === ID_PROP) {
        return null;
      }
      if (prop === 'colorgroupId') {
        return <th key={i}>Group</th>;
      }

      return <th key={i}>{prop.capitalizeFirstLetter()}</th>;

    })
  );

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  handleColorChange = color => {
    this.props.setEditingObjectProperty('value', color.hex);
  };

  renderTableSortRow = object => (
    this.props.data.length === 0 ? null :
      <tr key='sortRow'>
        {Object.getOwnPropertyNames(object).map((prop, i) => {
          if (prop === ID_PROP) {
            return null;
          }

          if (prop === 'colorgroupId') {
            return <td key={i}><select className='form-control'
                                       value={this.props.objectHolder[prop]}
                                       onChange={e => this.handleSelectedObjectChange(prop, e)}>
              <option key='defGroup' value={''}>...</option>
              {this.props.secondaryData.map((cg, key) => (
                <option key={key} value={cg.id}>{cg.name}</option>
              ))}
            </select></td>;
          }
          return <td key={i}>
            <FormControl type='text'
                         value={this.props.objectHolder[prop]}
                         onChange={e => this.handleSelectedObjectChange(prop, e)}
            />
          </td>;
        })
        }
      </tr>
  );

  sortRows = (data, object) => {
    const rows = [];
    for (let i = 0; i < data.length; ++i) {
      let add = true;

      Object.getOwnPropertyNames(object).map(prop => {
        if (!add) {
          return;
        }
        if (typeof (this.props.data[i])[prop] === 'undefined') {
          add = this.props.objectHolder[prop] === '';
        } else if (!_.includes((data[i])[prop], this.props.objectHolder[prop])) {
          add = false;
        }
      });

      if (add) {
        rows.push(data[i]);
      }
    }
    return rows;
  };

  getGroupById = id => {
    let groups = this.props.secondaryData.filter(cg => (cg.id === id));
    return groups.length ? groups[0].name : null;
  };

  renderTableData = (data, object) => {
    if (!data.length) {
      return null;
    }

    const rows = this.sortRows(data, object);

    return rows.map(item => {

      return (
        <tr key={item.id} onClick={() => this.handleEdit(item)}>
          {
            Object.getOwnPropertyNames(object).map(prop => {
              if (prop === ID_PROP) {
                return null;
              }

              if (prop === 'colorgroupId') {
                return <td key={String(item.id + prop)}>
                  {this.getGroupById(item[prop])}
                </td>;
              }

              if (prop === 'value') {
                return <td key={String(item.id + prop)}>
                  {item[prop]}
                  <span className='label label-default pull-right'
                        style={{background: item[prop]}}>{' '}</span>
                </td>;
              }
              return <td key={String(item.id + prop)}>{item[prop]}</td>;
            })
          }
        </tr>
      );
    });
  };

  renderTable = (data, object) => (
    <div className='panel panel-default'>
      <tb className='table-responsive'>
        <table className='table no-margin table-hover table-bordered'>
          <thead>
          <tr key='trhead'>
            {this.renderTableHeadings(object)}
          </tr>
          </thead>
          <tbody>
          {this.renderTableSortRow(object)}
          {this.renderTableData(data, object)}
          </tbody>
        </table>
      </tb>
    </div>
  );

  renderDefButtons = () => (
    <div className='pull-right'>
      <button type='button' className='btn btn-primary' style={{marginBottom: 6}}
              onClick={this.handleAddNew}>Add new color
      </button>
      <button type='button' className='btn btn-default' style={{marginBottom: 6}}
              onClick={() => this.props.restoreTableState(Color)}>Reset filter
      </button>
    </div>
  );

  renderEditingButtons = () => (
    <div>
      <div className='pull-left'>
        <button type='button' className='btn btn-default'
                onClick={this.handleCancelBtnClick}>Cancel
        </button>
      </div>
      <div className='pull-right'>
        <button type='button' className='btn btn-primary'
                onClick={() => this.handleSaveBtnClick(true)}>Save
        </button>
        <button type='button' className='btn btn-primary'
                onClick={() => this.handleSaveBtnClick(false)}>Save and
          continue edit
        </button>
        <button type='button' className='btn btn-danger'
                onClick={this.handleDeleteBtnClick}>Delete
        </button>
      </div>
    </div>
  );

  renderCreatingButtons = () => (
    <div>
      <div className='pull-left'>
        <button type='button' className='btn btn-default'
                onClick={this.handleCancelBtnClick}>Cancel
        </button>
      </div>
      <div className='pull-right'>
        <button type='button' className='btn btn-primary'
                onClick={() => this.handleSaveBtnClick(true)}>Save
        </button>
      </div>
    </div>
  );

  handleEdit = object => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableEditing(Color);
      this.props.selectRow(object);
    }
  };

  handleAddNew = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableCreating(Color);
    }
  };

  handleDeleteBtnClick = () => {
    if (this.props.status === STATUS_EDITING) {
      this.props.deleteEntity(this.props.objectHolder.id, this.props.token);
      this.props.enableDefaultStatus();
      this.props.restoreTableState(Color);
    }
  };

  handleSaveBtnClick = redirect => {
    if (this.props.status === STATUS_EDITING) {
      const properties = Object.getOwnPropertyNames(Color);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
      });
      this.props.editEntity(this.props.objectHolder.id, entity, this.props.token);
      if (redirect) {
        this.props.enableDefaultStatus();
        this.props.restoreTableState(Color);
      }
    } else if (this.props.status === STATUS_CREATING) {
      const properties = Object.getOwnPropertyNames(Color);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
      });
      this.props.createEntity(entity, this.props.token);
      this.props.enableDefaultStatus();
      this.props.restoreTableState(Color);
    }
  };

  handleCancelBtnClick = () => {
    if (this.props.status !== STATUS_DEFAULT) {
      this.props.enableDefaultStatus();
      this.props.restoreTableState(Color);
    }
  };

  renderInputs = () => (
    Object.getOwnPropertyNames(Color).map((prop, key) => {
      if (prop === ID_PROP) {
        return null;
      } else {
        if (prop === 'value') {
          return <div key='value' className='form-group'>
            <div className='col-md-2'>
              {prop.capitalizeFirstLetter()}
            </div>
            <div className='col-md-10'>
              <SketchPicker color={this.props.objectHolder.value}
                            onChange={this.handleColorChange}/>
            </div>
          </div>;
        }

        if (prop === 'colorgroupId') {
          return <div key='colorgroupId' className='form-group'>
            <div className='col-md-2'>
              Group
            </div>
            <div className='col-md-10'>
              <select className='form-control'
                      onChange={e => this.handleSelectedObjectChange(prop, e)}
                      value={this.props.objectHolder[prop]}>
                <option key='defGroup' value={''}>...</option>
                {this.props.secondaryData.map((cg, key) => (
                  <option key={key} value={cg.id}>{cg.name}</option>
                ))}
              </select>
            </div>
          </div>;
        }

        return (
          <div key={key} className='form-group'>
            <div className='col-md-2'>
              {prop.capitalizeFirstLetter()}
            </div>
            <div className='col-md-10'>
              <input type='text' className='form-control'
                     value={this.props.objectHolder[prop]}
                     onChange={e => this.handleSelectedObjectChange(prop, e)}/>
            </div>
          </div>
        );
      }
    })
  );

  renderPage = () => {
    if (this.props.status === STATUS_DEFAULT) {
      return this.renderDefault();
    } else if (this.props.status === STATUS_CREATING) {
      return this.renderCreating();
    } else if (this.props.status === STATUS_EDITING) {
      return this.renderEditing();
    }
  };

  renderDefault = () => (
    <section className='content'>
      <div className='row'>
        <div className='col-md-6'>
          <p>{this.props.title + ': ' + this.props.data.length}</p>
        </div>
        <div className='col-md-6'>
          {this.renderDefButtons()}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          {this.renderTable(this.props.data, Color)}
        </div>
      </div>
    </section>
  );

  renderCreating = () => (
    <section>
      <div className='row'>
        <div className='col-md-12'>
          <section className='content'>
            <div className='box box-info'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Color information</h3>
              </div>
              <form className='form-horizontal'>
                <div className='box-body'>
                  {this.renderInputs()}
                </div>
                <div className='box-footer'>
                  {this.renderCreatingButtons()}
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>

    </section>
  );

  renderEditing = () => (
    <section>
      <div className='row'>
        <div className='col-md-12'>
          <section className='content'>
            <div className='box box-info'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Color information</h3>
              </div>
              <form className='form-horizontal'>
                <div className='box-body'>
                  {this.renderInputs()}
                </div>
                <div className='box-footer'>
                  {this.renderEditingButtons()}
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </section>
  );

  render() {
    const {loading, errors} = this.props;

    return (
      <main>
        {loading ? <div className='loader'></div> : <div className='loaderDone'></div>}
        <div className='content-header'>
          <h1>Colors</h1>
        </div>
        {
          errors.length === 0 ? null : errors.map((err, k) => <div key={k} className='alert alert-danger'>
            Error:
            {err}</div>)
        }
        {this.renderPage()}
      </main>
    );
  }
}
