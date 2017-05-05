import React, {Component} from 'react';
import {capitalizeFirstLetter} from '../../utils';
import {PTypes} from './PropTypes';
import {
  ID_PROP,
  STATUS_EDITING,
  STATUS_CREATING,
  STATUS_DEFAULT,
  STATUS_CONFIRM_DELETE,
  STATUS_IMPORT_JSON
} from '../../definitions';
import DefaultView from './DefaultView';
import DeleteConfirmationView from './DeleteConfirmationView';
import ImportView from './ImportView';
import DefaultInput from './DefaultInput';
import {checkNotEmpty} from '../../FormValidation';
import * as _ from 'lodash';
import keys from 'lodash/keys';
import ReactTooltip from 'react-tooltip';
import EditingView from './EditingView';
const LEAVE_URL_OPTION = 'Import';
const INITIAL_STATE = {empty: [], json: '', baseUrl: '', urlSelect: LEAVE_URL_OPTION};

export default class ViewAbstract extends Component {
  static propTypes = PTypes;

  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
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

  updateObject = (propertyName, event) => this.props.setEditingObjectProperty(propertyName, event.target.value);

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
    const properties = keys(this.props.objectSample);
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
    keys(this.props.objectSample).map(prop => {
      if (this.props.objectSample[prop].showInput === false) {
        return {element: null};
      }
      return {
        element: <DefaultInput key={prop}
                               property={prop}
                               item={this.props.objectSample[prop]}
                               objectHolder={this.props.objectHolder}
                               representations={this.props.representations}
                               changedInputs={this.props.changedInputs}/>,
        viewIndex: this.props.objectSample[prop].viewIndex || keys(this.props.objectSample).length
      };
    });

  getCustomInputs = () => {
    if (!this.props.customInputs) {
      return [];
    }
    return keys(this.props.customInputs).map(prop => {
      return {
        element: <div key={prop} className='form-group'>
          <div className='col-md-2'>
            <p className={'' + (this.props.customInputs[prop].required ? 'req' : '')}>
              {this.props.changedLabels && this.props.changedLabels[prop] ?
                this.props.changedLabels[prop] : capitalizeFirstLetter(prop)}
            </p>
          </div>
          <div className='col-md-10'>
            {
              this.props.customInputs[prop].elem
            }
          </div>
        </div>,
        viewIndex: this.props.customInputs[prop].viewIndex || keys(this.props.objectSample).length
      };
    });
  };

  renderInputs = () =>
    (_.sortBy([...this.getDefaultInputs(), ...this.getCustomInputs()], 'viewIndex')).map(obj => obj.element);

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
      return <DefaultView {...this.props}
                          onAddNewBtnClick={this.handleAddNew}
                          onImportBtnClick={this.handleImportFromJson}/>;
    } else if (this.props.status === STATUS_CREATING) {
      return <EditingView {...this.props}
                          renderInputs={this.renderInputs}
                          onCancelBtnClick={this.handleCancelBtnClick}
                          onSaveBtnClick={() => this.handleSaveBtnClick(true)}
                          onSaveChangesBtnClick={() => this.handleSaveBtnClick(false)}
                          onDeleteBtnClick={this.handleDeleteBtnClick}/>;
    } else if (this.props.status === STATUS_EDITING) {
      return <EditingView {...this.props}
                          renderInputs={this.renderInputs}
                          onCancelBtnClick={this.handleCancelBtnClick}
                          onSaveBtnClick={() => this.handleSaveBtnClick(true)}
                          onSaveChangesBtnClick={() => this.handleSaveBtnClick(false)}
                          onDeleteBtnClick={this.handleDeleteBtnClick}/>;
    } else if (this.props.status === STATUS_CONFIRM_DELETE) {
      return <DeleteConfirmationView {...this.props}/>;
    } else if (this.props.status === STATUS_IMPORT_JSON) {
      return <ImportView json={this.state.json}
                         onFileChoose={this.handleFileChoose}
                         urlSelect={this.state.urlSelect}
                         baseUrl={this.state.baseUrl}
                         updateObject={this.updateObject}
                         onBaseUrlChange={this.handleBaseUrlChange}
                         onJsonChange={this.handleJsonChange}
                         onCancelBtnClick={this.handleCancelBtnClick}
                         onSaveBtnClick={this.handleSaveImportBtnClick}/>;
    }
  };

  render() {
    const {loading} = this.props;
    return <div>
      {loading ? <div className='loader'/> : <div className='loaderDone'/>}
      <div className='content-header'>
        <h1>{this.props.pluralTitle || `${ this.props.title}s`}</h1>
      </div>
      {this.renderPage()}
    </div>;
  }
}
