import React, {Component} from 'react';
import AbstractPage from '../AbstractPage/index';
import DeleteConfirmation from './secondary/DeleteConfirmation';
import * as GraphicsCategoryModel from '../../../../common/models/graphics-category.json';
const GraphicsCategory = GraphicsCategoryModel.properties;
import DeleteButton from './secondary/DeleteButton';

export default class GraphicCategoriesView extends Component {
  render() {
    return (
      <AbstractPage {...this.props} objectSample={GraphicsCategory} sortingSupport={true}
                    deleteConfirmation={true}
                    renderDeleteConfirmationDialog={
                      <DeleteConfirmation data={this.props.data}
                                          objectHolder={this.props.objectHolder}
                                          newGraphic={this.props.newGraphic}
                                          newGraphicsCategory={this.props.newGraphicsCategory}
                                          selectedValue={this.props.selectedValue}
                                          selectedSecondaryValue={this.props.selectedSecondaryValue}
                                          handleMoveToCategory={this.props.handleMoveToCategory}
                                          handleCategoryActionOption={this.props.handleCategoryActionOption}
                                          handleGraphicActionOption={this.props.handleGraphicActionOption}
                                          handleMoveGraphicToCategory={this.props.handleMoveGraphicToCategory}/>}

                    renderDeleteConfirmationButtons={
                      <DeleteButton newGraphic={this.props.newGraphic}
                                    selectedValue={this.props.selectedSecondaryValue}
                                    enableDefaultStatus={this.props.enableDefaultStatus}
                                    restoreTableState={this.props.restoreTableState}
                                    handleDeleteBtnClick={this.props.handleDeleteBtnClick}/>}

      />
    );
  }
}
