import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  MOVE_GRAPHICS_TO_OTHER_CATEGORY
} from '../../../definitions';
import * as GraphicsCategoryModel from '../../../../../common/models/graphics-category.json';
const GraphicsCategory = GraphicsCategoryModel.properties;

export default class DeleteButton extends Component {
  static propTypes = {
    newGraphic: PropTypes.object,
    selectedSecondaryValue: PropTypes.string,
    handleDeleteBtnClick: PropTypes.func,
    enableDefaultStatus: PropTypes.func,
    restoreTableState: PropTypes.func
  };

  render() {
    return <div>
      <div className='pull-right'>
        {this.props.newGraphic === '' && this.props.selectedSecondaryValue === MOVE_GRAPHICS_TO_OTHER_CATEGORY ?
          <button disabled type='button' className='btn btn-danger'
                  onClick={() => this.props.handleDeleteBtnClick(true)}>Delete
          </button> :
          <button type='button' className='btn btn-danger'
                  onClick={() => this.props.handleDeleteBtnClick(true)}>Delete
          </button>}
        <button type='button' className='btn btn-default'
                onClick={() => {
                  this.props.enableDefaultStatus();
                  this.props.restoreTableState(GraphicsCategory);
                }}>Cancel
        </button>
      </div>
    </div>;
  }
}

