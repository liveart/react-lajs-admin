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
