import React, {Component} from 'react';
import {IN_FT, CM_M, getOptionsInputValue} from './helpers.js';

export default class ConfigurationOptions extends Component {

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
                      value={getOptionsInputValue('deleteOnDoubleClick', this.props.options)}
                      onChange={e => this.props.changeOptionsNestedHolderValue('deleteOnDoubleClick', e.target.value)}>
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
                      value={getOptionsInputValue('includeProductInDesign', this.props.options)}
                      onChange={e => this.props.changeOptionsNestedHolderValue('includeProductInDesign', e.target.value)}>
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
                      value={getOptionsInputValue('includePrintingAreaInDesign', this.props.options)}
                      onChange={e => this.props.changeOptionsNestedHolderValue('includePrintingAreaInDesign', e.target.value)}>
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
                      value={getOptionsInputValue('includeMaskInDesign', this.props.options)}
                      onChange={e => this.props.changeOptionsNestedHolderValue('includeMaskInDesign', e.target.value)}>
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
                     onChange={e => this.props.changeOptionsNestedHolderValue('fontsCSSUrl', e.target.value)}
                     value={getOptionsInputValue('fontsCSSUrl', this.props.options)}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Zoom Enabled: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={getOptionsInputValue('zoomEnabled', this.props.options)}
                      onChange={e => this.props.changeOptionsNestedHolderValue('zoomEnabled', e.target.value)}>
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
                     onChange={e => this.props.changeOptionsNestedHolderValue('minZoom', Number(e.target.value))}
                     value={getOptionsInputValue('minZoom', this.props.options)}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Max Zoom: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     onChange={e => this.props.changeOptionsNestedHolderValue('maxZoom', Number(e.target.value))}
                     value={getOptionsInputValue('maxZoom', this.props.options)}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Zoom Step: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     onChange={e => this.props.changeOptionsNestedHolderValue('zoomStep', Number(e.target.value))}
                     value={getOptionsInputValue('zoomStep', this.props.options)}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Checkered Background: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={getOptionsInputValue('checkeredBackground', this.props.options)}
                      onChange={e => this.props.changeOptionsNestedHolderValue('checkeredBackground', e.target.value)}>
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
                      value={getOptionsInputValue('unitConversionMult', this.props.options)}
                      onChange={e => this.props.changeOptionsUnitValue(Number(e.target.value))}>
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
                      value={getOptionsInputValue('showProductSelector', this.props.options)}
                      onChange={e => this.props.changeOptionsNestedHolderValue('showProductSelector', e.target.value)}>
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
                     onChange={e => this.props.changeOptionsNestedHolderValue('checkTextFXThrottle', Number(e.target.value))}
                     value={getOptionsInputValue('checkTextFXThrottle', this.props.options)}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Min DPU: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     onChange={e => this.props.changeOptionsNestedHolderValue('minDPU', Number(e.target.value))}
                     value={getOptionsInputValue('minDPU', this.props.options)}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Show Uploaded Colors Dialog: </p>
            </div>
            <div className='col-md-9'>
              <select className='form-control'
                      value={getOptionsInputValue('showUploadedColorsDialog', this.props.options)}
                      onChange={e => this.props.changeOptionsNestedHolderValue('showUploadedColorsDialog', e.target.value)}>
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
                      value={getOptionsInputValue('fitProductImage', this.props.options)}
                      onChange={e => this.props.changeOptionsNestedHolderValue('fitProductImage', e.target.value)}>
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
                      value={getOptionsInputValue('enableSnapGuides', this.props.options)}
                      onChange={e => this.props.changeOptionsNestedHolderValue('enableSnapGuides', e.target.value)}>
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

