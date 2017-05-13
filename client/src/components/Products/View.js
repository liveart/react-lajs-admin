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
                             colorizableHandler={(o, key) => this.props.onAssignColorgroupChange(this.props.objectHolder, o, key)}
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
                             objectHolder={this.props.objectHolder}
                             getOptions={this.props.getOptions}
                             onColorsSelectChange={this.props.onColorsSelectChange}
                             onColorLocationChange={this.props.onColorLocationChange}
                             onImageChange={(key, k, e) =>
                               this.props.onImageUpload(this.props.objectHolder, 'colors', 'location', key, k, 'image', e)}
                             deleteLocationRow={(key, k) => this.props.updateArray(this.props.deleteFromDblNestedArray(
                               this.props.objectHolder, 'colors', 'location', key, k))}
                             addLocationRow={key => this.props.updateArray(this.props.addToDblNestedArray(
                               this.props.objectHolder, 'colors', 'location', key, {name: '', image: ''}))}
                             deleteColorsRow={key => this.props.updateArray(
                               this.props.deleteFromNestedArray(this.props.objectHolder, 'colors', key))}
                             addColorsRow={() => this.props.updateArray(
                               this.props.addToNestedArray(this.props.objectHolder, 'colors', {
                                 name: '', value: '', location: []
                               }))}/>,
                           editableAreaSizes: <EditableAreaSizes
                             editableAreaSizes={this.props.objectHolder.editableAreaSizes}
                             labelHandler={(e, key) =>
                               this.props.updateNestedArray(this.props.objectHolder, 'editableAreaSizes', key, 'label', e)}
                             widthHandler={(e, key) =>
                               this.props.updateNestedArray(this.props.objectHolder, 'editableAreaSizes', key, 'width', e)}
                             heightHandler={(e, key) =>
                               this.props.updateNestedArray(this.props.objectHolder, 'editableAreaSizes', key, 'height', e)}
                             deleteEditableAreaSizeRow={key => this.props.updateArray(
                               this.props.deleteFromNestedArray(this.props.objectHolder, 'editableAreaSizes', key))}
                             addEditableAreaSizeRow={() => this.props.updateArray(
                               this.props.addToNestedArray(
                                 this.props.objectHolder, 'editableAreaSizes', {label: '', width: 0, height: 0}))}
                           />,
                           locations: <Locations
                             location={this.props.location}
                             crop={ref => this.props.crop(ref)}
                             {...this.props}/>,
                           data: <CustomOptions
                             data={this.props.objectHolder.data}
                             handleSelectedObjectDataChange={this.props.handleSelectedObjectDataChange}
                             removeCustomOption={this.props.removeCustomOption}
                             createCustomOption={this.props.createCustomOption}
                           />,
                           pantones: <Pantones
                             pantones={this.props.objectHolder.pantones}
                             updateObjectData={this.props.updateObjectData}
                           />
                         }}/>;
  }
}
