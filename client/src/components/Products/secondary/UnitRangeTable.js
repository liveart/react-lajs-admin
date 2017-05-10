import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class UnitRangeTable extends Component {
  static propTypes = {
    location: PropTypes.number,
    objectHolder: PropTypes.object,
    addUnitsRangeRow: PropTypes.func,
    deleteUnitsRangeRow: PropTypes.func,
    updateDblNestedArray: PropTypes.func,
    getLocationsInputValue: PropTypes.func,
    updateArray: PropTypes.func,
  };

  render() {
    return <div className='panel panel-default'>
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
        { this.props.getLocationsInputValue('editableAreaUnitsRange') ?
          this.props.getLocationsInputValue('editableAreaUnitsRange').map((col, k) =>
            <tr key={k}>
              <td><input type='text' className='form-control'
                         value={col[0]}
                         onChange={e =>
                           this.props.updateArray(this.props.updateDblNestedArray(this.props.objectHolder, 'locations', 'editableAreaUnitsRange',
                             this.props.location, k, 0, e))}/>
              </td>
              <td><input type='text' className='form-control'
                         value={col[1]}
                         onChange={e =>
                           this.props.updateArray(
                             this.props.updateDblNestedArray('locations', 'editableAreaUnitsRange',
                               this.props.location, k, 1, e))}/>
              </td>
              <td><input type='text' className='form-control'
                         value={col[2]}
                         onChange={e =>
                           this.props.updateArray(
                             this.props.updateDblNestedArray('locations', 'editableAreaUnitsRange',
                               this.props.location, k, 2, e))}/>
              </td>
              <td><a className='btn btn-danger btn-xs' href='#'
                     onClick={() => this.props.deleteUnitsRangeRow(this.props.location, k)}>
                <i className='fa fa-ban'/></a></td>
            </tr>
          ) : null}
        </tbody>
      </table>

      <div className='panel-footer'>
        <a className='btn btn-primary btn-xs' href='#' onClick={() => this.props.addUnitsRangeRow(this.props.location)}>
          <i className='fa fa-plus'/> Add units range</a>
      </div>
    </div>;
  }
}
