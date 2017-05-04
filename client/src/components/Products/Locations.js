import React, {Component} from 'react';
import {forEach, map, findIndex, forOwn} from 'lodash';
import Select, {Creatable} from 'react-select';
import {
  STATUS_EDITING,
  STATUS_CREATING,
  STATUS_DEFAULT
} from '../../definitions';
import * as ProductModel from '../../../../common/models/product.json';
const Location = ProductModel.properties.locations.type[0];
import Cropper from 'react-cropper';

export default class Locations extends Component {

  constructor(props) {
    super(props);
    this.state = {mainImgUrl: '', location: -1};
    if (!Array.prototype.remove) {
      Array.prototype.remove = function (from, to) {
        const rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
      };
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.status === STATUS_DEFAULT && (props.status === STATUS_CREATING || props.status === STATUS_EDITING)) {
      this.props.fetchColors();
      if (this.state.location > -1) {
        this.setState({
          ...this.state, location: -1
        });
      }
    }
  }

  getLocationsInputValue = propertyName => {
    if (this.state.location < 0 || !this.props.objectHolder.locations ||
      !this.props.objectHolder.locations.length) {
      return '';
    }
    return ((this.props.objectHolder.locations)[this.state.location])[propertyName];
  };

  getImageUrl = image => {
    if (!image) {
      return;
    }
    if (typeof image === 'string') {
      return this.props.getFileUrl(image);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        ...this.state,
        mainImgUrl: reader.result
      });
    };
    reader.readAsDataURL(image);
    return this.state.mainImgUrl;
  };

  deleteCurrentLocation = () => {
    const locs = this.props.objectHolder.locations;
    locs.remove(this.state.location);
    this.props.setEditingObjectProperty('locations', [...locs]);
    this.setState({
      ...this.state, location: -1
    });
  };

  addUnitsRangeRow = key => (
    this.props.handleSelectedObjectAddNewArray('locations', 'editableAreaUnitsRange', key, [])
  );

  deleteUnitsRangeRow = (locationId, key) => (
    this.props.handleSelectedObjectArrayArrayDeleteElement('locations', 'editableAreaUnitsRange', locationId, key)
  );

  renderUnitsRangeTable = () => (
    <div className='panel panel-default'>
      <table className='table table-bordered'>
        <thead>
        <tr>
          <th>Min</th>
          <th>Max</th>
          <th>Step</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        { this.getLocationsInputValue('editableAreaUnitsRange') ?
          this.getLocationsInputValue('editableAreaUnitsRange').map((col, k) =>
            <tr key={k}>
              <td><input type='text' className='form-control'
                         value={col[0]}
                         onChange={e =>
                           this.props.handleSelectedObjectArrayArrayChange('locations', 'editableAreaUnitsRange',
                             this.state.location, k, 0, e)}/>
              </td>
              <td><input type='text' className='form-control'
                         value={col[1]}
                         onChange={e =>
                           this.props.handleSelectedObjectArrayArrayChange('locations', 'editableAreaUnitsRange', this.state.location, k, 1, e)}/>
              </td>
              <td><input type='text' className='form-control'
                         value={col[2]}
                         onChange={e =>
                           this.props.handleSelectedObjectArrayArrayChange('locations', 'editableAreaUnitsRange', this.state.location, k, 2, e)}/>
              </td>
              <td><a className='btn btn-danger btn-xs' href='#'
                     onClick={() => this.deleteUnitsRangeRow(this.state.location, k)}>
                <i className='fa fa-ban'/></a></td>
            </tr>
          ) : null}
        </tbody>
      </table>

      <div className='panel-footer'>
        <a className='btn btn-primary btn-xs' href='#' onClick={() => this.addUnitsRangeRow(this.state.location)}>
          <i className='fa fa-plus'/> Add units range</a>
      </div>
    </div>
  );

  handleLocationsNestedFileChoose = (prop, e) => {
    const locs = [...this.props.objectHolder.locations];
    (locs[this.state.location])[prop] = e.target.files[0];
    this.props.setEditingObjectProperty('locations', locs);
  };

  changeNestedHolderArrValue = (topArrPropName, topInd, changingArrPropName, changingArrInd, value) => {
    const topArr = [...this.props.objectHolder[topArrPropName]];
    ((topArr[topInd])[changingArrPropName])[changingArrInd] = value;
    this.props.setEditingObjectProperty(topArrPropName, [...topArr]);
  };

  changeLocationsNestedArrValue = (changingArrPropName, changingArrInd, value) =>
    this.changeNestedHolderArrValue('locations', this.state.location, changingArrPropName, changingArrInd, value);

  changeNestedHolderValue = (topArrPropName, topInd, changingPropName, value) => {
    const topArr = this.props.objectHolder[topArrPropName];
    ((topArr[topInd])[changingPropName]) = value;
    this.props.setEditingObjectProperty(topArrPropName, [...topArr]);
  };

  changeLocationsNestedHolderValue = (changingPropName, value) =>
    this.changeNestedHolderValue('locations', this.state.location, changingPropName, value);

  crop = () => {
    if (!this.cropper) {
      return;
    }
    const data = this.cropper.getData();
    forOwn(data, (value, key) => {
      if (value === '-0.00') {
        data[key] = '0.00';
      }
    });
    this.changeLocationsNestedArrValue('editableArea', 0, Number(data.x.toFixed(2)));
    this.changeLocationsNestedArrValue('editableArea', 1, Number(data.y.toFixed(2)));
    this.changeLocationsNestedArrValue('editableArea', 2, Number((data.width + data.x).toFixed(2)));
    this.changeLocationsNestedArrValue('editableArea', 3, Number((data.height + data.y).toFixed(2)));
  };

  render() {
    return (
      <div>
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
              value={this.state.location > -1 && this.props.objectHolder.locations &&
              this.props.objectHolder.locations.length ?
                (this.props.objectHolder.locations)[this.state.location] : null}
              options={this.props.objectHolder.locations && this.props.objectHolder.locations.length ?
                this.props.objectHolder.locations : []}
              onNewOptionClick={val => {
                let obj = {};
                forEach(Object.getOwnPropertyNames(Location), p => {
                  if (Location[p].type === 'array' || Array.isArray(Location[p].type)) {
                    obj[p] = [];
                  } else {
                    if (typeof Location[p].default === 'boolean') {
                      obj[p] = Location[p].default;
                    } else {
                      obj[p] = '';
                    }
                  }
                });
                this.props.setEditingObjectProperty('locations', [...this.props.objectHolder.locations,
                  {...obj, name: val.name}]);
                this.setState({
                  ...this.state, location: findIndex(this.props.objectHolder.locations,
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
                  ...this.state, location: findIndex(this.props.objectHolder.locations,
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
                 forEach(Object.getOwnPropertyNames(Location), p => {
                   if (Location[p].type === 'array' || Array.isArray(Location[p].type)) {
                     obj[p] = [];
                   } else {
                     if (typeof Location[p].default === 'boolean') {
                       obj[p] = Location[p].default;
                     } else {
                       obj[p] = '';
                     }
                   }
                 });
                 this.props.setEditingObjectProperty('locations', [...this.props.objectHolder.locations,
                   {...obj, name: val.name}]);
                 this.setState({
                   ...this.state, location: findIndex(this.props.objectHolder.locations,
                     loc => loc.name === val.name)
                 });
               }}>
              <i className='fa fa-plus' aria-hidden='true'></i>
            </a>
          </div>
        </div>
        {this.state.location < 0 ||
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
                               onChange={e => this.changeLocationsNestedHolderValue('name', e.target.value)}
                               value={this.getLocationsInputValue('name')}/>
                      </div>
                    </div>
                  </div>

                  <div className='row' style={{marginBottom: 6}}>
                    <div className='col-lg-12'>
                      <div className='input-group input-group-sm'>
                        <span className='input-group-addon'>Image</span>
                        <input type='file' className='form-control'
                               onChange={e => this.handleLocationsNestedFileChoose('image', e)}/>
                        {typeof this.getLocationsInputValue('image') === 'string' ?
                          <div className='input-group-btn'>
                            <a href={this.props.getFileUrl(this.getLocationsInputValue('image'))}
                               className='btn btn-default btn-sm'>{
                              (() => {
                                let url = this.props.getFileUrl(this.getLocationsInputValue('image'));
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
                               onChange={e => this.handleLocationsNestedFileChoose('mask', e)}/>
                        {typeof this.getLocationsInputValue('mask') === 'string' ?
                          <div className='input-group-btn'>
                            <a href={this.props.getFileUrl(this.getLocationsInputValue('mask'))}
                               className='btn btn-default btn-sm'>{
                              (() => {
                                let url = this.props.getFileUrl(this.getLocationsInputValue('mask'));
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
                               onChange={e => this.handleLocationsNestedFileChoose('overlayInfo', e)}/>
                        {typeof this.getLocationsInputValue('overlayInfo') === 'string' ?
                          <div className='input-group-btn'>
                            <a href={this.props.getFileUrl(this.getLocationsInputValue('overlayInfo'))}
                               className='btn btn-default btn-sm'>{
                              (() => {
                                let url = this.props.getFileUrl(this.getLocationsInputValue('overlayInfo'));
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
                                 this.changeLocationsNestedArrValue('editableAreaUnits', 0, e.target.value)}
                               value={(() => {
                                 const vals = this.getLocationsInputValue('editableAreaUnits') || [];
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
                                 this.changeLocationsNestedArrValue('editableAreaUnits', 1, e.target.value)}
                               value={
                                 (() => {
                                   const vals = this.getLocationsInputValue('editableAreaUnits') || [];
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
                                 this.changeLocationsNestedArrValue('clipRect', 0, Number(e.target.value))}
                               value={(() => {
                                 const vals = this.getLocationsInputValue('clipRect') || [];
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
                                 this.changeLocationsNestedArrValue('clipRect', 1, Number(e.target.value))}
                               value={
                                 (() => {
                                   const vals = this.getLocationsInputValue('clipRect') || [];
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
                                 this.changeLocationsNestedArrValue('clipRect', 2, Number(e.target.value))}
                               value={(() => {
                                 const vals = this.getLocationsInputValue('clipRect') || [];
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
                                 this.changeLocationsNestedArrValue('clipRect', 3, Number(e.target.value))}
                               value={
                                 (() => {
                                   const vals = this.getLocationsInputValue('clipRect') || [];
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
                      {this.renderUnitsRangeTable()}
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

                                   this.changeLocationsNestedArrValue('editableArea', 0, Number(xNew));
                                   this.cropper.setData(newData);
                                 }
                               }}
                               value={(() => {
                                 const vals = this.getLocationsInputValue('editableArea');
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

                                   this.changeLocationsNestedArrValue('editableArea', 2, Number(x1New));

                                   this.cropper.setData(newData);
                                 }
                               }}
                               value={(() => {
                                 const vals = this.getLocationsInputValue('editableArea');
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
                                   this.changeLocationsNestedArrValue('editableArea', 1, Number(yNew));
                                   this.cropper.setData(newData);
                                 }
                               }}
                               value={(() => {
                                 const vals = this.getLocationsInputValue('editableArea');
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
                                   this.changeLocationsNestedArrValue('editableArea', 3, Number(y1New));

                                   this.cropper.setData(newData);
                                 }
                               }}
                               value={(() => {
                                 const vals = this.getLocationsInputValue('editableArea');
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
                          this.props.objectHolder.locations[this.state.location]
                            .editableAreaUnitsRestrictRotation
                        }
                        onChange={op =>
                          this.changeLocationsNestedHolderValue('editableAreaUnitsRestrictRotation',
                            op ? op.value : false)
                        }
                      />
                    </div>
                  </div>
                  <div className='row' style={{marginBottom: 6}}>
                    <div className='col-lg-12'>
                      <button type='button' className='btn btn-block btn-danger'
                              onClick={this.deleteCurrentLocation}>Delete this location
                      </button>
                    </div>
                  </div>
                </div>
                <div className='col-lg-8'>
                  <div className="panel panel-default">
                    <Cropper
                      ref={cr => this.cropper = cr}
                      src={this.getImageUrl(this.props.objectHolder.locations[this.state.location].image)}
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
      </div>
    );
  }
}
