import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ImportButtonGroup extends Component {
  static propTypes = {
    onCancelBtnClick: PropTypes.func.isRequired
  };

  handleSaveImportBtnClick = () =>
    this.props.handleImportJson(this.props.json, this.props.baseUrl, this.props.urlOption);

  render() {
    return <div>
      <div className='pull-left'>
        <button type='button' className='btn btn-default'
                onClick={this.props.onCancelBtnClick}>Cancel
        </button>
      </div>
      <div className='pull-right'>
        <button type='button' className='btn btn-primary'
                onClick={this.handleSaveImportBtnClick}>Import
        </button>
      </div>
    </div>;
  }
}
