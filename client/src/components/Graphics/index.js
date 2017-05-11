import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import View from './View';
import {Creatable} from 'react-select';
import {STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../../definitions';
import {getFileUrl} from '../../utils';
import * as helpers from './helpers';

export default class GraphicsComponent extends Component {
  static propTypes = PTypes;

  constructor(props) {
    super(props);
    this.state = {imgUrl: ''};
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

  render() {
    return <View {...this.props}
                 {...this}
                 {...helpers}
                 imgUrl={this.state.imgUrl}
                 getFileUrl={getFileUrl}/>;
  }
}

/*
 updateObject = (propertyName, event) => {
 this.props.setEditingObjectProperty(propertyName, event.target.value);
 };

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

 */
