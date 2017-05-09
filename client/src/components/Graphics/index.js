import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import View from './View';
import {Creatable} from 'react-select';
import * as GraphicModel from '../../../../common/models/graphic.json';
import {STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT, LEAVE_URL_OPTION} from '../../definitions';
import {parseJson} from '../../GraphicJsonParser';
import * as converter from '../../SvgConverter';
import {getFileUrl} from '../../utils';
import forEach from 'lodash/forEach';
import intersection from 'lodash/intersection';
import * as helpers from './helpers';
const Graphic = GraphicModel.properties;
import {Elements} from '../../configurableElements/config';

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

  updateObject = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  updateArray = resObj => this.props.setEditingObjectProperty(resObj.name, [...resObj.array]);

  handleImgAsThumb = thumbRef => {
    this.props.setEditingObjectProperty('thumb', this.props.objectHolder.image);
    helpers.toCanvas(this.props.objectHolder.thumb, thumbRef);
  };

  handleFileSelection = (prop, e, overwrite, thumbRef) => {
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
        helpers.toCanvas(this.props.objectHolder[prop], thumbRef);
      }
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
    this.updateArray(helpers.addToNestedArray(this.props.objectHolder, 'colorizables', {
      name: '',
      id: '',
      _colors: []
    }));

  deleteColorizableRow = key =>
    this.updateArray(helpers.deleteFromNestedArray(this.props.objectHolder, 'colorizables', key));

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

  onColorsSelectChange = val => {
    const arr = [];
    if (val) {
      forEach(val, v => arr.push({name: v.name, value: v.value}));
      this.props.setEditingObjectProperty('colors', arr);
    }
  };

  saveColorizables = () => { // TODO notify Vlad
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
                 {...this}
                 {...helpers}
                 imgUrl={this.state.imgUrl}
                 getFileUrl={getFileUrl}/>;
  }
}
