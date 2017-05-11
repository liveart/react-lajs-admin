import React, {Component} from 'react';
import AbstractPage from '../AbstractPage/index';
import CustomOptions from './secondary/CustomOptions';
import ColorizableTable from './secondary/ColorizableTable';
import ColorsTable from './secondary/ColorsTable';
import Pantones from './secondary/Pantones';
import EditableAreaSizes from './secondary/EditableAreaSizesTable';
import Locations from './secondary/Locations';
import * as ProductModel from '../../../../common/models/product.json';
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
                             colors={this.props.colors}
                             colorsLoading={this.props.colorsLoading}
                             colorgroupsLoading={this.props.colorgroupsLoading}
                             colorgroups={this.props.colorgroups}
                             colorizables={this.props.objectHolder.colorizables}
                             handleSelectedObjectArrayChange={this.props.handleSelectedObjectArrayChange}
                             handleColorActionOption={this.props.handleColorActionOption}
                             onColorizableColorsSelectChange={this.props.onColorizableColorsSelectChange}
                             onColorizableColorgroupSelectChange={this.props.onColorizableColorgroupSelectChange}
                             deleteColorizableRow={this.props.deleteColorizableRow}
                             addColorizableRow={this.props.addColorizableRow}
                           />,
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
                             editableAreaSizes={this.props.objectHolder.editableAreaSizes}
                             {...this.props}
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
