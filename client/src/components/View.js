import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {
  ID_PROP,
  STATUS_EDITING,
  STATUS_CREATING,
  STATUS_DEFAULT,
  STATUS_CONFIRM_DELETE,
  STATUS_IMPORT_JSON,
  RELATIVE_URL
} from '../definitions';
import {checkNotEmpty} from '../FormValidation';
import * as _ from 'lodash';
const IMPORT_URL_OPTION = 'Import';
const KEEP_URL_OPTION = 'Keep';

export default class ViewAbstract extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    pluralTitle: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    errors: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    objectHolder: PropTypes.object,
    status: PropTypes.string.isRequired,
    selectRow: PropTypes.func.isRequired,
    enableEditing: PropTypes.func.isRequired,
    enableCreating: PropTypes.func.isRequired,
    enableDefaultStatus: PropTypes.func.isRequired,
    /**
     * Function that handles Json import if it's supported.
     * @param text json raw text to import
     */
    handleImportJson: PropTypes.func,
    createEntity: PropTypes.func.isRequired,
    editEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    setEditingObjectProperty: PropTypes.func.isRequired,
    restoreTableState: PropTypes.func.isRequired,
    token: PropTypes.string,
    objectSample: PropTypes.object.isRequired,
    handleDelete: PropTypes.func,
    deleteConfirmation: PropTypes.bool,
    enableConfirmDelete: PropTypes.func,
    renderDeleteConfirmationDialog: PropTypes.func,
    renderDeleteConfirmationButtons: PropTypes.func,
    /**
     * Function to enable related state.
     * Defines if Json import is supported.
     */
    enableImportJson: PropTypes.func,
    sortingSupport: PropTypes.bool,
    hiddenProperties: PropTypes.array,
    hiddenInputs: PropTypes.array,
    changedInputs: PropTypes.object,
    customInputs: PropTypes.object,
    representations: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {empty: [], json: '', baseUrl: '', urlSelect: IMPORT_URL_OPTION};
    if (!String.prototype.capitalizeFirstLetter) {
      String.prototype.capitalizeFirstLetter = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
      };
    }
  }

  componentWillUpdate() {
    if (this.state.empty.length) {
      this.setState({...this.state, empty: []});
    }
  }

  componentWillMount() {
    this.props.restoreTableState(this.props.objectSample);
    this.props.fetchData();
  }

  renderTableHeadings = () => {
    return Object.getOwnPropertyNames(this.props.objectSample).map((prop, i) => {
      if (this.props.hiddenProperties && this.props.hiddenProperties.indexOf(prop) > -1) {
        return null;
      }

      if (this.props.representations && this.props.representations.hasOwnProperty(prop)
        && this.props.representations[prop].header) {
        return <th key={i}>{this.props.representations[prop].header}</th>;
      }

      return <th key={i}>{prop.capitalizeFirstLetter()}</th>;
    });
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };
  handleSelectedStateChange = event => {
    this.setState({...this.state, urlSelect: event.target.value, baseUrl: ''});
  };

  renderTableSortRow = () => {
    if (!this.props.sortingSupport || this.props.data.length === 0) {
      return null;
    }

    return (
      <tr>
        {Object.getOwnPropertyNames(this.props.objectSample).map((prop, i) => {
          if (this.props.hiddenProperties && this.props.hiddenProperties.indexOf(prop) > -1) {
            return null;
          }

          if (this.props.representations && this.props.representations.hasOwnProperty(prop)) {
            if (!this.props.representations[prop].sortable) {
              return <td key={i}></td>;
            } else if (this.props.representations[prop].sortElem) {
              return <td key={i}>{this.props.representations[prop].sortElem}</td>;
            }
          }


          return (
            <td key={i}><FormControl type='text'
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
        if (!add) {
          return;
        }
        if (this.props.hiddenProperties && this.props.hiddenProperties.indexOf(prop) > -1) {
          add = true;
        } else if (typeof this.props.objectHolder[prop] !== 'object') {
          if (typeof (this.props.data[i])[prop] === 'undefined') {
            add = this.props.objectHolder[prop] === '';
          } else if (typeof (this.props.data[i])[prop] === 'boolean') {
            add = true;
          } else if (!_.includes((this.props.data[i])[prop], this.props.objectHolder[prop])) {
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

    return rows.map(item => {

      return (
        <tr key={item.id} onClick={() => this.handleEdit(item)}>
          {
            Object.getOwnPropertyNames(this.props.objectSample).map(prop => {
              if (this.props.hiddenProperties && this.props.hiddenProperties.indexOf(prop) > -1) {
                return null;
              }

              if (this.props.representations.hasOwnProperty(prop)) {
                return <td key={String(item.id + prop)}>{this.props.representations[prop].getElem(item[prop])}</td>;
              }

              if (typeof item[prop] === 'object') {
                return <td key={String(item.id + prop)}/>;
              }

              return <td key={String(item.id + prop)}>{item[prop]}</td>;
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
          <tr>
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
      <button type='button' className='btn btn-primary' style={{marginBottom: 6}}
              onClick={this.handleAddNew}>Add new {this.props.title}
      </button>
      {typeof this.props.enableImportJson === 'function' ?
        <button type='button' className='btn btn-default' style={{marginBottom: 6}}
                onClick={this.handleImportFromJson}>Import from JSON
        </button> : null}
      <button type='button' className='btn btn-default' style={{marginBottom: 6}}
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

  renderImportJsonView = () =>
    <section>
      <div className='row'>
        <div className='col-md-12'>
          <section className='content'>
            <div className='box box-info'>
              <div className='box-header with-border'>
                <h3 className='box-title'>{`${this.props.title} information`}</h3>
              </div>
              <form className='form-horizontal'>

                {this.renderImportJsonInputs()}

                <div className='box-footer'>
                  {this.renderCreatingButtons()}
                </div>
                {this.state.empty.length ?
                  <div className='text-red pull-right'>Please fill all the required fields.</div> : null}
              </form>
            </div>
          </section>
        </div>
      </div>
    </section>;

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

  handleImportFromJson = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableImportJson();
    }
  };

  handleDeleteBtnClick = () => {
    if (this.props.status === STATUS_EDITING) {
      if (typeof this.props.deleteConfirmation === 'boolean' && this.props.deleteConfirmation === true) {
        this.props.enableConfirmDelete();
      } else {
        if (typeof this.props.handleDelete === 'function') {
          this.props.handleDelete(this.props.objectHolder.id);
        } else {
          this.props.deleteEntity(this.props.objectHolder.id, this.props.token);
        }
        this.props.enableDefaultStatus();
        this.props.restoreTableState(this.props.objectSample);
      }
    }
  };

  handleSaveBtnClick = redirect => {
    if (this.props.status === STATUS_IMPORT_JSON) {
      this.props.handleImportJson(this.state.json, this.state.baseUrl);
      this.props.enableDefaultStatus();
      this.props.restoreTableState(this.props.objectSample);
      this.setState({...this.state, json: '', baseUrl: ''});
    } else {
      const properties = Object.getOwnPropertyNames(this.props.objectSample);
      const empty = properties.filter(p => p !== ID_PROP &&
      (!checkNotEmpty(this.props.objectHolder[p]) && this.props.objectSample[p].required));
      if (empty.length) {
        this.setState({...this.state, empty: [...empty]});
        return;
      }
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          if (this.props.status === STATUS_CREATING && this.props.objectHolder[prop] === '') {
            return;
          }

          if (this.props.changedInputs && this.props.changedInputs[prop]
            && typeof this.props.changedInputs[prop].saveF === 'function') {
            if (this.props.objectHolder[prop]) {
              this.props.changedInputs[prop].saveF(this.props.objectHolder[prop]);
              if (typeof this.props.changedInputs[prop].getName === 'function') {
                entity[prop] = this.props.changedInputs[prop].getName(this.props.objectHolder[prop].name);
              } else {
                entity[prop] = this.props.objectHolder[prop].name;
              }
            }
          } else {
            entity[prop] = this.props.objectHolder[prop];
          }
        }
      });
      if (this.props.status === STATUS_EDITING) {
        this.props.editEntity(this.props.objectHolder.id, entity, this.props.token);
        if (redirect) {
          this.props.enableDefaultStatus();
          this.props.restoreTableState(this.props.objectSample);
        }
      } else if (this.props.status === STATUS_CREATING) {

        this.props.createEntity(entity, this.props.token);
        this.props.enableDefaultStatus();
        this.props.restoreTableState(this.props.objectSample);
      }
    }
  };

  handleCancelBtnClick = () => {
    if (this.props.status !== STATUS_DEFAULT) {
      this.props.enableDefaultStatus();
      this.props.restoreTableState(this.props.objectSample);
      this.setState({...this.state, json: '', baseUrl: ''});
    }
  };

  renderInputs = () => Object.getOwnPropertyNames(this.props.objectSample).map((prop, key) => {
    if (this.props.hiddenInputs.indexOf(prop) > -1) {
      return null;
    }
    return (
      <div key={key} className='form-group'>
        <div className='col-md-2'>
          <p className={'' + (this.props.objectSample[prop].required ? 'req' : '')}>
            {prop.capitalizeFirstLetter()}
          </p>
        </div>
        <div className='col-md-10'>
          {
            this.props.changedInputs && this.props.changedInputs.hasOwnProperty(prop) ?
              this.props.changedInputs[prop].elem :
              <input type='text' className='form-control'
                     value={this.props.objectHolder[prop]}
                     onChange={e => this.handleSelectedObjectChange(prop, e)}/>
          }

          {
            this.props.status === STATUS_EDITING &&
            this.props.representations && this.props.representations.hasOwnProperty(prop) ?
              <div
                style={{marginTop: 3}}>{this.props.representations[prop].getElem(this.props.objectHolder[prop])}</div> :
              null
          }
        </div>
      </div>
    );
  });

  renderImportJsonInputs = () => (
    <div className='box-body'>
      <div className='form-group'>
        <div className='col-md-3'>
          <p>Import from file</p>
        </div>
        <div className='col-md-9'>
          <input type='file' className='form-control' accept='.json'
                 onChange={this.handleFileChoose}/>
        </div>
      </div>
      <div className='form-group'>
        <div className='col-md-3'>
          <select className='form-control'
                  onChange={this.handleSelectedStateChange}
                  value={this.state.urlSelect}>
            <option value={IMPORT_URL_OPTION}>Upload files to server</option>
            <option value={KEEP_URL_OPTION}>Keep original URL's</option>
          </select>
        </div>
        <div className='col-md-9'>
          {this.state.urlSelect === IMPORT_URL_OPTION ?
            <input disabled type='text' className='form-control'
                   value=''/> :
            <input type='text' className='form-control'
                   placeholder='Base url for links. Requires protocol (example http://site.com/)'
                   value={this.state.baseUrl}
                   onChange={this.handleBaseUrlChange}/>}
        </div>
      </div>
      <textarea className='form-control' style={{marginBottom: 6}} rows={15}
                value={this.state.json}
                onChange={this.handleJsonChange}/>
    </div>
  );

  handleJsonChange = e => this.setState({...this.state, json: e.target.value});

  handleBaseUrlChange = e => this.setState({...this.state, baseUrl: e.target.value});


  handleFileChoose = e => {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        ...this.state,
        json: reader.result
      });
    };
    reader.readAsText(e.target.files[0]);
  };

  renderCustomInputs = () => {
    if (!this.props.customInputs) {
      return null;
    }
    return Object.getOwnPropertyNames(this.props.customInputs).map((prop, key) => {
      return (
        <div key={key} className='form-group'>
          <div className='col-md-2'>
            <p className={'' + (this.props.customInputs[prop].required ? 'req' : '')}>
              {prop.capitalizeFirstLetter()}
            </p>
          </div>
          <div className='col-md-10'>
            {
              this.props.customInputs[prop].elem
            }
          </div>
        </div>
      );
    });
  };

  renderPage = () => {
    if (this.props.status === STATUS_DEFAULT) {
      return this.renderDefault();
    } else if (this.props.status === STATUS_CREATING) {
      return this.renderChanging();
    } else if (this.props.status === STATUS_EDITING) {
      return this.renderChanging();
    } else if (this.props.status === STATUS_CONFIRM_DELETE) {
      return this.renderDeleteConfirmation();
    } else if (this.props.status === STATUS_IMPORT_JSON) {
      return this.renderImportJsonView();
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

  renderChanging = () => (
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
                  {this.renderCustomInputs()}
                </div>
                <div className='box-footer'>
                  {this.props.status === STATUS_CREATING ? this.renderCreatingButtons() : null}
                  {this.props.status === STATUS_EDITING ? this.renderEditingButtons() : null}
                </div>
                {this.state.empty.length ?
                  <div className='text-red pull-right'>Please fill all the required fields.</div> : null}
              </form>
            </div>
          </section>
        </div>
      </div>
    </section>
  );

  renderDeleteConfirmation = () => (
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
                  {this.renderDeleteConfirmationDialog()}
                </div>
                <div className='box-footer'>
                  {this.renderDeleteConfirmationButtons()}
                </div>
                {this.state.empty.length ?
                  <div className='text-red pull-right'>Please fill all the required fields.</div> : null}
              </form>
            </div>
          </section>
        </div>
      </div>
    </section>
  );

  renderDeleteConfirmationDialog = () => {
    if (typeof this.props.renderDeleteConfirmationDialog === 'function') {
      return this.props.renderDeleteConfirmationDialog();
    }
  };

  renderDeleteConfirmationButtons = () => {
    if (typeof this.props.renderDeleteConfirmationButtons === 'function') {
      return this.props.renderDeleteConfirmationButtons();
    }
  };

  render() {
    const {loading, errors} = this.props;

    return (
      <div>
        {loading ? <div className='loader'></div> : <div className='loaderDone'></div>}
        <div className='content-header'>
          <h1>{this.props.pluralTitle || `${ this.props.title}s`}</h1>
        </div>
        {
          errors.length === 0 ? null : errors.map((err, k) => <div key={k} className='alert alert-danger'>
            Error:
            {' ' + err.message}</div>)
        }
        {this.renderPage()}
      </div>
    );
  }
}
