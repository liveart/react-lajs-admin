import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class EditingButtonGroup extends Component {
  static propTypes = {
    onCancelBtnClick: PropTypes.func.isRequired,
    onSaveBtnClick: PropTypes.func.isRequired,
    onSaveChangesBtnClick: PropTypes.func.isRequired,
    onDeleteBtnClick: PropTypes.func.isRequired
  };

  render() {
    return <div>
      <div className='pull-left'>
        <button type='button' className='btn btn-default'
                onClick={this.props.onCancelBtnClick}>Cancel
        </button>
      </div>
      <div className='pull-right'>
        <button type='button' className='btn btn-primary'
                onClick={this.props.onSaveBtnClick}>Save
        </button>
        <button type='button' className='btn btn-primary'
                onClick={this.props.onSaveChangesBtnClick}>Save and
          continue edit
        </button>
        <button type='button' className='btn btn-danger'
                onClick={this.props.onDeleteBtnClick}>Delete
        </button>
      </div>
    </div>;
  }
}
