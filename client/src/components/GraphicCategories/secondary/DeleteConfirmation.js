import React, {Component} from 'react';
import {RadioGroup, Radio} from 'react-radio-group';
import PropTypes from 'prop-types';
import {
  ID_PROP,
  DELETE_CATEGORY,
  MOVE_GRAPHICS_TO_OTHER_CATEGORY,
  MOVE_CATEGORY_TO_OTHER_CATEGORY,
  DELETE_GRAPHICS
} from '../../../definitions';

export default class DeleteConfirmation extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.any),
    objectHolder: PropTypes.object,
    newGraphic: PropTypes.object,
    newGraphicsCategory: PropTypes.object,
    selectedValue: PropTypes.string,
    selectedSecondaryValue: PropTypes.string,
    handleMoveToCategory: PropTypes.func,
    handleCategoryActionOption: PropTypes.func,
    handleGraphicActionOption: PropTypes.func,
    handleMoveGraphicToCategory: PropTypes.func
  };

  render() {
    return <div className='form-group'>
      <div className='col-md-3'>
      </div>
      <div className='col-md-6'>
        <h1>Choose an action</h1>
        <div className='form-group'>
          <h3>Linked categories</h3>
          <RadioGroup selectedValue={this.props.selectedValue}
                      onChange={e => this.props.handleCategoryActionOption(e)}>
            <div>
              <Radio value={DELETE_CATEGORY}/>&nbsp; Delete all the categories
              linked to this category
            </div>
            <div>
              <Radio value={MOVE_CATEGORY_TO_OTHER_CATEGORY}/>&nbsp; Move all the linked categories to other
              category &nbsp;
              <select
                value={this.props.newGraphicsCategory}
                onChange={this.props.handleMoveToCategory}>
                <option value={''}>Root category</option>
                {this.props.data.map((cg, key) => (
                  this.props.objectHolder[ID_PROP] !== cg.id ?
                    this.props.objectHolder[ID_PROP] !== cg.graphicsCategoryId ?
                      <option key={key} value={cg.id}>{cg.name}</option> :
                      <option disabled='disabled' key={key} value={cg.id}>{cg.name} </option> : null
                ))}
              </select>
            </div>
          </RadioGroup>
          <h3>Linked graphics</h3>
          <RadioGroup selectedValue={this.props.selectedSecondaryValue}
                      onChange={e => this.props.handleGraphicActionOption(e)}>
            <div>
              <Radio value={DELETE_GRAPHICS}/>&nbsp; Delete all the linked graphics
            </div>
            <div>
              <Radio value={MOVE_GRAPHICS_TO_OTHER_CATEGORY}/>&nbsp; Move graphics of this category to other
              category &nbsp;
              <select
                value={this.props.newGraphic}
                onChange={this.props.handleMoveGraphicToCategory}>
                <option value=''>Select category</option>
                {this.props.data.map((cg, key) => (
                  this.props.objectHolder[ID_PROP] !== cg.id ?
                    this.props.objectHolder[ID_PROP] === cg.graphicsCategoryId && this.state.selectedValue === DELETE_CATEGORY ?
                      <option disabled='disabled' key={key}>{cg.name}</option> :
                      <option key={key} value={cg.id}>{cg.name} </option> : null
                ))}
              </select>
              {this.props.newGraphic === '' && this.props.selectedSecondaryValue === MOVE_GRAPHICS_TO_OTHER_CATEGORY ?
                <div className='text-red'>Please choose category.</div> : null}
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>;
  }
}

