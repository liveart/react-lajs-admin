import React, {Component} from 'react';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';

export default class Body extends Component {
  static propTypes = {
    objectSample: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    handleEdit: PropTypes.func.isRequired,
    representations: PropTypes.object
  };

  render() {
    const {item} = this.props;

    return (
      <tr key={item.id} onClick={() => this.props.handleEdit(item)}>
        {
          keys(this.props.objectSample).map(key => {
            if (this.props.objectSample[key].showInTable === false) {
              return null;
            }

            if (this.props.representations && this.props.representations.hasOwnProperty(key)) {
              return <td key={key}>{this.props.representations[key].getElem(item[key])}</td>;
            }

            if (typeof item[key] === 'object') {
              return <td key={key}/>;
            }

            return <td key={key}>{item[key]}</td>;
          })
        }
      </tr>
    );
  }
}
