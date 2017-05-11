import React, {Component} from 'react';
import SortRow from './SortRow';
import Row from './Row';
import HeadingCell from './HeadingCell';
import {sortRows} from './helpers';
import keys from 'lodash/keys';

export default class TableView extends Component {
  render() {
    return (
      <div className='panel panel-default'>
        <tb className='table-responsive'>
          <table className='table no-margin table-hover table-bordered'>
            <thead>
            <tr>
              {keys(this.props.objectSample).map(key => <HeadingCell key={key}
                                                                     property={key}
                                                                     objectSample={this.props.objectSample}/>)}
            </tr>
            </thead>
            <tbody>
            <SortRow objectSample={this.props.objectSample}
                     objectHolder={this.props.objectHolder}
                     updateObject={this.props.updateObject}
                     setEditingObjectProperty={this.props.setEditingObjectProperty}
                     secondaryData={this.props.secondaryData}
                     count={this.props.data.length}
                     sortingSupport={this.props.sortingSupport}/>
            {sortRows(this.props.data, this.props.objectSample,
              this.props.objectHolder, this.props.sortComparators).map(item =>
              <Row key={item.id}
                   objectSample={this.props.objectSample}
                   secondaryData={this.props.secondaryData}
                   handleEdit={this.props.handleEdit}
                   item={item}/>)}
            </tbody>
          </table>
        </tb>
      </div>
    );
  }
}
