import React, {Component} from 'react';
import {Creatable} from 'react-select';
import PropTypes from 'prop-types';
import {} from '../../../definitions';

export default class EditableAreaSizesTable extends Component {
  static propTypes = {
    handleSelectedObjectArrayChange: PropTypes.func,
    deleteEditableAreaSizeRow: PropTypes.func,
    addEditableAreaSizeRow: PropTypes.func
  };

  render() {
    return <div className='panel panel-default'>
      <table className='table table-bordered'>
        <thead>
        <tr>
          <th>Label</th>
          <th>Width</th>
          <th>Height</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {this.props.editableAreaSizes ?
          this.props.editableAreaSizes.map((c, key) =>
            <tr key={key}>
              <td><input type='text' className='form-control'
                         value={c.label}
                         onChange={e =>
                           this.props.handleSelectedObjectArrayChange('editableAreaSizes', key, 'label', e)}/>
              </td>
              <td><input type='text' className='form-control'
                         value={c.width}
                         onChange={e =>
                           this.props.handleSelectedObjectArrayChange('editableAreaSizes', key, 'width', e)}/>
              </td>
              <td><input type='text' className='form-control'
                         value={c.height}
                         onChange={e =>
                           this.props.handleSelectedObjectArrayChange('editableAreaSizes', key, 'height', e)}/>
              </td>
              <td><a className='btn btn-danger btn-xs' href='#'
                     onClick={() => this.props.deleteEditableAreaSizeRow(key)}>
                <i className='fa fa-ban'/></a></td>
            </tr>) : null}
        </tbody>
      </table>
      <div className='panel-footer'>
        <a className='btn btn-primary btn-xs' href='#' onClick={() => this.props.addEditableAreaSizeRow()}>
          <i className='fa fa-plus'/> Add size</a>
      </div>
    </div>;
  }
}