import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select, {Creatable} from 'react-select';
import * as ConfigModel from '../../../common/models/configuration.json';
import View from './View/View';
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
    token: PropTypes.string.isRequired
  };

  redirectWindowOptions = [{value: '(default)', label: 'Default'},
    {value: 'parent', label: 'Parent'},
    {value: 'top', label: 'Top'}];

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
      return _.map(this.props.objectHolder.defaultProductSize, col => ({value: col, name: col}));
    }

    return this.props.objectHolder.defaultProductSize;
  };

  onSizeSelectChange = val => {
    const arr = [];
    if (val) {
      _.forEach(val, v => arr.push(v.name));
      this.props.setEditingObjectProperty('defaultProductSize', arr);
    }
  };

  arrowRenderer = () => {
    return (
      <span>+</span>
    );
  };

  render() {
    return (
      <View {...this.props} objectSample={Configuration} sortingSupport={true}
            hiddenProperties={Object.getOwnPropertyNames(Configuration).filter(p => p !== 'name')}
            hiddenInputs={['id', 'colorsPantonesUrl', 'defaultNameObjectText', 'defaultNumberObjectText',
              'defaultProductSize', 'defaultProductId', 'getDesignsUrl', 'saveDesignUrl', 'loadDesignUrl']}
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
                        <p>Product id: </p>
                      </div>
                      <div className='col-md-9'>
                        <input type='text' className='form-control'
                               value={this.props.objectHolder.defaultProductId}
                               onChange={e => this.handleSelectedObjectChange('defaultProductId', e)}/>
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='col-md-3'>
                        <p>Product size: </p>
                      </div>
                      <div className='col-md-9'>
                        <Creatable
                          arrowRenderer={this.arrowRenderer}
                          name='sizes'
                          className='onTop1'
                          value={this.getSelectedSizeOptions()}
                          multi={true}
                          isOptionUnique={() => (true)}
                          labelKey='name'
                          placeholder='Type a name to add location...'
                          noResultsText=''
                          onChange={this.onSizeSelectChange}
                        />
                      </div>
                    </div>
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
      />
    );
  }

}
