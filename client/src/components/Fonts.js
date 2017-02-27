import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';
import * as FontModel from '../../../common/models/font.json';
const Font = FontModel.properties;

export default class extends Component {
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
    restoreTableState: PropTypes.func.isRequired,
    uploadFontFile: PropTypes.func.isRequired,
    uploadVector: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.restoreTableState();
    this.props.fetchData();
  }

  renderTableHeadings = object => (
    Object.getOwnPropertyNames(object).map((prop, i) => {
      if (prop === ID_PROP) {
        return null;
      } else {
        return <th key={i}>{prop}</th>;
      }
    })
  );

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  renderTableSortRow = object => (
    <tr key='sortRow'>
      {Object.getOwnPropertyNames(object).map((prop, i) => {
        if (prop === ID_PROP) {
          return null;
        } else {
          return <td key={i}>
            <FormControl type='text'
                         value={this.props.objectHolder[prop]}
                         onChange={e => this.handleSelectedObjectChange(prop, e)}
            />
          </td>;
        }
      })}
    </tr>
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
            onClick={() => this.handleEdit(item)}>
          {
            Object.getOwnPropertyNames(object).map((prop, j) => {
              if (prop === ID_PROP) {
                return null;
              } else {
                return <td key={j}>{item[prop]}</td>;
              }

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
      <button type='button' className='btn btn-default'
              onClick={this.handleAddNew}>Add new font
      </button>
    </div>
  );

  renderEditingButtons = () => (
    <div>
      <div className='pull-left'>
        <button type='button' className='btn btn-default'
                onClick={this.handleCancelBtnClick}>Cancel
        </button>
        <button type='button' className='btn btn-default'>Reset</button>
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
      this.props.enableEditing();
      this.props.selectRow(object);
    }
  };

  handleAddNew = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableCreating();
    }
  };

  handleDeleteBtnClick = () => {
    if (this.props.status === STATUS_EDITING) {
      this.props.deleteEntity(this.props.objectHolder.id);
      this.props.enableDefaultStatus();
    }
  };

  handleSaveBtnClick = redirect => {
    if (this.props.status === STATUS_EDITING) {
      const properties = Object.getOwnPropertyNames(Font);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
        if (prop === 'fileNormal' || prop === 'fileBold' || prop === 'fileItalic' || prop === 'fileBoldItalic' || prop === 'vector') {
          if (this.props.objectHolder[prop] !== undefined) {
            this.handleFileUpload(prop, this.props.objectHolder[prop]);
            entity[prop] = this.props.objectHolder[prop].name;
          }
        }
      });
      this.props.editEntity(this.props.objectHolder.id, entity);
      if (redirect) {
        this.props.enableDefaultStatus()
      }
    } else if (this.props.status === STATUS_CREATING) {
      const properties = Object.getOwnPropertyNames(Font);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
        if (prop === 'fileNormal' || prop === 'fileBold' || prop === 'fileItalic' || prop === 'fileBoldItalic' || prop === 'vector') {
          if (this.props.objectHolder[prop] !== undefined) {
            this.handleFileUpload(prop, this.props.objectHolder[prop]);
            entity[prop] = this.props.objectHolder[prop].name;
          }
        }
      });
      this.props.createEntity(entity);
      this.props.enableDefaultStatus();
    }
  };

  handleCancelBtnClick = () => {
    if (this.props.status !== STATUS_DEFAULT) {
      this.props.enableDefaultStatus();
    }
  };

  handleFileUpload = (prop, file) => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      if(prop === 'fileNormal' || prop === 'fileBold' || prop === 'fileItalic' || prop === 'fileBoldItalic')
      this.props.uploadFontFile(file);
      if(prop === 'vector')
        this.props.uploadVector(file);
    }
  };

  handleFileChoose = (prop, e) => {
    this.props.setEditingObjectProperty(prop, e.target.files[0]);
  };

  renderInputs = () => (
    Object.getOwnPropertyNames(Font).map((prop, key) => {
      if (prop === ID_PROP) {
        return null;
      }

      if (prop === 'fileNormal' || prop === 'fileBold' || prop === 'fileItalic' || prop === 'fileBoldItalic' || prop === 'fileBoldItalic') {

        return ( <div key={key} className='form-group'>
          <div className='col-md-2'>
            {prop}
          </div>
          <div className='col-md-10'>
            <input type='file' className='form-control' accept='.woff'
                   onChange={e => this.handleFileChoose(prop, e)}/>
          </div>
        </div>);
      } if (prop === 'vector') {
        return ( <div key={key} className='form-group'>
          <div className='col-md-2'>
            {prop}
          </div>
          <div className='col-md-10'>
            <input type='file' className='form-control'
                   onChange={e => this.handleFileChoose(prop, e)}/>
          </div>
        </div>);
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
          <p>{this.props.title + ': ' + this.props.data.length}</p>
        </div>
        <div className='col-md-6'>
          {this.renderDefButtons()}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          {this.renderTable(this.props.data, Font)}
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
                <h3 className='box-title'>Font information</h3>
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
                <h3 className='box-title'>Font information</h3>
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
    const {loading, error} = this.props;

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
        <div className='content-header'>
          <h1>Navigator</h1>
        </div>
        {this.renderPage()}
      </main>
    );
  }
}
