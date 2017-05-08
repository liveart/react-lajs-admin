import React, {Component} from 'react';
import {STATUS_DEFAULT} from '../../definitions';
import {SketchPicker} from 'react-color';
import * as ColorModel from '../../../../common/models/color.json';
import sortBy from 'lodash/sortBy';
const Color = ColorModel.properties;
import AbstractPage from '../AbstractPage/index';
import {getGroupById} from './secondary/helpers';

export default class ColorsView extends Component {
  render() {
    return (
      <AbstractPage {...this.props} objectSample={Color} sortingSupport={true}
                    representations={{
                      colorgroupId: {
                        getElem: val => {
                          let col = getGroupById(val, this.props.secondaryData);
                          if (this.props.status === STATUS_DEFAULT) {
                            return col;
                          }
                          return null;
                        },
                        sortElem: <select className='form-control'
                                          value={this.props.objectHolder['colorgroupId']}
                                          onChange={e => this.props.handleColorgroupChange('colorgroupId', e)}>
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
                                      onChange={e => this.props.handleColorgroupChange('colorgroupId', e)}>
                          <option key='defGroup' value={''}>...</option>
                          {sortBy(this.props.secondaryData).map(cg => <option key={cg.id}
                                                                              value={cg.id}>{cg.name}</option>)}
                        </select>
                      },
                      value: {
                        elem: <SketchPicker color={this.props.objectHolder.value}
                                            onChange={this.props.handleColorChange}/>
                      }
                    }}
      />
    );
  }
}
