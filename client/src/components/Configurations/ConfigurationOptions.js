import React, {Component} from 'react';
import {forEach, map, findIndex, forOwn} from 'lodash';
import {Creatable} from 'react-select';
const IN_FT = Number(12);
const CM_M = Number(10);

export default class ConfigurationOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {option: -1};
    if (!Array.prototype.remove) {
      Array.prototype.remove = function (from, to) {
        const rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
      };
    }
  }

  getOptionsInputValue = propertyName => {
    if (!this.props.objectHolder.options || !this.props.objectHolder.options[propertyName]) {
      return '';
    }
    return this.props.objectHolder.options[propertyName];
  };

  changeOptionsNestedHolderValue = (changingPropName, value) => {
    const option = this.props.objectHolder['options'];
    option[changingPropName] = value;
    this.props.setEditingObjectProperty('options', option);
  };

  changeOptionsUnitValue = (value) => {
    const option = this.props.objectHolder['options'];
    option['unitConversionMult'] = value;
    if (value === IN_FT) {
      option['unit'] = 'in';
      option['unit2'] = 'ft';
      this.props.setEditingObjectProperty('options', option);
    } else if (value === CM_M) {
      option['unit'] = 'cm';
      option['unit2'] = 'm';
      this.props.setEditingObjectProperty('options', option);
    }
  };

  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Delete On Double Click: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={this.getOptionsInputValue('deleteOnDoubleClick')}
                      onChange={e => this.changeOptionsNestedHolderValue('deleteOnDoubleClick', e.target.value)}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Include Product In Design: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={this.getOptionsInputValue('includeProductInDesign')}
                      onChange={e => this.changeOptionsNestedHolderValue('includeProductInDesign', e.target.value)}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Include Printing Area In Design: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={this.getOptionsInputValue('includePrintingAreaInDesign')}
                      onChange={e => this.changeOptionsNestedHolderValue('includePrintingAreaInDesign', e.target.value)}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Include Mask In Design: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={this.getOptionsInputValue('includeMaskInDesign')}
                      onChange={e => this.changeOptionsNestedHolderValue('includeMaskInDesign', e.target.value)}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Fonts CSS Url: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     onChange={e => this.changeOptionsNestedHolderValue('fontsCSSUrl', e.target.value)}
                     value={this.getOptionsInputValue('fontsCSSUrl')}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Zoom Enabled: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={this.getOptionsInputValue('zoomEnabled')}
                      onChange={e => this.changeOptionsNestedHolderValue('zoomEnabled', e.target.value)}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Min Zoom: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     onChange={e => this.changeOptionsNestedHolderValue('minZoom', Number(e.target.value))}
                     value={this.getOptionsInputValue('minZoom')}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Max Zoom: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     onChange={e => this.changeOptionsNestedHolderValue('maxZoom', Number(e.target.value))}
                     value={this.getOptionsInputValue('maxZoom')}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Zoom Step: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     onChange={e => this.changeOptionsNestedHolderValue('zoomStep', Number(e.target.value))}
                     value={this.getOptionsInputValue('zoomStep')}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Checkered Background: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={this.getOptionsInputValue('checkeredBackground')}
                      onChange={e => this.changeOptionsNestedHolderValue('checkeredBackground', e.target.value)}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Unit: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={this.getOptionsInputValue('unitConversionMult')}
                      onChange={e => this.changeOptionsUnitValue(Number(e.target.value))}>
                <option value={IN_FT}>in, ft</option>
                <option value={CM_M}>cm, m</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Show Product Selector: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={this.getOptionsInputValue('showProductSelector')}
                      onChange={e => this.changeOptionsNestedHolderValue('showProductSelector', e.target.value)}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Check Text FXThrottle: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     onChange={e => this.changeOptionsNestedHolderValue('checkTextFXThrottle', Number(e.target.value))}
                     value={this.getOptionsInputValue('checkTextFXThrottle')}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Min DPU: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     onChange={e => this.changeOptionsNestedHolderValue('minDPU', Number(e.target.value))}
                     value={this.getOptionsInputValue('minDPU')}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Show Uploaded Colors Dialog: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={this.getOptionsInputValue('showUploadedColorsDialog')}
                      onChange={e => this.changeOptionsNestedHolderValue('showUploadedColorsDialog', e.target.value)}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Fit Product Image: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={this.getOptionsInputValue('fitProductImage')}
                      onChange={e => this.changeOptionsNestedHolderValue('fitProductImage', e.target.value)}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Enable Snap Guides: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={this.getOptionsInputValue('enableSnapGuides')}
                      onChange={e => this.changeOptionsNestedHolderValue('enableSnapGuides', e.target.value)}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
