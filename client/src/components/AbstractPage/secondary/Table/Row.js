import React, {Component} from 'react';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';
import find from 'lodash/find';
import {getElement} from '../../../../configurableElements/factories/representations';

export default class Row extends Component {
  static propTypes = {
    objectSample: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    secondaryData: PropTypes.array,
    handleEdit: PropTypes.func.isRequired
  };

  render() {
    const {item} = this.props;
    let text = '';

    return (
      <tr onClick={() => this.props.handleEdit(item)}>
        {
          keys(this.props.objectSample).map(key => {
            text = item[key];
            if (this.props.objectSample[key].showInTable === false) {
              return null;
            }

            if (typeof item[key] === 'object') {
              return <td key={key}/>;
            }

            if (typeof this.props.objectSample[key].textProperty === 'string' && this.props.secondaryData) {
              const relObj = find(this.props.secondaryData, i => i.id === item[key]);
              if (relObj) {
                text = relObj[this.props.objectSample[key].textProperty];
              } else {
                text = '';
              }
            }
            return <td key={key}>{getElement(this.props.objectSample[key].representation, text)}</td>;
          })
        }
      </tr>
    );
  }
}
