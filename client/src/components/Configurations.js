import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select, {Creatable} from 'react-select';
import * as ConfigModel from '../../../common/models/configuration.json';
import View from './View/View';
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
              uploadImageUrl: 'Upload Image url',
              textEffects: 'Text Effects',
              redirectWindow: 'Redirect Window'
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
                               value={this.props.objectHolder.colors}
                               onChange={e => this.handleSelectedObjectChange('colors', e)}/>
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='col-md-3'>
                        <p>Pantones Url: </p>
                      </div>
                      <div className='col-md-9'>
                        <input type='text' className='form-control'
                               value={this.props.objectHolder.colorsPantonesUrl}
                               onChange={e => this.handleSelectedObjectChange('colorsPantonesUrl', e)}/>
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
                        <input type='text' className='form-control'
                               value={this.props.objectHolder.defaultProductSize}
                               onChange={e => this.handleSelectedObjectChange('defaultProductSize', e)}/>
                      </div>
                    </div>
                  </div>
                </div>
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
                viewIndex: 12
              }
            }}
      />
    );
  }

}
