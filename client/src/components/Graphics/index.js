import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import View from './View';
import {Creatable} from 'react-select';
import * as GraphicModel from '../../../../common/models/graphic.json';
import {
  STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT, ASSIGN_GROUP, ADD_COLOR, LEAVE_URL_OPTION
} from '../../definitions';
import {parseJson} from '../../GraphicJsonParser';
import * as converter from '../../SvgConverter';
const Graphic = GraphicModel.properties;
import {getFileUrl} from '../../utils';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import intersection from 'lodash/intersection';

export default class GraphicsComponent extends Component {
  static propTypes = PTypes;

  constructor(props) {
    super(props);
    this.state = {newColorizables: [], imgUrl: ''};
  }

  componentWillMount() {
    this.props.fetchGraphicsCategories();
  }

  componentWillReceiveProps(props) {
    if (this.props.status === STATUS_DEFAULT && (props.status === STATUS_CREATING || props.status === STATUS_EDITING)) {
      this.props.fetchColors();
      this.props.fetchColorgroups();
    }
  }

  handleSelectedObjectArrayChange = (arrName, ind, propName, event) => {
    const arr = this.props.objectHolder[arrName];
    (arr[ind])[propName] = event.target.value;
    this.props.setEditingObjectProperty(arrName, [...arr]);
  };

  handleSelectedObjectArrayAddNew = (arrName, obj) => {
    let arr = this.props.objectHolder[arrName];
    if (typeof arr !== 'object') {
      arr = [];
    }
    arr[arr.length] = {...obj};
    this.props.setEditingObjectProperty(arrName, [...arr]);
  };

  handleSelectedObjectArrayDeleteElement = (arrName, key) => {
    let arr = this.props.objectHolder[arrName];
    arr.splice(key, 1);
    this.props.setEditingObjectProperty(arrName, [...arr]);
  };

  handleSelectedObjectArrayArrayDeleteElement = (fArr, sArr, colorizableKey, key) => {
    let arr = (this.props.objectHolder[fArr]);
    arr[colorizableKey][sArr].splice(key, 1);
    this.props.setEditingObjectProperty(fArr, [...arr]);
  };

  handleSelectedObjectArrayArrayChange = (fArrName, sArrName, fInd, sInd, propName, event) => {
    const arr = this.props.objectHolder[fArrName];
    arr[fInd][sArrName][sInd][propName] = event.target.value;
    this.props.setEditingObjectProperty(fArrName, [...arr]);
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  handleImgAsThumb = () => {
    this.props.setEditingObjectProperty('thumb', this.props.objectHolder.image);
    this.toCanvas('thumb');
  };

  toCanvas = prop => {
    const image = this.props.objectHolder[prop];
    const img = new Image();
    let imageOut = new Image();
    const reader = new FileReader();
    reader.onload = e => img.src = e.target.result;
    reader.readAsDataURL(image);
    let c = this.refs.canvas;
    let ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    img.onload = () => imageOut = ctx.drawImage(img, 0, 0, 100, 100);
  };

  handleFileSelection = (prop, e, overwrite) => {
    e.persist();
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      if (prop === 'image') {
        const image = e.target.files[0];
        this.props.setEditingObjectProperty(prop, image);
        const reader = new FileReader();
        reader.onloadend = () => {
          this.setState({
            ...this.state,
            imgUrl: reader.result
          });
          if (image.type === 'image/svg+xml') {
            if (overwrite) {
              const r = new FileReader();
              r.onload = e => {
                const contents = e.target.result;
                const {graphicObject, newDom, colors} = converter.processSVGContent(contents);
                const blob = new Blob([newDom], {type: 'application/octet-binary'});
                const file = new File([blob], image.name, {type: image.type});
                this.props.setEditingObjectProperty(prop, file);
                this.props.setEditingObjectProperty(null, {...this.props.objectHolder, ...graphicObject});
                const foundColors = intersection(this.props.colors.map(c => c.value), colors);
                if (foundColors.length < colors.length) {
                  this.props.addNotification('warning', 'Some of the colors from the selected image are not present' +
                    ' in the color list.');
                }
              };
              r.readAsText(image);
            } else {
              this.props.addNotification('info', 'Some options might be parsed from the selected svg image',
                'Try parsing multicolor option and colorizable elements from the image?',
                15, f => this.handleFileSelection(prop, e, true));
            }
          }
        };
        reader.readAsDataURL(image);
      }
      if (prop === 'thumb') {
        this.props.setEditingObjectProperty(prop, e.target.files[0]);
        this.toCanvas(prop);
      }
    }
  };

