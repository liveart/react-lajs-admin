import React, {Component} from 'react';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';

export default class SortRow extends Component {
  static propTypes = {
    sortingSupport: PropTypes.bool,
    objectSample: PropTypes.object.isRequired,
    objectHolder: PropTypes.object.isRequired,
    updateObject: PropTypes.func.isRequired,
    count: PropTypes.number,
    representations: PropTypes.object
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

          if (this.props.representations && this.props.representations.hasOwnProperty(key)) {
            if (this.props.objectSample[key].sortable === false) {
              return <td key={key}/>;
            } else if (this.props.representations[key].sortElem) {
              return <td key={key}>{this.props.representations[key].sortElem}</td>;
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
