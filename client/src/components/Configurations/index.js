import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select, {Creatable} from 'react-select';
import * as ConfigModel from '../../../common/models/configuration.json';
import {forEach, map, findIndex, filter} from 'lodash';
import View from './View';
import ConfigurationOptions from './ConfigurationOptions';
const Configuration = ConfigModel.properties;

export default class extends Component {
  static propTypes = {
    message: PropTypes.string,
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
    token: PropTypes.string.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(PropTypes.object)
  };

  redirectWindowOptions = [{value: '(default)', label: 'Default'},
    {value: 'parent', label: 'Parent'},
    {value: 'top', label: 'Top'}];

  componentWillMount() {
    this.props.fetchProducts();
  }

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  handleSelectedObjectAddNewArray = (fArr, sArr, key, obj) => {
    let arr = (this.props.objectHolder[fArr]);
    if (typeof (arr[key])[sArr] !== 'object') {
      (arr[key])[sArr] = [];
    }
    ((arr[key])[sArr])[(arr[key])[sArr].length] = [...obj];
    this.props.setEditingObjectProperty(fArr, [...arr]);
  };

  handleSelectedObjectArrayArrayDeleteElement = (fArr, sArr, colorizableKey, key) => {
    const arr = (this.props.objectHolder[fArr]);
    ((arr[colorizableKey])[sArr]).remove(key);
    this.props.setEditingObjectProperty(fArr, [...arr]);
  };

  handleSelectedObjectArrayArrayChange = (fArrName, sArrName, fInd, sInd, propName, event) => {
    const colorizables = this.props.objectHolder[fArrName];
    if (propName === 'image') {
      colorizables[fInd][sArrName][sInd][propName] = event.target.files[0];
    } else if (sArrName === 'editableAreaUnitsRange') {
      colorizables[fInd][sArrName][sInd][propName] = Number(event.target.value);
    } else {
      colorizables[fInd][sArrName][sInd][propName] = event.target.value;
    }
    this.props.setEditingObjectProperty(fArrName, [...colorizables]);
  };


  getSelectedSizeOptions = () => {
    if (!this.props.objectHolder.defaultProductSize || !this.props.objectHolder.defaultProductSize.length) {
      return [];
    }

    if (typeof (this.props.objectHolder.defaultProductSize)[0] === 'string') {
      return map(this.props.objectHolder.defaultProductSize, col => ({value: col, name: col}));
    }

    return this.props.objectHolder.defaultProductSize;
  };

  onSizeSelectChange = val => {
    const arr = [];
    if (val) {
      forEach(val, v => arr.push(v.name));
      this.props.setEditingObjectProperty('defaultProductSize', arr);
    }
  };

  arrowRenderer = () => {
    return (
      <span>+</span>
    );
  };

  getMainConfigValue = () => {
    const i = findIndex(this.props.data, c => c.isMain === true);
    if (i > -1) {
      return this.props.data[i];
    }

    return '';
  };

  updateMainConfig = o => {
    const id = o ? o.id : null;
    filter(this.props.data, conf => {
      if (conf.isMain && (!id || conf.id !== id)) {
        this.props.editEntity(conf.id, {...conf, isMain: false});
      } else if (id && conf.id === id && !conf.isMain) {
        this.props.editEntity(conf.id, {...conf, isMain: true});
      }
    });
  };

