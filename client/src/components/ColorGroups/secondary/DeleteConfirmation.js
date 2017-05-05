import React, {Component} from 'react';
import {RadioGroup, Radio} from 'react-radio-group';
import PropTypes from 'prop-types';
import {
  MOVE_COLORS_TO_OTHER_GROUP,
  DELETE_COLORS,
  LEAVE_COLORS_WITHOUT_GROUP
} from '../../../definitions';

export default class DeleteConfirmation extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    objectHolder: PropTypes.object,
    newGroup: PropTypes.object,
    selectedValue: PropTypes.string,
    linkedProducts: PropTypes.array.isRequired,
    linkedGraphics: PropTypes.array.isRequired,
    isLinkedToProduct: PropTypes.func.isRequired,
    isLinkedToGraphic: PropTypes.func.isRequired,
    handleMoveToGroup: PropTypes.func.isRequired,
    handleColorsActionOption: PropTypes.func.isRequired
  };

  render() {
    return <div className='form-group'>
      <div className='col-md-9'>
        {(!this.props.isLinkedToProduct() && this.props.linkedProducts.length) ||
        (!this.props.isLinkedToGraphic() && this.props.linkedGraphics.length) ?
          <div>
            <h4>Group linked to:</h4>
            {this.props.linkedProducts.length ? 'Products: ' + this.props.linkedProducts : null}
            &nbsp;
            {this.props.linkedGraphics.length ? 'Graphics: ' + this.props.linkedGraphics : null}
          </div> :
          <div className='col-md-6'>
            <h1>Choose an action</h1>
            <div className='form-group'>
              <RadioGroup name='fruit' selectedValue={this.props.selectedValue}
                          onChange={this.props.handleColorsActionOption}>
                <div>
                  <Radio value={DELETE_COLORS}/>&nbsp; Delete all the colors linked to this group
                </div>
                <div>
                  <Radio value={MOVE_COLORS_TO_OTHER_GROUP}/>&nbsp; Move colors to other group &nbsp;
                  <select value={this.props.newGroup}
                          onChange={this.props.handleMoveToGroup}>
                    {this.props.data.map((cg, key) => (
                      this.props.objectHolder.id !== cg.id ?
                        <option key={key} value={cg.id}>{cg.name}</option> : null
                    ))}
                  </select>
                </div>
                <div>
                  <Radio value={LEAVE_COLORS_WITHOUT_GROUP}/>&nbsp; Unlink and leave the colors without any group
                </div>
              </RadioGroup>
            </div>
          </div>}
        <div className='col-md-3'>
        </div>
      </div>
    </div>;
  }
}

