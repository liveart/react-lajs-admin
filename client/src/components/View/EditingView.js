import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  STATUS_EDITING,
  STATUS_CREATING
} from '../../definitions';
import CreatingButtonGroup from './ButtonGroups/CreatingButtonGroup';
import EditingButtonGroup from './ButtonGroups/EditingButtonsGroup';

export default class EditingView extends Component {
  static propTypes = {
    onCancelBtnClick: PropTypes.func.isRequired,
    onSaveBtnClick: PropTypes.func.isRequired,
    onSaveChangesBtnClick: PropTypes.func.isRequired,
    onDeleteBtnClick: PropTypes.func.isRequired,
    renderInputs: PropTypes.func.isRequired
  };

  render() {
    return <section>
      <div className='row'>
        <div className='col-md-12'>
          <section className='content'>
            <div className='box box-info'>
              <div className='box-header with-border'>
                <h3 className='box-title'>{`${this.props.title} information`}</h3>
              </div>
              <form className='form-horizontal'>
                <div className='box-body'>
                  {this.props.renderInputs()}
                </div>
                <div className='box-footer'>
                  {this.props.status === STATUS_CREATING ?
                    <CreatingButtonGroup onCancelBtnClick={this.props.onCancelBtnClick}
                                         onSaveBtnClick={this.props.onSaveBtnClick}/> : null}
                  {this.props.status === STATUS_EDITING ?
                    <EditingButtonGroup onCancelBtnClick={this.props.onCancelBtnClick}
                                        onSaveBtnClick={this.props.onSaveBtnClick}
                                        onSaveChangesBtnClick={this.props.onSaveChangesBtnClick}
                                        onDeleteBtnClick={this.props.onDeleteBtnClick}/> : null}
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </section>;
  }
}
