import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';

export default class ViewAbstract extends Component {
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
    token: PropTypes.string,
    objectSample: PropTypes.object.isRequired,
    sortingSupport: PropTypes.bool,
    hiddenProperties: PropTypes.array,
    renderHeadings: PropTypes.func
  };

  componentWillMount() {
    this.props.restoreTableState(this.props.objectSample);
    this.props.fetchData();
  }

  renderTableHeadings = () => {
    if (typeof this.props.renderHeadings === 'function') {
      return this.props.renderHeadings();
    }

    return Object.getOwnPropertyNames(this.props.objectSample).map((prop, i) => {
      if (this.props.hiddenProperties && this.props.hiddenProperties.indexOf(prop) > -1) {
        return null;
      }

      return <th key={i}>{prop}</th>;
    });
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  renderTableSortRow = () => {
    if (!this.props.sortingSupport || this.props.data.length === 0) {
      return null;
    }

    return (
      <tr key='sortRow'>
        {Object.getOwnPropertyNames(this.props.objectSample).map((prop, i) => {
          if (this.props.hiddenProperties && this.props.hiddenProperties.indexOf(prop) > -1) {
            return null;
          }

          if (this.props.objectHolder[prop].type === 'boolean') {
            return <td key={i}><select style={{width: '100%'}}
                                       value={this.props.objectHolder[prop]}
                                       onChange={e => this.handleSelectedObjectChange(prop, e)}>

              {this.props.objectHolder[prop].default ||
              (this.props.objectHolder[prop].required && this.props.objectHolder[prop].required === true) ?
                <option key='defGroup' value={''}>...</option>
                : null
              }
              {this.props.secondaryData.map((cg, key) => (
                <option key={key} value={cg.id}>{cg.name}</option>
              ))}
            </select></td>
          }

          return (
            <td key={i}>
              <FormControl type='text'
                           value={this.props.objectHolder[prop]}
                           onChange={e => this.handleSelectedObjectChange(prop, e)}
              />
            </td>);
        })
        }
      </tr>);
  };

  sortRows = () => {
    const rows = [];
    for (let i = 0; i < this.props.data.length; ++i) {
      let add = true;

      Object.getOwnPropertyNames(this.props.objectSample).map(prop => {
        if (typeof (this.props.data[i])[prop] !== 'object') {
          if (typeof (this.props.data[i])[prop] === 'undefined') {
            add = this.props.objectHolder[prop] === '';
          } else if (typeof (this.props.data[i])[prop] === 'boolean') {
            add = true;
          } else if (!(this.props.data[i])[prop].includes(this.props.objectHolder[prop])) {
            add = false;
          }
        }
      });

      if (add) {
        rows.push(this.props.data[i]);
      }
    }
    return rows;
  };

  renderTableData = () => {
    if (!this.props.data.length) {
      return null;
    }

    const rows = this.sortRows();

    return rows.map((item, k) => {

      return (
        <tr key={k} onClick={() => this.handleEdit(item)}>
          {
            Object.getOwnPropertyNames(this.props.objectSample).map((prop, j) => {
              if (this.props.hiddenProperties && this.props.hiddenProperties.includes(prop)) {
                return null;
              }
              if (typeof item[prop] === 'object') {
                return <td key={j}></td>;
              }

              return <td key={j}>{item[prop]}</td>;
            })
          }
        </tr>
      );
    });
  };

  renderTable = () => (
    <div className='panel panel-default'>
      <tb className='table-responsive'>
        <table className='table no-margin table-hover table-bordered'>
          <thead>
          <tr key='headTrKey'>
            {this.renderTableHeadings()}
          </tr>
          </thead>
          <tbody>
          {this.renderTableSortRow()}
          {this.renderTableData()}
          </tbody>
        </table>
      </tb>
    </div>
  );

  renderDefButtons = () => (
    <div className='pull-right'>
      <button type='button' className='btn btn-primary' style={{marginBottom: '3px'}}
              onClick={this.handleAddNew}>Add new {this.props.title}
      </button>
      <button type='button' className='btn btn-default' style={{marginBottom: '3px'}}
              onClick={() => this.props.restoreTableState(this.props.objectSample)}>Reset filter
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
      this.props.enableEditing(this.props.objectSample);
      this.props.selectRow(object);
    }
  };

  handleAddNew = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableCreating(this.props.objectSample);
    }
  };

  handleDeleteBtnClick = () => {
    if (this.props.status === STATUS_EDITING) {
      this.props.deleteEntity(this.props.objectHolder.id, this.props.token);
      this.props.enableDefaultStatus();
      this.props.restoreTableState(this.props.objectSample);
    }
  };

  handleSaveBtnClick = redirect => {
    if (this.props.status === STATUS_EDITING) {
      const properties = Object.getOwnPropertyNames(this.props.objectSample);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
      });
      this.props.editEntity(this.props.objectHolder.id, entity, this.props.token);
      if (redirect) {
        this.props.enableDefaultStatus();
        this.props.restoreTableState(this.props.objectSample);
      }
    } else if (this.props.status === STATUS_CREATING) {
      const properties = Object.getOwnPropertyNames(this.props.objectSample);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
      });
      this.props.createEntity(entity, this.props.token);
      this.props.enableDefaultStatus();
      this.props.restoreTableState(this.props.objectSample);
    }
  };

  handleCancelBtnClick = () => {
    if (this.props.status !== STATUS_DEFAULT) {
      this.props.enableDefaultStatus();
      this.props.restoreTableState(this.props.objectSample);
    }
  };

  renderInputs = () => (
    Object.getOwnPropertyNames(this.props.objectSample).map((prop, key) => {
      if (prop === ID_PROP) {
        return null;
      } else {
        return (
          <div key={key} className='form-group'>
            <div className='col-md-2'>
              {prop}
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
          <p>{`${this.props.title} entries: ${this.props.data.length}`}</p>
        </div>
        <div className='col-md-6'>
          {this.renderDefButtons()}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          {this.renderTable()}
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
                <h3 className='box-title'>{`${this.props.title} information`}</h3>
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
                <h3 className='box-title'>{`${this.props.title} information`}</h3>
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
          <h1>{`${this.props.title}s`}</h1>
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
