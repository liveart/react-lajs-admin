import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  MOVE_COLORS_TO_OTHER_GROUP
} from '../../../definitions';
import * as ColorgroupModel from '../../../../../common/models/colorgroup.json';
const Colorgroup = ColorgroupModel.properties;

export default class DeleteButton extends Component {
  static propTypes = {
    newGroup: PropTypes.object,
    selectedValue: PropTypes.string,
    handleDeleteBtnClick: PropTypes.func.isRequired,
    enableDefaultStatus: PropTypes.func.isRequired,
    restoreTableState: PropTypes.func.isRequired
  };

  render() {
    return <div>
      <div className='pull-right'>
        {this.props.newGraphic === {} && this.props.selectedValue === MOVE_COLORS_TO_OTHER_GROUP ?
          <button disabled type='button' className='btn btn-danger'
                  onClick={() => this.props.handleDeleteBtnClick(true)}>Delete
          </button> :
          <button type='button' className='btn btn-danger'
                  onClick={() => this.props.handleDeleteBtnClick(true)}>Delete
          </button>}
        <button type='button' className='btn btn-default'
                onClick={() => {
                  this.props.enableDefaultStatus();
                  this.props.restoreTableState(Colorgroup);
                }}>Cancel
        </button>
      </div>
    </div>;
  }
}

