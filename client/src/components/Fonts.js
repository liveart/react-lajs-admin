import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {
  ID_PROP,
  STATUS_EDITING,
  STATUS_CREATING,
  STATUS_DEFAULT,
  RELATIVE_URL,
  FONTS_FOLDER,
  VECTORS_FOLDER
} from '../definitions';
import * as FontModel from '../../../common/models/font.json';
const Font = FontModel.properties;
const location = '/files/fonts/';
const vectorsLocation = '/files/vectors/';
import View from './View/View';

export default class extends Component {
  static propTypes = {
    message: PropTypes.string,
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    objectHolder: PropTypes.object,
    status: PropTypes.string.isRequired,
    selectRow: PropTypes.func.isRequired,
    enableEditing: PropTypes.func.isRequired,
    enableCreating: PropTypes.func.isRequired,
    enableDefaultStatus: PropTypes.func.isRequired,
    createEntity: PropTypes.func.isRequired,
    editEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    setEditingObjectProperty: PropTypes.func.isRequired,
    restoreTableState: PropTypes.func.isRequired,
    uploadFontFile: PropTypes.func.isRequired,
    uploadVector: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
  };

  handleFileNormalUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      this.props.uploadFontFile(this.props.objectHolder['fileNormal']);
    }
  };
  handleFileBoldUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      this.props.uploadFontFile(this.props.objectHolder['fileBold']);
    }
  };
  handleFileItalicUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      this.props.uploadFontFile(this.props.objectHolder['fileItalic']);
    }
  };
  handleVectorUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      this.props.uploadVector(this.props.objectHolder['vector']);
    }
  };
  handleFileBoldItalicUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      this.props.uploadFontFile(this.props.objectHolder['fileBoldItalic']);
    }
  };

  handleFileChoose = (prop, e) => {
    this.props.setEditingObjectProperty(prop, e.target.files[0]);
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  getSaveUrl = (obj, url) => {
    if (typeof obj === 'object') {
      return RELATIVE_URL + '/' + url + obj.name;
    }

    return undefined;
  };

  getFileUrl = url => {
    if (typeof (url) === 'string') {
      if (url.substring(0, RELATIVE_URL.length) === RELATIVE_URL) {
        return url.substring(RELATIVE_URL.length);
      }
      return url;
    }
  };
  getName = (name) => {
    if (typeof (name) === 'string') {
      return name.substring(name.lastIndexOf('/') + 1);
    }
  };

  render() {
    return (
      <View {...this.props} objectSample={Font} sortingSupport={true}
            hiddenProperties={['id', 'boldAllowed', 'italicAllowed']}
            hiddenInputs={['id']}
            representations={{
              fileNormal: {
                getElem: val =>
                  val ? <a href={this.getFileUrl(val)}
                           style={{width: 100}}>{this.getName(val)}</a> :
                    null,
                header: 'File Normal'
              },
              fileBold: {
                getElem: val =>
                  val ? <a href={this.getFileUrl(val)}
                           style={{width: 100}}>{this.getName(val)}</a> :
                    null,
                header: 'File Bold'
              },
              fileItalic: {
                getElem: val =>
                  val ? <a href={this.getFileUrl(val)}
                           style={{width: 100}}>{this.getName(val)}</a> :
                    null,
                header: 'File Italic'
              },
              fileBoldItalic: {
                getElem: val =>
                  val ? <a href={this.getFileUrl(val)}
                           style={{width: 100}}>{this.getName(val)}</a> :
                    null,
                header: 'File Bold&Italic'
              },
              vector: {
                getElem: val =>
                  val ? <a href={this.getFileUrl(val)}
                           style={{width: 100}}>{this.getName(val)}</a> :
                    null,
                header: 'Vector'
              },

            }}
            changedInputs={{
              fileNormal: {
                elem: <input type='file' className='form-control' accept='.woff'
                             onChange={e => this.handleFileChoose('fileNormal', e)}/>,
                saveF: this.handleFileNormalUpload,
                getName: obj => this.getSaveUrl(obj, FONTS_FOLDER)
              },
              fileBold: {
                elem: <input type='file' className='form-control' accept='.woff'
                             onChange={e => this.handleFileChoose('fileBold', e)}/>,
                saveF: this.handleFileBoldUpload,
                getName: obj => this.getSaveUrl(obj, FONTS_FOLDER)
              },
              fileItalic: {
                elem: <input type='file' className='form-control' accept='.woff'
                             onChange={e => this.handleFileChoose('fileItalic', e)}/>,
                saveF: this.handleFileItalicUpload,
                getName: obj => this.getSaveUrl(obj, FONTS_FOLDER)
              },
              fileBoldItalic: {
                elem: <input type='file' className='form-control' accept='.woff'
                             onChange={e => this.handleFileChoose('fileBoldItalic', e)}/>,
                saveF: this.handleFileBoldItalicUpload,
                getName: obj => this.getSaveUrl(obj, FONTS_FOLDER)
              },
              vector: {
                elem: <input type='file' className='form-control' accept='.js'
                             onChange={e => this.handleFileChoose('vector', e)}/>,
                saveF: this.handleVectorUpload,
                getName: obj => this.getSaveUrl(obj, VECTORS_FOLDER)
              },
              boldAllowed: {
                elem: <select type='text' className='form-control'
                              value={this.props.objectHolder['boldAllowed']}
                              onChange={e => this.handleSelectedObjectChange('boldAllowed', e)}>
                  <option value=''>...</option>
                  <option value='true'>Yes</option>
                  <option value='false'>No</option>
                </select>
              },
              italicAllowed: {
                elem: <select type='text' className='form-control'
                              value={this.props.objectHolder['italicAllowed']}
                              onChange={e => this.handleSelectedObjectChange('italicAllowed', e)}>
                  <option value=''>...</option>
                  <option value='true'>Yes</option>
                  <option value='false'>No</option>
                </select>
              }
            }
            }
            customInputs={{}

            }
      />
    );
  }

}
