import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {forEach, map, findIndex} from 'lodash';
import Select, {Creatable} from 'react-select';
import {getFileUrl} from '../../../utils';
import Cropper from 'react-cropper';
import UnitRangeTable from './UnitRangeTable';
import '../../../../public/assets/css/cropper.css';

export default class Locations extends Component {
  static propTypes = {
    location: PropTypes.number,
    objectHolder: PropTypes.object,
    getImageUrl: PropTypes.func,
    getLocationsInputValue: PropTypes.func,
    changeLocationsNestedArrValue: PropTypes.func,
    changeLocationsNestedHolderValue: PropTypes.func,
    handleLocationsNestedFileChoose: PropTypes.func,
    deleteCurrentLocation: PropTypes.func,
    handleNewLocation: PropTypes.func,
    handleNewOption: PropTypes.func,
    handleOptionChange: PropTypes.func,
    addUnitsRangeRow: PropTypes.func,
    deleteUnitsRangeRow: PropTypes.func,
    updateDblNestedArray: PropTypes.func,
    updateArray: PropTypes.func,
  };

  render() {
    return <div>
      <div className='row' style={{marginBottom: 6}}>
        <div className='col-md-11'>
          <Creatable
            name='location'
            className='onTop'
            placeholder={this.props.objectHolder.locations && this.props.objectHolder.locations.length ?
              map(this.props.objectHolder.locations, 'name').join(', ') :
              'No locations linked. Type a name to add location...'}
            noResultsText='No locations currently linked...'
            labelKey='name'
            valueKey='name'
            value={this.props.location > -1 && this.props.objectHolder.locations &&
            this.props.objectHolder.locations.length ?
              (this.props.objectHolder.locations)[this.props.location] : null}
            options={this.props.objectHolder.locations && this.props.objectHolder.locations.length ?
              this.props.objectHolder.locations : []}
            onNewOptionClick={val => this.props.handleNewOption(val)}
            onChange={val => this.props.handleOptionChange(val)}
          />
        </div>
        <div className='col-md-1'>
          <a className='btn btn-default' href='#' aria-label='Add'
             onClick={() => this.props.handleNewLocation}>
            <i className='fa fa-plus' aria-hidden='true'></i>
          </a>
        </div>
      </div>
      {this.props.location < 0 ||
      !this.props.objectHolder.locations || !this.props.objectHolder.locations.length ? null :
        <div className='panel panel-default'>
          <div className='panel-body'>
            <div className='row'>
              <div className='col-lg-4'>

                <div className='row' style={{marginBottom: 6}}>
                  <div className='col-lg-12'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>Name</span>
                      <input type='text' className='form-control'
                             onChange={e => this.props.changeLocationsNestedHolderValue('name', e.target.value)}
                             value={this.props.getLocationsInputValue('name')}/>
                    </div>
                  </div>
                </div>

                <div className='row' style={{marginBottom: 6}}>
                  <div className='col-lg-12'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>Image</span>
                      <input type='file' className='form-control'
                             onChange={e => this.props.handleLocationsNestedFileChoose('image', e)}/>
                      {typeof this.props.getLocationsInputValue('image') === 'string' ?
                        <div className='input-group-btn'>
                          <a href={getFileUrl(this.props.getLocationsInputValue('image'))}
                             className='btn btn-default btn-sm'>{
                            (() => {
                              let url = getFileUrl(this.props.getLocationsInputValue('image'));
                              if (url.length > 8) {
                                url = '...' + url.substr(url.length - 8);
                              }
                              return url;
                            })()}
                          </a>
                        </div> : null}
                    </div>
                  </div>
                </div>

                <div className='row' style={{marginBottom: 6}}>
                  <div className='col-lg-12'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>Mask</span>
                      <input type='file' className='form-control'
                             onChange={e => this.props.handleLocationsNestedFileChoose('mask', e)}/>
                      {typeof this.props.getLocationsInputValue('mask') === 'string' ?
                        <div className='input-group-btn'>
                          <a href={getFileUrl(this.props.getLocationsInputValue('mask'))}
                             className='btn btn-default btn-sm'>{
                            (() => {
                              let url = getFileUrl(this.props.getLocationsInputValue('mask'));
                              if (url.length > 8) {
                                url = '...' + url.substr(url.length - 8);
                              }
                              return url;
                            })()
                          }</a>
                        </div> : null
                      }
                    </div>
                  </div>
                </div>

                <div className='row' style={{marginBottom: 6}}>
                  <div className='col-lg-12'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>Overlay</span>
                      <input type='file' className='form-control'
                             onChange={e => this.props.handleLocationsNestedFileChoose('overlayInfo', e)}/>
                      {typeof this.props.getLocationsInputValue('overlayInfo') === 'string' ?
                        <div className='input-group-btn'>
                          <a href={getFileUrl(this.props.getLocationsInputValue('overlayInfo'))}
                             className='btn btn-default btn-sm'>{
                            (() => {
                              let url = getFileUrl(this.props.getLocationsInputValue('overlayInfo'));
                              if (url.length > 8) {
                                url = '...' + url.substr(url.length - 8);
                              }
                              return url;
                            })()
                          }</a>
                        </div> : null
                      }
                    </div>
                  </div>
                </div>

                <div className='row' style={{marginBottom: 6}}>
                  <div className='col-lg-6'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>Width</span>
                      <input type='text' className='form-control'
                             onChange={e =>
                               this.props.changeLocationsNestedArrValue('editableAreaUnits', 0, e.target.value)}
                             value={(() => {
                               const vals = this.props.getLocationsInputValue('editableAreaUnits') || [];
                               if (vals && vals.length) {
                                 return vals[0];
                               }

                               return '';
                             })()}/>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>Height</span>
                      <input type='text' className='form-control'
                             onChange={e =>
                               this.props.changeLocationsNestedArrValue('editableAreaUnits', 1, e.target.value)}
                             value={
                               (() => {
                                 const vals = this.props.getLocationsInputValue('editableAreaUnits') || [];
                                 if (vals && vals.length > 1) {
                                   return vals[1];
                                 }

                                 return '';
                               })()}/>
                    </div>
                  </div>
                </div>

                <div className='row' style={{marginBottom: 6}}>
                  <div className='col-lg-6'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>Top x</span>
                      <input type='text' className='form-control'
                             onChange={e =>
                               this.props.changeLocationsNestedArrValue('clipRect', 0, Number(e.target.value))}
                             value={(() => {
                               const vals = this.props.getLocationsInputValue('clipRect') || [];
                               if (vals && vals.length) {
                                 return vals[0];
                               }

                               return '';
                             })()}/>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>Top y</span>
                      <input type='text' className='form-control'
                             onChange={e =>
                               this.props.changeLocationsNestedArrValue('clipRect', 1, Number(e.target.value))}
                             value={
                               (() => {
                                 const vals = this.props.getLocationsInputValue('clipRect') || [];
                                 if (vals && vals.length > 1) {
                                   return vals[1];
                                 }

                                 return '';
                               })()}/>
                    </div>
                  </div>
                </div>
                <div className='row' style={{marginBottom: 6}}>
                  <div className='col-lg-6'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>Bottom x</span>
                      <input type='text' className='form-control'
                             onChange={e =>
                               this.props.changeLocationsNestedArrValue('clipRect', 2, Number(e.target.value))}
                             value={(() => {
                               const vals = this.props.getLocationsInputValue('clipRect') || [];
                               if (vals && vals.length > 2) {
                                 return vals[2];
                               }

                               return '';
                             })()}/>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>Bottom y</span>
                      <input type='text' className='form-control'
                             onChange={e =>
                               this.props.changeLocationsNestedArrValue('clipRect', 3, Number(e.target.value))}
                             value={
                               (() => {
                                 const vals = this.props.getLocationsInputValue('clipRect') || [];
                                 if (vals && vals.length > 3) {
                                   return vals[3];
                                 }

                                 return '';
                               })()}/>
                    </div>
                  </div>
                </div>

                <div className='row' style={{marginBottom: 6}}>
                  <div className='col-lg-12'>
                    <UnitRangeTable
                      objectHolder={this.props.objectHolder}
                      location={this.props.objectHolder}
                      addUnitsRangeRow={this.props.addUnitsRangeRow}
                      deleteUnitsRangeRow={this.props.deleteUnitsRangeRow}
                      updateDblNestedArray={this.props.updateDblNestedArray}
                      getLocationsInputValue={this.props.getLocationsInputValue}
                      updateArray={this.props.updateArray}
                    />
                  </div>
                </div>

                <div className='row' style={{marginBottom: 6}}>
                  <div className='col-lg-6'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>x0</span>
                      <input type='text' className='form-control'
                             onChange={e => {
                               if (this.cropper) {
                                 const {x, width} = this.cropper.getData();
                                 const xNew = Number(e.target.value);
                                 const newData = {};

                                 newData.x = xNew;
                                 newData.width = width - (xNew - x);

                                 this.props.changeLocationsNestedArrValue('editableArea', 0, Number(xNew));
                                 this.cropper.setData(newData);
                               }
                             }}
                             value={(() => {
                               const vals = this.props.getLocationsInputValue('editableArea');
                               if (vals && vals.length) {
                                 return vals[0];
                               }

                               return '';
                             })()}/>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>x1</span>
                      <input type='text' className='form-control'
                             onChange={e => {
                               if (this.cropper) {
                                 const {x} = this.cropper.getData();
                                 const x1New = Number(e.target.value);
                                 const newData = {};

                                 newData.width = x1New - x;

                                 this.props.changeLocationsNestedArrValue('editableArea', 2, Number(x1New));

                                 this.cropper.setData(newData);
                               }
                             }}
                             value={(() => {
                               const vals = this.props.getLocationsInputValue('editableArea');
                               if (vals && vals.length > 2) {
                                 return vals[2];
                               }
                               return '';
                             })()}/>
                    </div>
                  </div>
                </div>
                <div className='row' style={{marginBottom: 6}}>
                  <div className='col-lg-6'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>y0</span>
                      <input type='text' className='form-control'
                             onChange={e => {
                               if (this.cropper) {
                                 const {y, height} = this.cropper.getData();
                                 const yNew = Number(e.target.value);
                                 const newData = {};

                                 newData.y = yNew;
                                 newData.height = height - (yNew - y);
                                 this.props.changeLocationsNestedArrValue('editableArea', 1, Number(yNew));
                                 this.cropper.setData(newData);
                               }
                             }}
                             value={(() => {
                               const vals = this.props.getLocationsInputValue('editableArea');
                               if (vals && vals.length > 1) {
                                 return vals[1];
                               }
                               return '';
                             })()}/>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-addon'>y1</span>
                      <input type='text' className='form-control'
                             onChange={e => {
                               if (this.cropper) {
                                 const {y} = this.cropper.getData();
                                 const y1New = Number(e.target.value);
                                 const newData = {};

                                 newData.height = y1New - y;
                                 this.props.changeLocationsNestedArrValue('editableArea', 3, Number(y1New));

                                 this.cropper.setData(newData);
                               }
                             }}
                             value={(() => {
                               const vals = this.props.getLocationsInputValue('editableArea');
                               if (vals && vals.length > 3) {
                                 return vals[3];
                               }

                               return '';
                             })()}/>
                    </div>
                  </div>
                </div>
                <div className='row' style={{marginBottom: 6}}>
                  <div className='col-lg-12'>
                    <Select
                      name='rotation'
                      placeholder='Restrict rotation...'
                      searchable={false}
                      options={[{value: false, label: 'Rotation restricted'},
                        {value: true, label: 'Rotation allowed'}]}
                      value={
                        this.props.objectHolder.locations[this.props.location]
                          .editableAreaUnitsRestrictRotation
                      }
                      onChange={op =>
                        this.props.changeLocationsNestedHolderValue('editableAreaUnitsRestrictRotation',
                          op ? op.value : false)
                      }
                    />
                  </div>
                </div>
                <div className='row' style={{marginBottom: 6}}>
                  <div className='col-lg-12'>
                    <button type='button' className='btn btn-block btn-danger'
                            onClick={this.props.deleteCurrentLocation}>Delete this location
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-lg-8'>
                <div className="panel panel-default">
                  <Cropper
                    ref={cr => this.cropper = cr}
                    src={this.props.getImageUrl(this.props.objectHolder.locations[this.props.location].image)}
                    style={{height: 400, width: '100%'}}
                    guides={false}
                    zoomable={false}
                    viewMode={1}
                    autoCropArea={1}
                  />
                  <button type='button' className='btn btn-block btn-primary'
                          onClick={this.crop}>Save Editable Area
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
  }
}
