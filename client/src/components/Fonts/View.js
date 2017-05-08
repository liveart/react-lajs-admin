import React, {Component} from 'react';
import AbstractPage from '../AbstractPage/index';
import * as FontModel from '../../../../common/models/font.json';
const Font = FontModel.properties;
import {FONTS_FOLDER, VECTORS_FOLDER} from '../../definitions';
import {getName} from '../../utils';

export default class FontsView extends Component {
  render() {
    return (
      <AbstractPage {...this.props} objectSample={Font} sortingSupport={true}
                    changedInputs={{
                      fileNormal: {
                        elem: <input type='file' className='form-control' accept='.woff'
                                     onChange={e => this.props.handleFileChoose('fileNormal', e)}/>,
                        saveF: () => this.props.handleFontUpload('fileNormal'),
                        getName: obj => typeof obj === 'object' ? getName(obj, FONTS_FOLDER) : obj
                      },
                      fileBold: {
                        elem: <input type='file' className='form-control' accept='.woff'
                                     onChange={e => this.props.handleFileChoose('fileBold', e)}/>,
                        saveF: () => this.props.handleFontUpload('fileBold'),
                        getName: obj => typeof obj === 'object' ? getName(obj, FONTS_FOLDER) : obj
                      },
                      fileItalic: {
                        elem: <input type='file' className='form-control' accept='.woff'
                                     onChange={e => this.props.handleFileChoose('fileItalic', e)}/>,
                        saveF: () => this.props.handleFontUpload('fileItalic'),
                        getName: obj => typeof obj === 'object' ? getName(obj, FONTS_FOLDER) : obj
                      },
                      fileBoldItalic: {
                        elem: <input type='file' className='form-control' accept='.woff'
                                     onChange={e => this.props.handleFileChoose('fileBoldItalic', e)}/>,
                        saveF: () => this.props.handleFontUpload('fileBoldItalic'),
                        getName: obj => typeof obj === 'object' ? getName(obj, FONTS_FOLDER) : obj
                      },
                      vector: {
                        elem: <input type='file' className='form-control' accept='.js'
                                     onChange={e => this.props.handleFileChoose('vector', e)}/>,
                        saveF: () => this.props.handleVectorUpload(),
                        getName: obj => typeof obj === 'object' ? getName(obj, VECTORS_FOLDER) : obj
                      },
                      boldAllowed: {
                        elem: <select type='text' className='form-control'
                                      value={this.props.objectHolder.boldAllowed}
                                      onChange={e => this.props.handleSelectedObjectChange('boldAllowed', e)}>
                          <option value=''>...</option>
                          <option value='true'>Yes</option>
                          <option value='false'>No</option>
                        </select>
                      },
                      italicAllowed: {
                        elem: <select type='text' className='form-control'
                                      value={this.props.objectHolder.italicAllowed}
                                      onChange={e => this.props.handleSelectedObjectChange('italicAllowed', e)}>
                          <option value=''>...</option>
                          <option value='true'>Yes</option>
                          <option value='false'>No</option>
                        </select>
                      }
                    }}
      />);
  }
}

