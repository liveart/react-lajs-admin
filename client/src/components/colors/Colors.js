import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../../definitions';
import {ChromePicker} from 'react-color';
import * as ColorModel from '../../../../common/models/color.json';

const Color = ColorModel.properties;
import * as ColorgroupModel from '../../../../common/models/colorgroup.json';
const Colorgroup = ColorgroupModel.properties;

export default class Table extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    secondaryData: PropTypes.arrayOf(PropTypes.any),
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    error: PropTypes.string,
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
    restoreTableState: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.restoreTableState();
    this.props.fetchSecondaryData();
    this.props.fetchData();
  }

  renderTableHeadings = object => {
    return Object.getOwnPropertyNames(object).map((prop, i) => {
      if (prop === ID_PROP) {
        return null;
      } else {
        return <th key={i}>{prop}</th>;
      }
    });
  };

  renderCreatingRow = () => {
    return (
      <tr>{Object.getOwnPropertyNames(Color).map((prop, i) => {
        if (prop === ID_PROP) {
          return null;
        }

        return <td key={i}><FormControl type='text'
                                        value={this.props.objectHolder[prop]}
                                        onChange={e => this.handleSelectedObjectChange(prop, e)}/>
        </td>;
      })}
      </tr>
    );
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  handleColorChange = color => {
    this.props.setEditingObjectProperty('value', color.hex);
  };

  renderTableSortRow = object => (
    Object.getOwnPropertyNames(object).map((prop, i) => {
      if (prop === ID_PROP) {
        return null;
      } else {
        return <td key={i} style={{padding: '2px'}}>
          <FormControl type='text'
                       value={this.props.objectHolder[prop]}
                       onChange={e => this.handleSelectedObjectChange(prop, e)}
          /></td>;
      }
    })
  );

  sortRows = (data, object) => {
    const rows = [];
    for (let i = 0; i < data.length; ++i) {
      let add = true;
      Object.getOwnPropertyNames(object).map(prop => {
        if (typeof this.props.objectHolder[prop] !== 'undefined' && !(data[i])[prop].includes(this.props.objectHolder[prop])) {
          add = false;
        }
      });

      if (add) {
        rows.push(data[i]);
      }
    }
    return rows;
  };

  renderTableData = (data, object) => {
    if (!data.length) {
      return null;
    }

    const rows = this.sortRows(data, object);

    return rows.map((item, k) => {

      return (
        <tr key={k}
            className={this.props.objectHolder && item[ID_PROP] === this.props.objectHolder.id ? 'selected' : null}
            onClick={() => this.handleRowClick(item)}>
          {
            Object.getOwnPropertyNames(object).map((prop, j) => {
              if (prop === ID_PROP) {
                return null;
              } else {
                if (!(typeof this.props.selected2RowId === 'object' && !this.props.selected2RowId)) {
                  if (item['colorgroup_name'] !== this.props.secondaryData.filter(
                      group => group.id === this.props.selected2RowId)[0].name) {
                    return null;
                  }
                }

                if (prop === 'value') {
                  return <td key={j}>
                    {item[prop]}
                    <span className='label label-default pull-right' style={{background: item[prop]}}>{' '}</span>
                  </td>;
                }
                return <td key={j}>{item[prop]}</td>;
              }

            })
          }
        </tr>
      );
    });
  };

  renderSecondaryTableData = (data, object) => {
    if (!data.length) {
      return null;
    }

    return data.map((item, k) => (
      <tr key={k} className={item[ID_PROP] === this.props.selected2RowId ? 'selected' : null}
          onClick={() => this.handleRowClickSecondTable(item[ID_PROP])}>
        {Object.getOwnPropertyNames(object).map((prop, j) => {
          if (prop === ID_PROP) {
            return null;
          } else {
            return (
              <td key={j}>{item[prop]}</td>
            );
          }
        })}
      </tr>
    ));
  };

  renderTable = (data, object) => (
    <div className='panel panel-default'>
      <tb className='table-responsive'>
        <table className='table no-margin table-hover'>
          <thead>
          <tr>
            {this.renderTableHeadings(object)}
          </tr>
          </thead>
          <tbody>
          {this.renderTableSortRow(object)}
          {this.props.status === STATUS_CREATING ? this.renderCreatingRow() : null}
          {this.renderTableData(data, object)}
          </tbody>
        </table>
      </tb>
    </div>
  );

  renderButtons = () => (
    this.props.status === STATUS_EDITING || this.props.status === STATUS_CREATING ?
      this.renderEditingButtons() : this.renderDefButtons()
  );

  renderDefButtons = () => (
    <div className='pull-right'>
      <a className='btn btn-app' onClick={this.handleCreateBtnClick}><i className='fa fa-plus'/>Add
      </a>
      <a className='btn btn-app' onClick={this.handleEditBtnClick}><i className='fa fa-pencil-square-o'/>Edit
      </a>
      <a className='btn btn-app' onClick={this.handleDeleteBtnClick}><i className='fa fa-trash-o'/>Delete
      </a>
      <a className='btn btn-app' onClick={() => {
        this.props.fetchData();
        this.props.fetchSecondaryData();
      }}>
        <i className='fa fa-refresh'/>Sync
      </a>
    </div>
  );

  renderEditingButtons = () => (
    <div className='pull-right'>
      <a className='btn btn-app' onClick={this.handleSaveBtnClick}><i className='fa fa-check'/>Save</a>
      <a className='btn btn-app' onClick={this.handleCancelBtnClick}><i className='fa fa-ban'/>Cancel</a>
    </div>
  );

  renderSecondaryTable = (data, object) => (
    <div className='panel panel-default'>
      <div style={{'maxHeight': '60vh', 'overflowY': 'scroll'}}>
        <div className='table-responsive'>
          <table className='table no-margin'>
            <thead>
            <tr>
              {this.renderTableHeadings(object)}
            </tr>
            </thead>
            <tbody>
            {this.renderSecondaryTableData(data, object)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  renderColorInfoBox = object => (
    this.props.status === STATUS_EDITING || this.props.status === STATUS_CREATING ?
      <div>
        <ChromePicker color={this.props.objectHolder.value} onChange={this.handleColorChange}/>
      </div>
      : null
  );

  handleRowClick = object => {
    /*
    if (this.props.status !== STATUS_EDITING) {
      this.props.selectRow(object);

    }
    */
  };

  handleRowClickSecondTable = id => {
    this.props.enableDefaultStatus();
    this.props.selectSecondaryRow(id);
  };

  handleCreateBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableCreating();
    }
  };

  handleEditBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT
      && !(typeof this.props.objectHolder === 'object' && !this.props.objectHolder)) {
      this.props.enableEditing();
    }
  };

  handleDeleteBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.deleteEntity(this.props.objectHolder.id);
      setTimeout(this.props.fetchData, 2000);
    }
  };

  handleSaveBtnClick = () => {
    if (this.props.status === STATUS_EDITING) {
      const properties = Object.getOwnPropertyNames(Color);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
      });
      this.props.editEntity(this.props.objectHolder.id, entity);
    } else if (this.props.status === STATUS_CREATING) {
      const properties = Object.getOwnPropertyNames(Color);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
      });
      this.props.createEntity(entity);
    }
    this.props.enableDefaultStatus();
    setTimeout(this.props.fetchData, 2000);
  };

  handleCancelBtnClick = () => {
    if (this.props.status !== STATUS_DEFAULT) {
      this.props.enableDefaultStatus();
    }
  };

  render() {
    const {secondaryData, data, loading, error, title, secondaryTitle} = this.props;

    if (loading) {
      return (
        <main>
          <div className='loader'></div>
          <section className='content-header'>
            <h1>Loading...</h1>
          </section>
          <section className='content'>
          </section>
        </main>
      );
    }

    if (error) {
      return (<div className='alert alert-danger'>Error: {error}</div>);
    }

    return (
      <main>
        <section className='content-header'>
          <h1>Navigator</h1>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-lg-12'>
              <p>{title + ': ' + data.length}</p>
              {this.renderTable(data, Color)}
            </div>
          </div>
        </section>
      </main>
    );
  }
}
