import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import {
  ID_PROP,
  STATUS_EDITING,
  STATUS_CREATING,
  STATUS_DEFAULT,
  STATUS_CONFIRM_DELETE,
  STATUS_IMPORT_JSON,
  ElementTypes
} from '../../definitions';
import {checkNotEmpty} from '../../FormValidation';
import * as _ from 'lodash';
import ReactTooltip from 'react-tooltip';
const LEAVE_URL_OPTION = 'Import';
const KEEP_URL_OPTION = 'Keep';
const INITIAL_STATE = {empty: [], json: '', baseUrl: '', urlSelect: LEAVE_URL_OPTION};

export default class ViewAbstract extends Component {


  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
    this.definePrototypes();
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

  componentDidUpdate() {
    if (this.props.errors && this.props.errors.length) {
      _.forEach(this.props.errors, prop => this.props.addNotification('error', prop));
    }

    if (this.props.message) {
      this.props.addNotification('success', this.props.message);
    }

    if (this.state.empty.length) {
      this.props.addNotification('error', 'Please, fill all the required fields',
        'Check ' + this.state.empty.join(', ') + '.');
      this.setState({...this.state, empty: []});
    }
  }

  definePrototypes = () => {
    if (!String.prototype.capitalizeFirstLetter) {
      String.prototype.capitalizeFirstLetter = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
      };
    }
  };

  handleSelectedObjectChange = (propertyName, event) =>
    this.props.setEditingObjectProperty(propertyName, event.target.value);

  handleSelectedStateChange = event =>
    this.setState({...this.state, urlSelect: event.target.value, baseUrl: ''});

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

  renderImportJsonButtons = () => (
    <div>
      <div className='pull-left'>
        <button type='button' className='btn btn-default'
                onClick={this.handleCancelBtnClick}>Cancel
        </button>
      </div>
      <div className='pull-right'>
        <button type='button' className='btn btn-primary'
                onClick={this.handleSaveImportBtnClick}>Import
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
                  {this.renderImportJsonButtons()}
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </section>;

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
    const properties = Object.getOwnPropertyNames(this.props.objectSample);
    const empty = properties.filter(p => p !== ID_PROP &&
    (!checkNotEmpty(this.props.objectHolder[p]) && this.props.objectSample[p].required));
    if (empty.length) {
      this.setState({...this.state, empty: [...empty]});
      return;
    }
    let entity = {};
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
              entity[prop] = this.props.changedInputs[prop].getName(this.props.objectHolder[prop]);
            } else {
              entity[prop] = this.props.objectHolder[prop];
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
  };

  handleSaveImportBtnClick = () =>
    this.props.handleImportJson(this.state.json, this.state.baseUrl, this.state.urlSelect);

  handleCancelBtnClick = () => {
    if (this.props.status !== STATUS_DEFAULT) {
      this.props.enableDefaultStatus();
      this.props.restoreTableState(this.props.objectSample);
      this.setState({...this.state, json: '', baseUrl: ''});
    }
  };

  getDefaultInputs = () =>
    Object.getOwnPropertyNames(this.props.objectSample).map(prop => {
      if (this.props.hiddenInputs.indexOf(prop) > -1) {
        return {element: null};
      }
      return {
        element: <div key={prop} className='form-group'>
          <div className='col-md-2'>
            <p className={'' + (this.props.objectSample[prop].required ? 'req' : '')}>
              {this.props.changedLabels && this.props.changedLabels[prop] ?
                this.props.changedLabels[prop] : prop.capitalizeFirstLetter()}
              {this.props.objectSample[prop].hint ? <small>&nbsp;<i className='fa fa-question'
                                                                    data-tip={this.props.objectSample[prop].hint}></i>
              </small> : null}
            </p>
            {this.props.objectSample[prop].hint ? <ReactTooltip effect='solid'/> : null}
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
        </div>,
        viewIndex: this.props.objectSample[prop].viewIndex || Object.getOwnPropertyNames(this.props.objectSample).length
      };
    });

  getCustomInputs = () => {
    if (!this.props.customInputs) {
      return [];
    }
    return Object.getOwnPropertyNames(this.props.customInputs).map(prop => {
      return {
        element: <div key={prop} className='form-group'>
          <div className='col-md-2'>
            <p className={'' + (this.props.customInputs[prop].required ? 'req' : '')}>
              {this.props.changedLabels && this.props.changedLabels[prop] ?
                this.props.changedLabels[prop] : prop.capitalizeFirstLetter()}
            </p>
          </div>
          <div className='col-md-10'>
            {
              this.props.customInputs[prop].elem
            }
          </div>
        </div>,
        viewIndex: this.props.customInputs[prop].viewIndex || Object.getOwnPropertyNames(this.props.objectSample).length
      };
    });
  };

  renderInputs = () =>
    (_.sortBy([...this.getDefaultInputs(), ...this.getCustomInputs()], 'viewIndex')).map(obj => obj.element);

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
            <option value={LEAVE_URL_OPTION}>Leave URL's as is</option>
            <option value={KEEP_URL_OPTION}>Keep original URL's</option>
          </select>
        </div>
        <div className='col-md-9'>
          {this.state.urlSelect === LEAVE_URL_OPTION ?
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
      {this.props.customDefaultRender ?
        <div className='row'>
          {this.props.customDefaultRender}
        </div> : null}
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
          <Table {...this.props}/>
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
                </div>
                <div className='box-footer'>
                  {this.props.status === STATUS_CREATING ? this.renderCreatingButtons() : null}
                  {this.props.status === STATUS_EDITING ? this.renderEditingButtons() : null}
                </div>
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
    const {loading} = this.props;

    return (
      <div>
        {loading ? <div className='loader'/> : <div className='loaderDone'/>}
        <div className='content-header'>
          <h1>{this.props.pluralTitle || `${ this.props.title}s`}</h1>
        </div>
        {this.renderPage()}
      </div>
    );
  }
}
