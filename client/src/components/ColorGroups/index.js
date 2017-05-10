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
import DeleteConfirmation from './secondary/DeleteConfirmation';
import DeleteButton from './secondary/DeleteButtonGroup';
import AbstractPage from '../AbstractPage/index';
import {getLinkedToGraphic, getLinkedToProduct} from './secondary/helpers';
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
  }

  componentDidUpdate(props) {
    if (props.status === STATUS_EDITING && this.props.status === STATUS_CONFIRM_DELETE) {
      let linkedG = getLinkedToGraphic(this.props.graphics, this.props.objectHolder.id, this.props.secondaryData);
      let linkedP = getLinkedToProduct(this.props.products, this.props.objectHolder.id, this.props.secondaryData);
      this.setState({...this.state, linkedGraphics: linkedG, linkedProducts: linkedP});
    }
  }

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
