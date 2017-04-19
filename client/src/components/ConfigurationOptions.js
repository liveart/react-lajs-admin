import React, {Component} from 'react';
import {forEach, map, findIndex, forOwn} from 'lodash';
import Select, {Creatable} from 'react-select';
import PropTypes from 'prop-types';
import {
  STATUS_EDITING,
  STATUS_CREATING,
  STATUS_DEFAULT,
  RELATIVE_URL
} from '../definitions';
import * as ConfigModel from '../../../common/models/configuration.json';
const Option = ConfigModel.properties.options.type[0];

export default class ConfigurationOptions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( <div>
      <div className='row' style={{marginBottom: 6}}>
        <div className='col-md-11'>
          <Creatable
            name='location'
            className='onTop'
            placeholder={this.props.objectHolder.options && this.props.objectHolder.options.length ?
              map(this.props.objectHolder.options, 'name').join(', ') :
              'No options linked. Type a name to add location...'}
            noResultsText='No options currently linked...'
            labelKey='name'
            valueKey='name'
            value={this.state.location > -1 && this.props.objectHolder.options &&
            this.props.objectHolder.options.length ?
              (this.props.objectHolder.options)[this.state.location] : null}
            options={this.props.objectHolder.options && this.props.objectHolder.options.length ?
              this.props.objectHolder.options : []}
            onNewOptionClick={val => {
              let obj = {};
              forEach(Object.getOwnPropertyNames(Option), p => {
                if (Option[p].type === 'array' || Array.isArray(Option[p].type)) {
                  obj[p] = [];
                } else {
                  if (typeof Option[p].default === 'boolean') {
                    obj[p] = Option[p].default;
                  } else {
                    obj[p] = '';
                  }
                }
              });
              this.props.setEditingObjectProperty('options', [...this.props.objectHolder.options,
                {...obj, name: val.name}]);
              this.setState({
                ...this.state, location: findIndex(this.props.objectHolder.options,
                  loc => loc.name === val.name)
              });
            }}
            onChange={val => {
              if (!val) {
                this.setState({
                  ...this.state, location: -1
                });
                return;
              }
              this.setState({
                ...this.state, location: findIndex(this.props.objectHolder.options,
                  loc => loc.name === val.name)
              });
            }}
          />
        </div>
        <div className='col-md-1'>
          <a className='btn btn-default' href='#' aria-label='Add'
             onClick={() => {
               const val = 'New location';
               let obj = {};
               forEach(Object.getOwnPropertyNames(Option), p => {
                 if (Option[p].type === 'array' || Array.isArray(Option[p].type)) {
                   obj[p] = [];
                 } else {
                   if (typeof Option[p].default === 'boolean') {
                     obj[p] = Option[p].default;
                   } else {
                     obj[p] = '';
                   }
                 }
               });
               this.props.setEditingObjectProperty('options', [...this.props.objectHolder.options,
                 {...obj, name: val.name}]);
               this.setState({
                 ...this.state, location: findIndex(this.props.objectHolder.options,
                   loc => loc.name === val.name)
               });
             }}>
            <i className='fa fa-plus' aria-hidden='true'></i>
          </a>
        </div>
      </div>
    </div>);
  }
}
