import React, {Component} from 'react';
import AbstractPage from '../AbstractPage';
import CustomOptions from './secondary/CustomOptions';
import ColorsTable from './secondary/ColorsTable';
import Pantones from './secondary/Pantones';
import EditableAreaSizes from './secondary/EditableAreaSizesTable';
import Locations from './secondary/Locations';
import * as ProductModel from '../../../../common/models/product.json';
import ColorizableTable from '../Colorizable/ColorizableTable';
const Product = ProductModel.properties;

export default class ProductView extends Component {
  render() {
    return <AbstractPage {...this.props} objectSample={{...Product}}
                         sortingSupport={true}
                         secondaryData={this.props.productsCategories}
                         handleImportJson={this.handleImportJson}
                         enableImportJson={this.props.enableImportJson}
                         nested={{
                           colorizables: <ColorizableTable
                             colorizables={ this.props.objectHolder.colorizables || []}
                             nameInputHandler={(e, key) => this.props.updateNestedArray(this.props.objectHolder, 'colorizables', key, 'name', e)}
                             idInputHandler={(e, key) => this.props.updateNestedArray(this.props.objectHolder, 'colorizables', key, 'id', e)}
                             getColorizableValue={key => this.props.getSelectedColorizableOptions(this.props.objectHolder.colorizables, key)}
                             colorizableHandler={(o, key) => this.props.onColorizableChange(this.props.objectHolder, o, key)}
                             colorizableOptions={this.props.getColorizableColorsOptions}
                             deleteColorizableRow={key => this.props.updateArray(
                               this.props.deleteFromNestedArray(this.props.objectHolder, 'colorizables', key))}
                             getColorgroupValue={key => this.props.getSelectedColorizableColorgroupOptions(this.props.objectHolder.colorizables, key)}
                             colorgroupHandler={(o, key) => this.props.onColorizableColorgroupSelectChange(this.props.objectHolder, o, key)}
                             colorgroupOptions={this.props.getOptions(this.props.colorgroups)}
                             getColorValue={key => this.props.getColorsOptionsByColorizable(this.props.objectHolder.colorizables, key)}
                             colorHandler={(o, key) => this.props.onColorizableColorsSelectChange(this.props.objectHolder, o, key)}
                             colorOptions={this.props.getOptions(this.props.colors)}
                             colorsLoading={this.props.colorsLoading}
                             colorgroupsLoading={this.props.colorgroupsLoading}
                             addColorizableRow={() => this.props.updateArray(this.props.addToNestedArray(this.props.objectHolder, 'colorizables', {
                               name: '',
                               id: '',
                               assignColorgroup: false,
                               _colors: [],
                               colorgroup: {}
                             }))}/>,
                           colors: <ColorsTable
                             colorList={this.props.colors}
                             colors={this.props.objectHolder.colors}
                             locations={this.props.objectHolder.locations}
                             onColorsSelectChange={this.props.onColorsSelectChange}
                             handleColorLocationActionOption={this.props.handleColorLocationActionOption}
                             handleSelectedObjectArrayArrayChange={this.props.handleSelectedObjectArrayArrayChange}
                             deleteLocationRow={this.props.deleteLocationRow}
                             addLocationRow={this.props.addLocationRow}
                             deleteColorsRow={this.props.deleteColorsRow}
                             addColorsRow={this.props.addColorsRow}/>,
                           editableAreaSizes: <EditableAreaSizes
                             objectHolder={this.props.objectHolder}
                             labelHandler={(e, key) =>
                               this.props.updateNestedArray(this.props.objectHolder, 'editableAreaSizes', key, 'label', e)}
                             widthHandler={(e, key) =>
                               this.props.updateNestedArray(this.props.objectHolder, 'editableAreaSizes', key, 'width', e)}
                             heightHandler={(e, key) =>
                               this.props.updateNestedArray(this.props.objectHolder, 'editableAreaSizes', key, 'height', e)}
                             deleteEditableAreaSizeRow={key => this.props.updateArray(
                               this.props.deleteFromNestedArray(this.props.objectHolder, 'editableAreaSizes', key))}
                             addEditableAreaSizeRow={() => this.props.updateArray(
                               this.props.addToNestedArray(this.props.objectHolder, 'editableAreaSizes', {
                                 label: '',
                                 width: 0,
                                 height: 0
                               }))}
                           />,
                           locations: <Locations
                             location={this.props.location}
                             crop={ref => this.props.crop(ref)}
                             {...this.props}/>,
                           data: <CustomOptions {...this.props}
                                                {...this}
                           />,
                           pantones: <Pantones {...this.props}
                                               {...this}/>
                         }}/>;
  }
}
