import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../../definitions';
import * as ColorModel from '../../../../common/models/color.json';
const Color = ColorModel.properties;
import * as ColorgroupModel from '../../../../common/models/colorgroup.json';
const Colorgroup = ColorgroupModel.properties;

export default class Table extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    error: PropTypes.string,
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
    restoreTableState: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.restoreTableState();
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
      <tr>{Object.getOwnPropertyNames(Colorgroup).map((prop, i) => {
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

  renderTableData = (data, object) => {
    if (!data.length) {
      return null;
    }

    return data.map((item, k) => {

      if (this.props.status === STATUS_EDITING && item[ID_PROP] === this.props.objectHolder.id) {
        return (
          <tr key={k}>
            {Object.getOwnPropertyNames(object).map((prop, j) => {
              if (prop === ID_PROP) {
                return null;
              }

              return (
                <td key={j}><FormControl type='text'
                                         value={this.props.objectHolder[prop]}
                                         onChange={e => this.handleSelectedObjectChange(prop, e)}/>
                </td>
              );
            })}
          </tr>
        );
      }

      return (
        <tr key={k}
            className={this.props.objectHolder && item[ID_PROP] === this.props.objectHolder.id ?
              'selected' : null}
            onClick={() => this.handleRowClick(item)}>
          {Object.getOwnPropertyNames(object).map((prop, j) => {
            if (prop === ID_PROP) {
              return null;
            } else {
              if (prop === 'value') {
                return <td key={j}>
                  {item[prop]}
                </td>;
              }
              return <td key={j}>{item[prop]}</td>;
            }
          })}
        </tr>
      );
    });
  };

  renderTable = (data, object) => (
    <div className='panel panel-default'>
      <div style={{'maxHeight': '60vh', 'overflowY': 'scroll'}}>
        <tb className='table-responsive'>
          <table className='table no-margin table-hover'>
            <thead>
            <tr>
              {this.renderTableHeadings(object)}
            </tr>
            </thead>
            <tbody>
            {this.props.status === STATUS_CREATING ? this.renderCreatingRow() : null}
            {this.renderTableData(data, object)}
            </tbody>
          </table>
        </tb>
      </div>
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

  handleRowClick = object => {
    if (this.props.status !== STATUS_EDITING) {
      this.props.selectRow(object);

    }
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
      const properties = Object.getOwnPropertyNames(Colorgroup);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
      });
      this.props.editEntity(this.props.objectHolder.id, entity);
    } else if (this.props.status === STATUS_CREATING) {
      const properties = Object.getOwnPropertyNames(Colorgroup);
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
    const {data, loading, error, title} = this.props;

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
            <div className='col-lg-2'>
            </div>
            <div className='col-lg-8'>
              {this.renderTable(data, Colorgroup)}
              {this.renderButtons()}
              <p>{title + ': ' + data.length}</p>
            </div>
            <div className='col-lg-2'>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