  render() {
    return (
      <View {...this.props} objectSample={Configuration} sortingSupport={true}
            hiddenProperties={Object.getOwnPropertyNames(Configuration).filter(p => p !== 'name')}
            hiddenInputs={['id', 'colorsPantonesUrl', 'defaultNameObjectText', 'defaultNumberObjectText',
              'defaultProductSize', 'defaultProductId', 'getDesignsUrl', 'saveDesignUrl', 'loadDesignUrl', 'isMain']}
            changedLabels={{
              productsList: 'Products Url',
              fonts: 'Fonts Url',
              graphicsList: 'Graphics Url',
              social: 'Social Url',
              assetsUrl: 'Assets Url',
              galleryBaseUrl: 'Gallery Base Url',
              getQuoteUrl: 'Quotes Url',
              getDesignsUrl: 'Designs Url',
              saveDesignUrl: 'Save Design Url',
              loadDesignUrl: 'Load Design Url',
              redirectUrl: 'Redirect Url',
              uploadImageUrl: 'Upload Image Url',
              textEffects: 'Text Effects',
              redirectWindow: 'Redirect Window',
              shareLinkUrl: 'Share Link Url'
            }}
            changedInputs={{
              colors: {
                elem: <div className='panel panel-default'>
                  <div className='panel-body'>
                    <div className='form-group'>
                      <div className='col-md-3'>
                        <p>Url: </p>
                      </div>
                      <div className='col-md-9'>
                        <input type='text' className='form-control'
                               value={this.props.objectHolder.colors ? this.props.objectHolder.colors.url : ''}
                               onChange={e => this.props.setEditingObjectProperty('colors', {
                                 ...this.props.objectHolder.colors,
                                 url: e.target.value
                               })}/>
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='col-md-3'>
                        <p>Pantones Url: </p>
                      </div>
                      <div className='col-md-9'>
                        <input type='text' className='form-control'
                               value={this.props.objectHolder.colors ? this.props.objectHolder.colors.colorsPantonesUrl : ''}
                               onChange={e => this.props.setEditingObjectProperty('colors', {
                                 ...this.props.objectHolder.colors,
                                 pantones_url: e.target.value
                               })}/>
                      </div>
                    </div>
                  </div>
                </div>
              },
              textEffects: {
                elem: <div className='panel panel-default'>
                  <div className='panel-body'>
                    <div className='form-group'>
                      <div className='col-md-3'>
                        <p>Config: </p>
                      </div>
                      <div className='col-md-9'>
                        <input type='text' className='form-control'
                               value={this.props.objectHolder.textEffects ? this.props.objectHolder.textEffects.config : ''}
                               onChange={e => this.props.setEditingObjectProperty('textEffects', {
                                 ...this.props.objectHolder.textEffects,
                                 config: e.target.value
                               })}/>
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='col-md-3'>
                        <p>Url: </p>
                      </div>
                      <div className='col-md-9'>
                        <input type='text' className='form-control'
                               value={this.props.objectHolder.textEffects ? this.props.objectHolder.textEffects.url : ''}
                               onChange={e => this.props.setEditingObjectProperty('textEffects', {
                                 ...this.props.objectHolder.textEffects,
                                 url: e.target.value
                               })}/>
                      </div>
                    </div>
                  </div>
                </div>
              },
              redirectWindow: {
                elem: <Select
                  value={this.props.objectHolder.redirectWindow}
                  options={this.redirectWindowOptions}
                  onChange={option => this.props.setEditingObjectProperty('redirectWindow', option.value)}
                  isLoading={this.props.loading}
                  clearable={false}
                />
              },
              options: {
                elem: <ConfigurationOptions {...this.props}
                                            handleSelectedObjectAddNewArray={this.handleSelectedObjectAddNewArray}
                                            handleSelectedObjectArrayArrayChange={this.handleSelectedObjectArrayArrayChange}
                                            handleSelectedObjectArrayArrayDeleteElement={this.handleSelectedObjectArrayArrayDeleteElement}/>
              }
            }}
            customInputs={{
              defaults: {
                elem: <div className='panel panel-default'>
                  <div className='panel-body'>
                    <div className='form-group'>
                      <div className='col-md-3'>
                        <p>Text: </p>
                      </div>
                      <div className='col-md-9'>
                        <input type='text' className='form-control'
                               value={this.props.objectHolder.defaultNameObjectText}
                               onChange={e => this.handleSelectedObjectChange('defaultNameObjectText', e)}/>
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='col-md-3'>
                        <p>Number: </p>
                      </div>
                      <div className='col-md-9'>
                        <input type='text' className='form-control'
                               value={this.props.objectHolder.defaultNumberObjectText}
                               onChange={e => this.handleSelectedObjectChange('defaultNumberObjectText', e)}/>
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='col-md-3'>
                        <p>Product: </p>
                      </div>
                      <div className='col-md-9'>
                        <Select
                          value={this.props.objectHolder.defaultProductId}
                          options={this.props.products}
                          className='onTop'
                          placeholder='No default product selected...'
                          labelKey='name'
                          valueKey='id'
                          onChange={o => o ? this.props.setEditingObjectProperty('defaultProductId', o.id) :
                            this.props.setEditingObjectProperty('defaultProductId', '')}
                        />
                      </div>
                    </div>
                    {this.props.objectHolder.defaultProductId &&
                    this.props.objectHolder.defaultProductId.length ?
                      <div className='form-group'>
                        <div className='col-md-3'>
                          <p>Product size: </p>
                        </div>
                        <div className='col-md-9'>
                          <Creatable
                            arrowRenderer={this.arrowRenderer}
                            name='sizes'
                            value={this.getSelectedSizeOptions()}
                            multi={true}
                            isOptionUnique={() => true}
                            labelKey='name'
                            placeholder='Type to add new size...'
                            noResultsText=''
                            onChange={this.onSizeSelectChange}
                          />
                        </div>
                      </div> : null}
                  </div>
                </div>,
                required: true
              },
              designs: {
                elem: <div className='panel panel-default'>
                  <div className='panel-body'>
                    <div className='form-group'>
                      <div className='col-md-3'>
                        <p>Get Designs Url: </p>
                      </div>
                      <div className='col-md-9'>
                        <input type='text' className='form-control'
                               value={this.props.objectHolder.getDesignsUrl}
                               onChange={e => this.handleSelectedObjectChange('getDesignsUrl', e)}/>
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='col-md-3'>
                        <p>Save Design Url: </p>
                      </div>
                      <div className='col-md-9'>
                        <input type='text' className='form-control'
                               value={this.props.objectHolder.saveDesignUrl}
                               onChange={e => this.handleSelectedObjectChange('saveDesignUrl', e)}/>
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='col-md-3'>
                        <p>Load Design Url: </p>
                      </div>
                      <div className='col-md-9'>
                        <input type='text' className='form-control'
                               value={this.props.objectHolder.loadDesignUrl}
                               onChange={e => this.handleSelectedObjectChange('loadDesignUrl', e)}/>
                      </div>
                    </div>
                  </div>
                </div>,
                required: true,
                viewIndex: 12
              }
            }}
            customDefaultRender={
              <div>
                <div className='col-md-12'>
                  <label>Used configuration:</label>
                  <Select style={{marginBottom: 8}}
                          value={this.getMainConfigValue()}
                          valueKey='id'
                          labelKey='name'
                          options={this.props.data}
                          isLoading={this.props.loading}
                          onChange={o => this.updateMainConfig(o)}
                  />
                </div>
              </div>
            }
      />
    );
  }
}
