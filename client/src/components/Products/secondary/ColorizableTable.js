import React, {Component} from 'react';
import Select, {Creatable} from 'react-select';
import PropTypes from 'prop-types';
import {
  getColorgroupsOptions,
  getColorizableColorsOptions,
  getOptions,
  getSelectedColorizableColorgroupOptions,
  getSelectedColorizableColorsOptions,
  getSelectedColorizableOptions
} from './helpers';

export default class ProductColorizableTable extends Component {

  static propTypes = {
    colorizables: PropTypes.object,
    handleSelectedObjectArrayChange: PropTypes.func,
    handleColorActionOption: PropTypes.func,
    onColorizableColorsSelectChange: PropTypes.func,
    onColorizableColorgroupSelectChange: PropTypes.func,
    deleteColorizableRow: PropTypes.func,
    addColorizableRow: PropTypes.func,
  };

  render() {
    return <div className='panel panel-default'>
      <table className='table table-bordered'>
        <thead>
        <tr>
          <th>Name</th>
          <th>Id</th>
          <th>Colors</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {this.props.colorizables ?
          this.props.colorizables.map((c, key) =>
            <tr key={key}>
              <td className='col-md-4'><input type='text' className='form-control'
                                              value={c.name}
                                              onChange={e => this.props.handleSelectedObjectArrayChange('colorizables', key, 'name', e)}/>
              </td>
              <td className='col-md-4'><input type='text' className='form-control'
                                              value={c.id}
                                              onChange={e => this.props.handleSelectedObjectArrayChange('colorizables', key, 'id', e)}/>
              </td>
              <td className='col-md-4'>
                <Select style={{marginBottom: 6}}
                        value={getSelectedColorizableOptions(key, this.props.colorizables)}
                        labelKey='name'
                        options={getColorizableColorsOptions()}
                        onChange={os => this.props.handleColorActionOption(os, key)}
                        clearable={false}
                />
                {!c.assignColorgroup ?
                  <Creatable
                    name='colors'
                    value={getSelectedColorizableColorsOptions(key, this.props.colorizables)}
                    multi={true}
                    labelKey='name'
                    options={getOptions(this.props.colors)}
                    onChange={os => this.props.onColorizableColorsSelectChange(os, key)}
                    isLoading={this.props.colorsLoading}
                  /> : <Select
                    name='colorgroup'
                    value={getSelectedColorizableColorgroupOptions(key, this.props.colorizables)}
                    labelKey='name'
                    options={getColorgroupsOptions(this.props.colorgroups)}
                    onChange={os => this.props.onColorizableColorgroupSelectChange(os, key)}
                    isLoading={this.props.colorgroupsLoading}
                  /> }
              </td>
              <td><a className='btn btn-danger btn-xs' href='#' onClick={() => this.props.deleteColorizableRow(key)}>
                <i className='fa fa-ban'/></a></td>
            </tr>) : null}
        </tbody>
      </table>
      <div className='panel-footer'>
        <a className='btn btn-primary btn-xs' href='#' onClick={() => this.props.addColorizableRow()}>
          <i className='fa fa-plus'/> Add element</a>
      </div>
    </div>;
  }
}
