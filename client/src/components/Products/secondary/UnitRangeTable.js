import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class UnitRangeTable extends Component {
  static propTypes = {
    addUnitsRangeRow: PropTypes.func,
    deleteUnitsRangeRow: PropTypes.func,
    onMinChange: PropTypes.func,
    onMaxChange: PropTypes.func,
    onStepChange: PropTypes.func,
    getLocationsInputValue: PropTypes.array,
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
        {this.props.getLocationsInputValue ?
          this.props.getLocationsInputValue.map((col, k) =>
            <tr key={k}>
              <td><input type='text' className='form-control'
                         value={col[0]}
                         onChange={e => this.props.onMinChange(k, e)}/>
              </td>
              <td><input type='text' className='form-control'
                         value={col[1]}
                         onChange={e => this.props.onMaxChange(k, e)}/>
              </td>
              <td><input type='text' className='form-control'
                         value={col[2]}
                         onChange={e => this.props.onStepChange(k, e)}/>
              </td>
              <td><a className='btn btn-danger btn-xs' href='#'
                     onClick={() => this.props.deleteUnitsRangeRow(k)}>
                <i className='fa fa-times'/></a></td>
            </tr>
          ) : null}
        </tbody>
      </table>

      <div className='panel-footer'>
        <a className='btn btn-primary btn-xs' href='#'
           onClick={this.props.addUnitsRangeRow}>
          <i className='fa fa-plus'/> Add units range</a>
      </div>
    </div>;
  }
}
