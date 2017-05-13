import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {getColorsLocationsOptions, getOptions, getSelectedColorLocationsOptions, getSelectedOptions} from './helpers';
import {Elements} from '../../../configurableElements/config';
import {getElement} from '../../../configurableElements/factories/elements';

export default class ColorsTable extends Component {
  static propTypes = {
    onColorsSelectChange: PropTypes.func,
    onColorLocationChange: PropTypes.func,
    deleteLocationRow: PropTypes.func,
    addLocationRow: PropTypes.func,
    deleteColorsRow: PropTypes.func,
    addColorsRow: PropTypes.func
  };

  render() {
    return <div className='panel panel-default'>
      <table className='table table-bordered'>
        <thead>
        <tr>
          <th>Color</th>
          <th>Locations</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {this.props.objectHolder.colors ?
          this.props.objectHolder.colors.map((c, key) =>
            <tr key={key}>
              <td className='col-md-4'>
                <Select
                  name='colors'
                  value={getSelectedOptions(key, this.props.objectHolder.colors)}
                  labelKey='name'
                  options={this.props.getOptions(this.props.colorList)}
                  onChange={os => this.props.onColorsSelectChange(os, key)}
                  isLoading={this.props.colorsLoading}
                />
              </td>
              <td className='col-md-8'>
                <div className='panel panel-default'>
                  <table className='table'>
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>Image</th>
                      <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {c.location ? c.location.map((loc, k) => (
                      <tr key={k}>
                        <td>
                          <Select style={{marginBottom: 6}}
                                  name='locations'
                                  value={getSelectedColorLocationsOptions(key, k, this.props.objectHolder.colors)}
                                  multi={false}
                                  labelKey='name'
                                  options={getColorsLocationsOptions(this.props.objectHolder.locations)}
                                  onChange={os => this.props.onColorLocationChange(os, key, k)}
                                  clearable={false}
                          />
                        </td>
                        <td>
                          <input type='file' className='form-control' accept='image/*'
                                 onChange={e =>
                                   this.props.onImageChange(key, k, e)}/>
                        </td>
                        <td><a className='btn btn-danger btn-xs' href='#'
                               onClick={() => this.props.deleteLocationRow(key, k)}>
                          <i className='fa fa-ban'/></a></td>
                      </tr>
                    )) : null}
                    </tbody>
                  </table>
                  <div className='panel-footer'>
                    <a className='btn btn-primary btn-xs' href='#' onClick={() => this.props.addLocationRow(key)}>
                      <i className='fa fa-plus'/> Add location</a>
                  </div>
                </div>
              </td>
              <td><a className='btn btn-danger btn-xs' href='#' onClick={() => this.props.deleteColorsRow(key)}>
                <i className='fa fa-ban'/></a></td>
            </tr>) : null}
        </tbody>
      </table>
      <div className='panel-footer'>
        <a className='btn btn-primary btn-xs' href='#' onClick={this.props.addColorsRow}>
          <i className='fa fa-plus'/> Add color</a>
      </div>
    </div>;
  }
}
