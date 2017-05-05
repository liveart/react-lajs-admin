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
import View from '../AbstractPage/index';
const Colorgroup = ColorgroupModel.properties;
let linkedProducts = [];
let linkedGraphics = [];

export default class ColorgroupsComponent extends Component {
  static propTypes = PTypes;

  constructor() {
    super();
    this.state = {deleting: false, selectedValue: DELETE_COLORS, newGroup: ''};
  }

  componentWillMount() {
    this.props.restoreTableState(Colorgroup);
    this.props.fetchData();
  }

  componentWillReceiveProps(props) {
    if (this.props.status === STATUS_DEFAULT && (props.status === STATUS_CREATING || props.status === STATUS_EDITING)) {
      this.props.fetchGraphics();
      this.props.fetchProducts();
      this.props.fetchSecondaryData();
    }
  }

  isLinkedToProduct = () => {
    linkedProducts = [];
    this.props.products.forEach(p => {
      p.colorizables.filter(c => c.assignColorgroup === true).forEach(c => {
        if (c.colorgroup && c.colorgroup.id === this.props.objectHolder.id) {
          linkedProducts.push(p.name);
        }
      });
      p.colorizables.filter(c => c.assignColorgroup === false).forEach(c => {
        let arr = intersectionBy(c._colors, this.props.secondaryData.filter(col =>
        col.colorgroupId === this.props.objectHolder.id), 'name');
        if (arr.length) {
          linkedProducts.push(p.name);
        }
      });
    });
    linkedProducts = sortedUniq(linkedProducts);
  };

  isLinkedToGraphic = () => {
    linkedGraphics = [];
    this.props.graphics.forEach(g => {
      g.colorizables.filter(c => c.assignColorgroup === true).forEach(c => {
        if (c.colorgroup && c.colorgroup.id === this.props.objectHolder.id) {
          linkedGraphics.push(g.name);
        }
      });
      g.colorizables.filter(c => c.assignColorgroup === false).forEach(c => {
        let arr = intersectionBy(c._colors, this.props.secondaryData.filter(col =>
        col.colorgroupId === this.props.objectHolder.id), 'name');
        if (arr.length) {
          linkedGraphics.push(g.name);
        }
      });
      let arr = intersectionBy(g.colors, this.props.secondaryData.filter(col =>
      col.colorgroupId === this.props.objectHolder.id), 'name');
      if (arr.length) {
        linkedGraphics.push(g.name);
      }
    });
    linkedGraphics = sortedUniq(linkedGraphics);
  };

  renderDeleteBtn = () => (
    <div>
      <div className='pull-right'>
        {this.state.newGraphic === '' && this.state.selectedSecondaryValue === MOVE_COLORS_TO_OTHER_GROUP ?
          <button disabled type='button' className='btn btn-danger'
                  onClick={() => this.handleDeleteBtnClick(true)}>Delete
          </button> :
          <button type='button' className='btn btn-danger'
                  onClick={() => this.handleDeleteBtnClick(true)}>Delete
          </button>}
        <button type='button' className='btn btn-default'
                onClick={() => {
                  this.props.enableDefaultStatus();
                  this.props.restoreTableState(Colorgroup);
                }}>Cancel
        </button>
      </div>
    </div>
  );

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
      <View {...this.props} objectSample={Colorgroup} sortingSupport={true}
            deleteConfirmation={true}
            renderDeleteConfirmationDialog={<DeleteConfirmation data={this.props.data}
                                                                objectHolder={this.props.objectHolder}
                                                                newGroup={this.state.newGroup}
                                                                selectedValue={this.state.selectedValue}
                                                                linkedProducts={linkedProducts}
                                                                linkedGraphics={linkedGraphics}
                                                                isLinkedToProduct={this.isLinkedToProduct}
                                                                isLinkedToGraphic={this.isLinkedToGraphic}
                                                                handleMoveToGroup={this.handleMoveToGroup}
                                                                handleColorsActionOption={this.handleColorsActionOption}/>}
            renderDeleteConfirmationButtons={this.renderDeleteBtn}
      />
    );
  }
}
