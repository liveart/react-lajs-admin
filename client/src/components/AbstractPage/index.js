import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT, LEAVE_URL_OPTION} from '../../definitions';
import {NotificationMessages, NotificationTypes} from '../../strings';
import View from './View';
import {checkNotEmpty} from '../../FormValidation';
import keys from 'lodash/keys';
import forEach from 'lodash/forEach';
import difference from 'lodash/difference';
import eq from 'lodash/eq';
import {getName} from '../../utils';

export default class AbstractPage extends Component {
  static propTypes = PTypes;

  constructor(props) {
    super(props);
    this.state = {empty: [], json: '', baseUrl: '', urlSelect: LEAVE_URL_OPTION};
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

  componentWillReceiveProps(props) {
    if (props.errors && props.errors.length) {
      forEach(difference(props.errors, this.props.errors),
        prop => this.props.addNotification(NotificationTypes.ERR, prop));
    }
    if (props.message) {
      if (!eq(props.message, this.props.message)) {
        this.props.addNotification(NotificationTypes.SUCCESS, props.message);
      }
    }
  }

  componentDidUpdate() {
    if (this.state.empty.length) {
      this.props.addNotification(NotificationTypes.ERR, NotificationMessages.FILL_REQUIRED,
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
        const curr = this.props.objectHolder[prop];

        if (typeof this.props.objectSample[prop].uploadParams === 'object') {
          if (typeof curr === 'object' && curr) {
            this.props.uploadFile(curr, this.props.objectSample[prop].uploadParams.endpoint);
            entity[prop] = getName(curr, this.props.objectSample[prop].uploadParams.dir);
          }
        } else {
          entity[prop] = curr;
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

  handleJsonChange = e => this.setState({...this.state, json: e.target.value});

  handleBaseUrlChange = e => this.setState({...this.state, baseUrl: e.target.value});

  handleFileSelection = e => {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        ...this.state,
        json: reader.result
      });
    };
    reader.readAsText(e.target.files[0]);
  };

  render() {
    return <View {...this.props}
                 {...this.state}
                 handleAddNew={this.handleAddNew}
                 handleImportFromJson={this.handleImportFromJson}
                 handleCancelBtnClick={this.handleCancelBtnClick}
                 handleSaveBtnClick={this.handleSaveBtnClick}
                 handleDeleteBtnClick={this.handleDeleteBtnClick}
                 handleFileSelection={this.handleFileSelection}
                 updateObject={this.updateObject}
                 onBaseUrlChange={this.handleBaseUrlChange}
                 onJsonChange={this.handleJsonChange}
                 onCancelBtnClick={this.handleCancelBtnClick}
                 onSaveBtnClick={this.handleSaveImportBtnClick}/>;
  }
}
