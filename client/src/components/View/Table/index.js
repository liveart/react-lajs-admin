import React, {Component} from 'react';
import {STATUS_DEFAULT} from '../../../definitions';
import SortRow from './SortRow';
import HeadingCell from './HeadingCell';
import Helper from './Helper';
import Row from './Row';
import keys from 'lodash/keys';

export default class Table extends Component {

  constructor(props) {
    super(props);
    this.helper = new Helper(this.props.data, this.props.objectSample,
      this.props.objectHolder, this.props.sortComparators);
  }

  updateObject = (propertyName, event) => this.props.setEditingObjectProperty(propertyName, event.target.value);

  handleEdit = object => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableEditing(this.props.objectSample);
      this.props.selectRow(object);
    }
  };

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
                     count={this.props.data.length}
                     representations={this.props.representations}
                     sortingSupport={this.props.sortingSupport}/>
            {this.helper.sortRows().map(item => <Row key={item.id}
                                                     objectSample={this.props.objectSample}
                                                     handleEdit={this.handleEdit}
                                                     representations={this.props.representations}
                                                     item={item}/>)}
            </tbody>
          </table>
        </tb>
      </div>
    );
  }
}
