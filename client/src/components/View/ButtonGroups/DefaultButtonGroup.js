import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class DefaultButtonGroup extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onAddNewBtnClick: PropTypes.func.isRequired,
    onImportBtnClick: PropTypes.func.isRequired,
    onResetFilterBtnClick: PropTypes.func.isRequired,
    enableImportJson: PropTypes.func
  };

  render() {
    return <div className='pull-right'>
      <button type='button' className='btn btn-primary' style={{marginBottom: 6}}
              onClick={this.props.onAddNewBtnClick}>Add new {this.props.title}
      </button>
      {typeof this.props.enableImportJson === 'function' ?
        <button type='button' className='btn btn-default' style={{marginBottom: 6}}
                onClick={this.props.onImportBtnClick}>Import from JSON
        </button> : null}
      <button type='button' className='btn btn-default' style={{marginBottom: 6}}
              onClick={this.props.onResetFilterBtnClick}>Reset filter
      </button>
    </div>;
  }
}
