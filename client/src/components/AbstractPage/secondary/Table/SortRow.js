import React, {Component} from 'react';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';
import Select from 'react-select';
export default class fSortRow extends Component {
  static propTypes = {
    sortingSupport: PropTypes.bool,
    objectSample: PropTypes.object.isRequired,
    objectHolder: PropTypes.object.isRequired,
    updateObject: PropTypes.func.isRequired,
    count: PropTypes.number
  };

  render() {
    if (!this.props.sortingSupport || this.props.count === 0) {
      return null;
    }

    return (
      <tr>
        {keys(this.props.objectSample).map(key => {
          if (this.props.objectSample[key].showInTable === false) {
            return null;
          }

          if (this.props.objectSample[key].sortable === false) {
            return <td key={key}/>;
          }

          if (this.props.objectSample[key].sortElement && this.props.secondaryData) {
            if (this.props.objectSample[key].sortElement === 'SELECT') {
              return <td key={key}>
                <Select value={this.props.objectHolder[key]}
                        options={this.props.secondaryData}
                        valueKey='id'
                        labelKey='name'
                        onChange={el => this.props.setEditingObjectProperty(key, el ? el.id : '')}/>
              </td>;
            }
          }

          return <td key={key}>
            <input type='text' className='form-control'
                   value={this.props.objectHolder[key]}
                   onChange={e => this.props.updateObject(key, e)}/>
          </td>;
        })}
      </tr>
    );
  }
}
