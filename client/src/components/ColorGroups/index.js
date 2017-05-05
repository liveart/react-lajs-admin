import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import {
  STATUS_CONFIRM_DELETE,
  STATUS_DEFAULT,
  STATUS_CREATING,
  STATUS_EDITING,
  MOVE_COLORS_TO_OTHER_GROUP,
  DELETE_COLORS,
  LEAVE_COLORS_WITHOUT_GROUP
} from '../../definitions';
import * as ColorgroupModel from '../../../../common/models/colorgroup.json';
import intersectionBy from 'lodash/intersectionBy';
import sortedUniq from 'lodash/sortedUniq';
import DeleteConfirmation from './secondary/DeleteConfirmation';
import DeleteButton from './secondary/DeleteButton';
import AbstractPage from '../AbstractPage/index';
const Colorgroup = ColorgroupModel.properties;

export default class ColorgroupsComponent extends Component {
  static propTypes = PTypes;

  constructor(props) {
    super(props);
    this.state = {deleting: false, selectedValue: DELETE_COLORS, newGroup: '', linkedProducts: [], linkedGraphics: []};
  }

  componentWillMount() {
    this.props.restoreTableState(Colorgroup);
    this.props.fetchData();
  }

  componentWillReceiveProps(props) {
    if (this.props.status === STATUS_DEFAULT && (props.status === STATUS_CREATING || props.status === STATUS_EDITING)) {
      this.props.fetchSecondaryData();
      this.props.fetchProducts();
      this.props.fetchGraphics();

    }
    if (this.props.status === STATUS_EDITING && props.status === STATUS_CONFIRM_DELETE) {
      this.isLinkedToGraphic();
      this.isLinkedToProduct();
    }
  }

  isLinkedToProduct = () => {
    let linked = [];
    this.props.products.forEach(p => {
      p.colorizables.filter(c => c.assignColorgroup === true).forEach(c => {
        if (c.colorgroup && c.colorgroup.id === this.props.objectHolder.id) {
          linked.push(p.name);
        }
      });
      p.colorizables.filter(c => c.assignColorgroup === false).forEach(c => {
        let arr = intersectionBy(c._colors, this.props.secondaryData.filter(col =>
        col.colorgroupId === this.props.objectHolder.id), 'name');
        if (arr.length) {
          linked.push(p.name);
        }
      });
    });
    linked = sortedUniq(linked);
    this.setState({...this.state, linkedProducts: linked});
  };

  isLinkedToGraphic = () => {
    let linked = [];
    this.props.graphics.forEach(g => {
      g.colorizables.filter(c => c.assignColorgroup === true).forEach(c => {
        if (c.colorgroup && c.colorgroup.id === this.props.objectHolder.id) {
          linked.push(g.name);
        }
      });
      g.colorizables.filter(c => c.assignColorgroup === false).forEach(c => {
        let arr = intersectionBy(c._colors, this.props.secondaryData.filter(col =>
        col.colorgroupId === this.props.objectHolder.id), 'name');
        if (arr.length) {
          linked.push(g.name);
        }
      });
      let arr = intersectionBy(g.colors, this.props.secondaryData.filter(col =>
      col.colorgroupId === this.props.objectHolder.id), 'name');
      if (arr.length) {
        linked.push(g.name);
      }
    });
    linked = sortedUniq(linked);
    console.warn(linked)
    this.setState({...this.state, linkedGraphics: linked});
  };


  handleDeleteBtnClick = confirmed => {
    if (this.props.status === STATUS_CONFIRM_DELETE && confirmed) {
      if (this.state.selectedValue === DELETE_COLORS) {
        this.props.secondaryData.map(c => {
          if (c.colorgroupId === this.props.objectHolder.id) {
            this.props.deleteSecondary(c.id, this.props.token);
          }
        });
      } else if (this.state.selectedValue === MOVE_COLORS_TO_OTHER_GROUP) {
        this.props.secondaryData.map(c => {
          if (c.colorgroupId === this.props.objectHolder.id) {
            this.props.editSecondary(c.id, {...c, colorgroupId: this.state.newGroup}, this.props.token);
          }
        });
      } else if (this.state.selectedValue === LEAVE_COLORS_WITHOUT_GROUP) {
        this.props.secondaryData.map(c => {
          if (c.colorgroupId === this.props.objectHolder.id) {
            this.props.editSecondary(c.id, {...c, colorgroupId: ''}, this.props.token);
          }
        });
      }
      this.props.deleteEntity(this.props.objectHolder.id, this.props.token);
      this.props.enableDefaultStatus();
      this.props.restoreTableState(Colorgroup);
      this.setState({...this.state, deleting: false});
    } else {
      this.setState({...this.state, deleting: true});
    }
  };

  handleColorsActionOption = option => {
    this.setState({...this.state, selectedValue: option});
  };

  handleMoveToGroup = e => {
    this.setState({...this.state, newGroup: e.target.value});
  };

  render() {
    return (
      <AbstractPage {...this.props} objectSample={Colorgroup} sortingSupport={true}
                    deleteConfirmation={true}
                    renderDeleteConfirmationDialog={
                      <DeleteConfirmation data={this.props.data}
                                          objectHolder={this.props.objectHolder}
                                          newGroup={this.state.newGroup}
                                          selectedValue={this.state.selectedValue}
                                          linkedProducts={this.state.linkedProducts}
                                          linkedGraphics={this.state.linkedGraphics}
                                          handleMoveToGroup={this.handleMoveToGroup}
                                          handleColorsActionOption={this.handleColorsActionOption}/>}
                    renderDeleteConfirmationButtons={
                      <DeleteButton linkedProducts={this.state.linkedProducts}
                                    linkedGraphics={this.state.linkedGraphics}
                                    newGroup={this.state.newGroup}
                                    selectedValue={this.state.selectedValue}
                                    enableDefaultStatus={this.props.enableDefaultStatus}
                                    restoreTableState={this.props.restoreTableState}
                                    handleDeleteBtnClick={this.handleDeleteBtnClick}/>}
      />
    );
  }
}
