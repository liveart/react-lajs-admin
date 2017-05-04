import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import {STATUS_DEFAULT} from '../../definitions';
import {SketchPicker} from 'react-color';
import * as ColorModel from '../../../../common/models/color.json';
import {sortBy} from 'lodash';
const Color = ColorModel.properties;
import View from '../View/index';

export default class ColorsComponent extends Component {
  static propTypes = PTypes;

  componentWillMount() {
    this.props.restoreTableState(Color);
    this.props.fetchData();
    this.props.fetchSecondaryData();
  }

  updateObject = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };
  handleColorChange = color => {
    this.props.setEditingObjectProperty('value', color.hex);
  };
  getGroupById = id => {
    let groups = this.props.secondaryData.filter(cg => (cg.id === id));
    return groups.length ? groups[0].name : null;
  };

  render() {
    return (
      <View {...this.props} objectSample={Color} sortingSupport={true}
            representations={{
              colorgroupId: {
                getElem: val => {
                  let col = this.getGroupById(val);
                  if (this.props.status === STATUS_DEFAULT) {
                    return col;
                  }
                  return null;
                },
                sortElem: <select className='form-control'
                                  value={this.props.objectHolder['colorgroupId']}
                                  onChange={e => this.updateObject('colorgroupId', e)}>
                  <option key='defGroup' value={''}>...</option>
                  {sortBy(this.props.secondaryData).map((cg, key) => (
                    <option key={key} value={cg.id}>{cg.name}</option>
                  ))}
                </select>
              },
              value: {
                getElem: val => {
                  if (this.props.status === STATUS_DEFAULT) {
                    return (<div>
                      {val}
                      <span className='label label-default pull-right'
                            style={{background: val}}>{' '}</span>
                    </div>);
                  }
                  return null;
                }
              }
            }}
            changedInputs={{
              colorgroupId: {
                elem: <select className='form-control'
                              value={this.props.objectHolder['colorgroupId']}
                              onChange={e => this.updateObject('colorgroupId', e)}>
                  <option key='defGroup' value={''}>...</option>
                  {sortBy(this.props.secondaryData).map(cg => <option key={cg.id} value={cg.id}>{cg.name}</option>)}
                </select>
              },
              value: {
                elem: <SketchPicker color={this.props.objectHolder.value}
                                    onChange={this.handleColorChange}/>
              }
            }}
      />
    );
  }
}
