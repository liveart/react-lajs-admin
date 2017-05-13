import React, {Component} from 'react';
import AbstractPage from '../AbstractPage';
import ColorizableTable from '../Colorizable/ColorizableTable';
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
                             }))}/>
                         }}
    />;
  }
}
