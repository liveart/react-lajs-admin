import React, {Component} from 'react';
import {
  STATUS_EDITING,
  STATUS_CREATING,
  STATUS_DEFAULT,
  STATUS_CONFIRM_DELETE,
  STATUS_IMPORT_JSON
} from '../../definitions';
import DefaultView from './secondary/ViewStates/DefaultView';
import DeleteConfirmationView from './secondary/ViewStates/DeleteConfirmationView';
import ImportView from './secondary/ViewStates/ImportView';
import DefaultInput from './secondary/Inputs/DefaultInput';
import CustomInput from './secondary/Inputs/CustomInput';
import sortBy from 'lodash/sortBy';
import keys from 'lodash/keys';
import EditingView from './secondary/ViewStates/EditingView';

export default class AbstractPageView extends Component {

  getDefaultInputs = () =>
    keys(this.props.objectSample).map(prop => {
      if (this.props.objectSample[prop].showInput === false) {
        return {element: null};
      }
      return {
        element: <DefaultInput key={prop}
                               property={prop}
                               item={this.props.objectSample[prop]}
                               {...this.props}/>,
        viewIndex: this.props.objectSample[prop].viewIndex || keys(this.props.objectSample).length
      };
    });

  getCustomInputs = () => {
    if (!this.props.customInputs) {
      return [];
    }
    return keys(this.props.customInputs).map(prop => {
      return {
        element: <CustomInput key={prop}
                              property={prop}
                              item={this.props.customInputs[prop]}
                              changedInputs={this.props.changedInputs}/>,
        viewIndex: this.props.customInputs[prop].viewIndex || keys(this.props.objectSample).length
      };
    });
  };

  renderInputs = () =>
    (sortBy([...this.getDefaultInputs(), ...this.getCustomInputs()], 'viewIndex')).map(obj => obj.element);

  renderPage = () => {
    if (this.props.status === STATUS_DEFAULT) {
      return <DefaultView {...this.props}
                          onAddNewBtnClick={this.props.handleAddNew}
                          onImportBtnClick={this.props.handleImportFromJson}/>;
    } else if (this.props.status === STATUS_CREATING) {
      return <EditingView {...this.props}
                          renderInputs={this.renderInputs}
                          onCancelBtnClick={this.props.handleCancelBtnClick}
                          onSaveBtnClick={() => this.props.handleSaveBtnClick(true)}
                          onSaveChangesBtnClick={() => this.props.handleSaveBtnClick(false)}
                          onDeleteBtnClick={this.props.handleDeleteBtnClick}/>;
    } else if (this.props.status === STATUS_EDITING) {
      return <EditingView {...this.props}
                          renderInputs={this.renderInputs}
                          onCancelBtnClick={this.props.handleCancelBtnClick}
                          onSaveBtnClick={() => this.props.handleSaveBtnClick(true)}
                          onSaveChangesBtnClick={() => this.props.handleSaveBtnClick(false)}
                          onDeleteBtnClick={this.props.handleDeleteBtnClick}/>;
    } else if (this.props.status === STATUS_CONFIRM_DELETE) {
      return <DeleteConfirmationView {...this.props}/>;
    } else if (this.props.status === STATUS_IMPORT_JSON) {
      return <ImportView json={this.props.json}
                         title={this.props.title}
                         handleFileSelection={this.props.handleFileSelection}
                         urlSelect={this.props.urlSelect}
                         baseUrl={this.props.baseUrl}
                         updateObject={this.props.updateObject}
                         onBaseUrlChange={this.props.onBaseUrlChange}
                         onJsonChange={this.props.onJsonChange}
                         onCancelBtnClick={this.props.onCancelBtnClick}
                         onSaveBtnClick={this.props.onSaveBtnClick}/>;
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
