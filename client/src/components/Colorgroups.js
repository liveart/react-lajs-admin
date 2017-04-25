import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RadioGroup, Radio} from 'react-radio-group';
import {STATUS_CONFIRM_DELETE} from '../definitions';
import * as ColorgroupModel from '../../../common/models/colorgroup.json';
const Colorgroup = ColorgroupModel.properties;
import View from './View/View';

const DELETE_COLORS = 'DELETE_COLORS';
const MOVE_COLORS_TO_OTHER_GROUP = 'MOVE_COLORS_TO_OTHER_GROUP';
const LEAVE_COLORS_WITHOUT_GROUP = 'LEAVE_COLORS_WITHOUT_GROUP';

export default class ColorgroupsComponent extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    addNotification: PropTypes.func.isRequired,
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
    deleteSecondary: PropTypes.func.isRequired,
    setEditingObjectProperty: PropTypes.func.isRequired,
    restoreTableState: PropTypes.func.isRequired,
    token: PropTypes.string
  };

  constructor() {
    super();
    this.state = {deleting: false, selectedValue: DELETE_COLORS, newGroup: ''};
  }

  componentWillMount() {
    this.props.restoreTableState(Colorgroup);
    this.props.fetchData();
    this.props.fetchSecondaryData();
  }

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };
  renderDelete = () => {
    return (
      <div className='form-group'>
        <div className='col-md-3'>
        </div>
        <div className='col-md-6'>
          <h1>Choose an action</h1>
          <div className='form-group'>
            <RadioGroup name='fruit' selectedValue={this.state.selectedValue}
                        onChange={this.handleColorsActionOption}>
              <div>
                <Radio value={DELETE_COLORS}/>&nbsp; Delete all the colors linked to this group
              </div>
              <div>
                <Radio value={MOVE_COLORS_TO_OTHER_GROUP}/>&nbsp; Move colors to other group &nbsp;
                <select value={this.state.newGroup}
                        onChange={this.handleMoveToGroup}>
                  {this.props.data.map((cg, key) => (
                    <option key={key} value={cg.id}>{cg.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Radio value={LEAVE_COLORS_WITHOUT_GROUP}/>&nbsp; Unlink and leave the colors without any group
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className='col-md-3'>
        </div>
      </div>
    );
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
            hiddenProperties={['id']}
            hiddenInputs={['id']}
            representations={{}}
            changedInputs={{}
            }
            customInputs={{}
            }
            deleteConfirmation={true}
            renderDeleteConfirmationDialog={this.renderDelete}
            renderDeleteConfirmationButtons={this.renderDeleteBtn}
      />
    );
  }
}
