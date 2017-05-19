import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * The component render input rows grouped into panel.
 */
export default class Panel extends Component {
  static propTypes = {
    inputRows: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const {inputRows} = this.props;

    return <div className='panel panel-default'>
      <div className='panel-body'>
        {inputRows.map(i => i)}
      </div>
    </div>;
  }
}
