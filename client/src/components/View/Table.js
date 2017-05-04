import React, {Component} from 'react';
import {capitalizeFirstLetter} from '../../utils';
import {STATUS_DEFAULT} from '../../definitions';
import {includes, forEach, keys} from 'lodash';

export default class Table extends Component {

  renderTableHeadings = () =>
    keys(this.props.objectSample).map(key => {
      if (this.props.hiddenProperties && this.props.hiddenProperties.indexOf(key) > -1) {
        return null;
      }
      if (this.props.representations && this.props.representations.hasOwnProperty(key)
        && this.props.representations[key].header) {
        return <th key={key}>{this.props.representations[key].header}</th>;
      }
      return <th key={key}>{this.props.changedLabels && this.props.changedLabels[key] ?
        this.props.changedLabels[key] : capitalizeFirstLetter(key)}</th>;
    });

  updateObject = (propertyName, event) =>
    this.props.setEditingObjectProperty(propertyName, event.target.value);

  renderTableSortRow = () => {
    if (!this.props.sortingSupport || this.props.data.length === 0) {
      return null;
    }

    return (
      <tr>
        {keys(this.props.objectSample).map(key => {
          if (this.props.hiddenProperties && this.props.hiddenProperties.indexOf(key) > -1) {
            return null;
          }

          if (this.props.representations && this.props.representations[key]) {
            if (!this.props.representations[key].sortable) {
              return <td key={key}/>;
            } else if (this.props.representations[key].sortElem) {
              return <td key={key}>{this.props.representations[key].sortElem}</td>;
            }
          }

          return <td key={key}><input type='text' className='form-control'
                                      value={this.props.objectHolder[key]}
                                      onChange={e => this.updateObject(key, e)}/>
          </td>;
        })}
      </tr>
    );
  };

  sortRows = () => {
    const rows = [];
    forEach(this.props.data, d => {
      let add = true;

      Object.getOwnPropertyNames(this.props.objectSample).map(prop => {
        if (!add) {
          return;
        }
        if (this.props.hiddenProperties && this.props.hiddenProperties.indexOf(prop) > -1) {
          add = true;
        } else if (typeof this.props.objectHolder[prop] !== 'object') {
          if (typeof d[prop] === 'undefined') {
            add = this.props.objectHolder[prop] === '';
          } else if (typeof d[prop] === 'boolean') {
            add = true;
          } else if (this.props.sortComparators && this.props.sortComparators.hasOwnProperty(prop)) {
            add = this.props.sortComparators[prop](String(d[prop]),
              String(this.props.objectHolder[prop]));
          } else if (!includes(d[prop], this.props.objectHolder[prop])) {
            add = false;
          }
        }
      });
      if (add) {
        rows.push(d);
      }
    });
    return rows;
  };

  handleEdit = object => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableEditing(this.props.objectSample);
      this.props.selectRow(object);
    }
  };

  renderTableData = () => {
    if (!this.props.data.length) {
      return null;
    }
    const rows = this.sortRows();
    return rows.map(item => {
      return (
        <tr key={item.id} onClick={() => this.handleEdit(item)}>
          {
            Object.getOwnPropertyNames(this.props.objectSample).map(prop => {
              if (this.props.hiddenProperties && this.props.hiddenProperties.indexOf(prop) > -1) {
                return null;
              }

              if (this.props.representations && this.props.representations.hasOwnProperty(prop)) {
                return <td key={String(item.id + prop)}>{this.props.representations[prop].getElem(item[prop])}</td>;
              }

              if (typeof item[prop] === 'object') {
                return <td key={String(item.id + prop)}/>;
              }

              return <td key={String(item.id + prop)}>{item[prop]}</td>;
            })
          }
        </tr>
      );
    });
  };

  render() {
    return (
      <div className='panel panel-default'>
        <tb className='table-responsive'>
          <table className='table no-margin table-hover table-bordered'>
            <thead>
            <tr>
              {this.renderTableHeadings()}
            </tr>
            </thead>
            <tbody>
            {this.renderTableSortRow()}
            {this.renderTableData()}
            </tbody>
          </table>
        </tb>
      </div>
    );
  }
}