  handleImageUpload = img => {
    this.props.uploadGraphicImage(img);
  };

  handleThumbUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      const image = this.props.objectHolder.thumb;
      const uploadThumbnail = thumb => {
        this.props.uploadGraphicThumb(thumb);
      };
      if (image.type !== 'image/svg+xml') {
        const c = this.refs.canvas;
        c.toBlob(function (blob) {
          blob.name = image.name;
          uploadThumbnail(blob);
        }, 'image/*', 0.95);
      } else {
        uploadThumbnail(image);
      }
    }
  };

  getColorgroupsOptions = () => {
    if (!this.props.colorgroups || !this.props.colorgroups.length) {
      return [];
    }
    return this.props.colorgroups;
  };

  getColorizableColorsOptions = () => {
    return [{value: false, name: ADD_COLOR}, {value: true, name: ASSIGN_GROUP}];
  };

  getSelectedColorizableColorsOptions = key => {
    if (!this.props.objectHolder.colorizables[key]._colors ||
      !this.props.objectHolder.colorizables[key]._colors.length) {
      return [];
    }
    let arr = this.props.objectHolder.colorizables;
    if (arr[key]._colors) {
      return map(arr[key]._colors, col => ({value: col.value, name: col.name}));
    }
  };

  getSelectedColorizableOptions = key => {
    let arr = this.props.objectHolder.colorizables;
    if (!arr[key].assignColorgroup) {
      return {value: arr[key].assignColorgroup, name: ADD_COLOR};
    } else {
      return {value: arr[key].assignColorgroup, name: ASSIGN_GROUP};
    }
  };

  getSelectedColorizableColorgroupOptions = key => {
    if (!this.props.objectHolder.colorizables[key].colorgroup) {
      return {};
    }
    let arr = this.props.objectHolder.colorizables;
    if (arr[key].colorgroup) {
      return {id: arr[key].colorgroup.id, name: arr[key].colorgroup.name};
    }
  };

  onColorizableColorsSelectChange = (val, key) => {
    let colorizables = this.props.objectHolder.colorizables;
    let colors = [];
    if (val) {
      forEach(val, v => colors.push({name: v.name, value: v.value}));
      colorizables[key]._colors = colors;
      this.props.setEditingObjectProperty('colorizables', colorizables);
    }
  };

  onColorizableColorgroupSelectChange = (val, key) => {
    let colorizables = this.props.objectHolder.colorizables;
    if (val) {
      colorizables[key].colorgroup = {name: val.name, id: val.id};
      this.props.setEditingObjectProperty('colorizables', colorizables);
    }
  };

  handleColorActionOption = (option, key) => {
    let colorizables = this.props.objectHolder.colorizables;
    colorizables[key].assignColorgroup = option.value;
    this.props.setEditingObjectProperty('colorizables', colorizables);
  };

  addColorizableRow = () =>
    this.handleSelectedObjectArrayAddNew('colorizables', {name: '', id: '', _colors: []});

  deleteColorizableRow = key =>
    this.handleSelectedObjectArrayDeleteElement('colorizables', key);

  handleImportJson = (json, baseUrl, urlOption, forceNoBase) => {
    if (!baseUrl.length && !forceNoBase && urlOption !== LEAVE_URL_OPTION) {
      this.props.addNotification('warning', 'Base url is not set',
        'Not setting correct base url will result in broken links.',
        15, f => this.handleImportJson(json, baseUrl, urlOption, true));
      return;
    }
    if (!forceNoBase && urlOption !== LEAVE_URL_OPTION) {
      const r = new RegExp('^(?:[a-z]+:)?//', 'i');
      if (!r.test(baseUrl)) {
        this.props.addNotification('warning', 'The specified base url seems not to have a protocol',
          'Not setting correct base url will result in broken links.',
          15, f => this.handleImportJson(json, baseUrl, urlOption, true));
        return;
      }
    }
    try {
      let parsed = parseJson(json, baseUrl);
      const categories = parsed.categories;
      if (categories && categories.length) {
        this.props.createGraphicsCategory(categories, this.props.token);
      }
      const graphics = parsed.graphics;
      if (graphics && graphics.length) {
        this.props.createEntity(graphics, this.props.token);
      }
      this.props.enableDefaultStatus();
      this.props.restoreTableState({...Graphic, colorizables: []});
      this.setState({...this.state, json: '', baseUrl: ''});
    } catch (e) {
      this.props.addNotification('error', 'Json structure is invalid.');
    }
  };

  getOptions = () => {
    if (!this.props.colors || !this.props.colors.length) {
      return [];
    }
    return this.props.colors;
  };

  getSelectedOptions = () => {
    if (!this.props.objectHolder.colors || !this.props.objectHolder.colors.length) {
      return [];
    }
    if (typeof (this.props.objectHolder.colors)[0] === 'string') {
      return map(this.props.objectHolder.colors, col => ({value: col, name: col}));
    }
    return this.props.objectHolder.colors;
  };

  onColorsSelectChange = val => {
    const arr = [];
    if (val) {
      forEach(val, v => arr.push({name: v.name, value: v.value}));
      this.props.setEditingObjectProperty('colors', arr);
    }
  };

  saveColorizables = () => {
    let colorizables = this.props.objectHolder.colorizables;
    forEach(colorizables, c => {
      if (c.assignColorgroup) {
        c._colors = [];
        this.props.setEditingObjectProperty('colorizables', colorizables);
      } else {
        c.colorgroup = {};
        this.props.setEditingObjectProperty('colorizables', colorizables);
      }
    });
  };

  render() {
    return <View {...this.props}
                 handleSelectedObjectArrayChange={this.handleSelectedObjectArrayChange}
                 handleSelectedObjectArrayAddNew={this.handleSelectedObjectArrayAddNew}
                 handleSelectedObjectArrayDeleteElement={this.handleSelectedObjectArrayDeleteElement}
                 handleSelectedObjectArrayArrayDeleteElement={this.handleSelectedObjectArrayArrayDeleteElement}
                 handleSelectedObjectArrayArrayChange={this.handleSelectedObjectArrayArrayChange}
                 handleSelectedObjectChange={this.handleSelectedObjectChange}
                 handleImgAsThumb={this.handleImgAsThumb}
                 toCanvas={this.toCanvas}
                 handleFileSelection={this.handleFileSelection}
                 handleImageUpload={this.handleImageUpload}
                 handleThumbUpload={this.handleThumbUpload}
                 getColorgroupsOptions={this.getColorgroupsOptions}
                 getColorizableColorsOptions={this.getColorizableColorsOptions}
                 getSelectedColorizableColorsOptions={this.getSelectedColorizableColorsOptions}
                 getSelectedColorizableOptions={this.getSelectedColorizableOptions}
                 getSelectedColorizableColorgroupOptions={this.getSelectedColorizableColorgroupOptions}
                 onColorizableColorsSelectChange={this.onColorizableColorsSelectChange}
                 onColorizableColorgroupSelectChange={this.onColorizableColorgroupSelectChange}
                 handleColorActionOption={this.handleColorActionOption}
                 addColorizableRow={this.addColorizableRow}
                 deleteColorizableRow={this.deleteColorizableRow}
                 handleImportJson={this.handleImportJson}
                 getFileUrl={getFileUrl}
                 getOptions={this.getOptions}
                 getSelectedOptions={this.getSelectedOptions}
                 onColorsSelectChange={this.onColorsSelectChange}
                 saveColorizables={this.saveColorizables}/>;
  }
}
