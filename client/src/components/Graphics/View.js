import React, {Component} from 'react';
import AbstractPage from '../AbstractPage';
import ColorizableTable from './secondary/ColorizableTable';
import {Creatable} from 'react-select';
import * as GraphicModel from '../../../../common/models/graphic.json';
const Graphic = GraphicModel.properties;

export default class GraphicsView extends Component {
  render() {
    return <AbstractPage {...this.props}
                         objectSample={Graphic}
                         sortingSupport={true}
                         secondaryData={this.props.graphicsCategories}
                         enableImportJson={this.props.enableImportJson}
                         handleImportJson={this.props.handleImportJson}
                         sortComparators={{categoryId: (data, id) => id === '' ? true : data === id}}
                         nested={{
                           colorizables: <ColorizableTable
                             colorizables={ this.props.objectHolder.colorizables || []}
                             nameInputHandler={(e, key) => this.props.updateNestedArray('colorizables', key, 'name', e)}
                             idInputHandler={(e, key) => this.props.updateNestedArray('colorizables', key, 'id', e)}
                             getColorizableValue={key => this.props.getSelectedColorizableOptions(this.props.objectHolder.colorizables, key)}
                             colorizableHandler={(o, key) => this.props.handleColorActionOption(o, key)}
                             colorizableOptions={this.props.getColorizableColorsOptions}
                             deleteColorizableRow={key => this.props.deleteColorizableRow(key)}
                             getColorgroupValue={key => this.props.getSelectedColorizableColorgroupOptions(this.props.objectHolder.colorizables, key)}
                             colorgroupHandler={(o, key) => this.props.onColorizableColorgroupSelectChange(o, key)}
                             colorgroupOptions={this.props.getColorgroupsOptions(this.props.colorgroups)}
                             getColorValue={key => this.props.getColorsOptionsByColorizable(this.props.objectHolder.colorizables, key)}
                             colorHandler={(o, key) => this.props.onColorizableColorsSelectChange(o, key)}
                             colorOptions={this.props.getOptions(this.props.colors)}
                             colorsLoading={this.props.colorsLoading}
                             colorgroupsLoading={this.props.colorgroupsLoading}
                             addColorizableRow={this.props.addColorizableRow}/>
                         }}
    />;
  }
}
