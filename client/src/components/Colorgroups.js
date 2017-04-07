import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {RadioGroup, Radio} from 'react-radio-group';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';
import * as ColorgroupModel from '../../../common/models/colorgroup.json';
import * as _ from 'lodash';
const Colorgroup = ColorgroupModel.properties;

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
    if (!String.prototype.capitalizeFirstLetter) {
      String.prototype.capitalizeFirstLetter = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
      };
    }
  }

  componentWillMount() {
    this.props.restoreTableState(Colorgroup);
    this.props.fetchData();
    this.props.fetchSecondaryData();
  }

  componentDidUpdate() {
    if (this.props.errors && this.props.errors.length) {
      this.props.errors.forEach(prop => this.props.addNotification('error', prop));
    }

    if (this.props.message) {
      this.props.addNotification('success', this.props.message);
    }
  }

  renderTableHeadings = object => (
    Object.getOwnPropertyNames(object).map((prop, i) => {
      if (prop === ID_PROP) {
        return null;
      } else {
        return <th key={i}>{prop.capitalizeFirstLetter()}</th>;
      }
    })
  );

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  renderTableSortRow = object => (
    <tr key='sortRow'>
      {Object.getOwnPropertyNames(object).map((prop, i) => {
        if (prop === ID_PROP) {
          return null;
        }

        return <td key={i}>
          <FormControl type='text'
                       value={this.props.objectHolder[prop]}
                       onChange={e => this.handleSelectedObjectChange(prop, e)}
          />
        </td>;

      })}
    </tr>
  );

  sortRows = (data, object) => {
    const rows = [];
    for (let i = 0; i < data.length; ++i) {
      let add = true;

      Object.getOwnPropertyNames(object).map(prop => {
        if (!add) {
          return;
        }
        if (typeof (this.props.data[i])[prop] === 'undefined') {
          add = this.props.objectHolder[prop] === '';
        } else if (!_.includes((data[i])[prop], this.props.objectHolder[prop])) {
          add = false;
        }
      });

      if (add) {
        rows.push(data[i]);
      }
    }
    return rows;
  };

  renderTableData = (data, object) => {
    if (!data.length) {
      return null;
    }

    const rows = this.sortRows(data, object);

    return rows.map((item, k) => {

      return (
        <tr key={k} onClick={() => this.handleEdit(item)}>
          {
            Object.getOwnPropertyNames(object).map((prop, j) => {
              if (prop === ID_PROP) {
                return null;
              } else {
                return <td key={j}>{item[prop]}
                  <span
                    className='label label-primary pull-right'>colors:
                    {' ' + this.props.secondaryData.filter(c => c.colorgroupId === item.id).length}
                  </span></td>;
              }
            })
          }
        </tr>
      );
    });
  };

  renderTable = (data, object) => (
    <div className='panel panel-default'>
      <tb className='table-responsive'>
        <table className='table no-margin table-hover table-bordered'>
          <thead>
          <tr key='trhead'>
            {this.renderTableHeadings(object)}
          </tr>
          </thead>
          <tbody>
          {this.renderTableSortRow(object)}
          {this.renderTableData(data, object)}
          </tbody>
        </table>
      </tb>
    </div>
  );

  renderButtons = () => (
    this.props.status === STATUS_EDITING || this.props.status === STATUS_CREATING ?
      this.renderEditingButtons() : this.renderDefButtons()
  );

  renderDefButtons = () => (
    <div className='pull-right'>
      <button type='button' className='btn btn-primary' style={{marginBottom: 6}}
              onClick={this.handleAddNew}>Add new colorgroup
      </button>
      <button type='button' className='btn btn-default' style={{marginBottom: 6}}
              onClick={() => this.props.restoreTableState(Colorgroup)}>Reset filter
      </button>
    </div>
  );

  renderEditingButtons = () => {
    if (this.state.deleting) {
      return (
        <div>
          <div className='pull-right'>
            <button type='button' className='btn btn-danger'
                    onClick={() => this.handleDeleteBtnClick(true)}>Delete
            </button>
            <button type='button' className='btn btn-default'
                    onClick={() => {
                      this.setState({...this.state, deleting: false});
                    }}>Cancel
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className='pull-left'>
          <button type='button' className='btn btn-default'
                  onClick={this.handleCancelBtnClick}>Cancel
          </button>
        </div>
        <div className='pull-right'>
          <button type='button' className='btn btn-primary'
                  onClick={() => this.handleSaveBtnClick(true)}>Save
          </button>
          <button type='button' className='btn btn-primary'
                  onClick={() => this.handleSaveBtnClick(false)}>Save and
            continue edit
          </button>
          <button type='button' className='btn btn-danger'
                  onClick={() => this.handleDeleteBtnClick(false)}>Delete
          </button>
        </div>
      </div>
    );
  };

  renderCreatingButtons = () => (
    <div>
      <div className='pull-left'>
        <button type='button' className='btn btn-default'
                onClick={this.handleCancelBtnClick}>Cancel
        </button>
      </div>
      <div className='pull-right'>
        <button type='button' className='btn btn-primary'
                onClick={() => this.handleSaveBtnClick(true)}>Save
        </button>
      </div>
    </div>
  );

  handleEdit = object => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableEditing(Colorgroup);
      this.props.selectRow(object);
    }
  };

  handleAddNew = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableCreating(Colorgroup);
    }
  };

  handleDeleteBtnClick = (confirmed) => {
    if (this.props.status === STATUS_EDITING) {
      this.props.fetchData();
      this.props.fetchSecondaryData();
      if (confirmed) {
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
    }
  };

  handleSaveBtnClick = redirect => {
    if (this.props.status === STATUS_EDITING) {
      const properties = Object.getOwnPropertyNames(Colorgroup);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
      });
      this.props.editEntity(this.props.objectHolder.id, entity, this.props.token);
      if (redirect) {
        this.props.enableDefaultStatus();
        this.props.restoreTableState(Colorgroup);
      }
    } else if (this.props.status === STATUS_CREATING) {
      const properties = Object.getOwnPropertyNames(Colorgroup);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
      });
      this.props.createEntity(entity, this.props.token);
      this.props.enableDefaultStatus();
      this.props.restoreTableState(Colorgroup);
    }
  };

  handleCancelBtnClick = () => {
    if (this.props.status !== STATUS_DEFAULT) {
      this.props.enableDefaultStatus();
      this.props.restoreTableState(Colorgroup);
    }
  };

  handleColorsActionOption = option => {
    if (this.state.deleting) {
      this.setState({...this.state, selectedValue: option});
    }
  };

  handleMoveToGroup = e => {
    if (this.state.deleting) {
      this.setState({...this.state, newGroup: e.target.value});
    }
  };

  renderInputs = () => {
    if (this.state.deleting) {
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
      )
        ;
    }
    return Object.getOwnPropertyNames(Colorgroup).map((prop, key) => {
      if (prop === ID_PROP) {
        return null;
      }
      return (
        <div key={key} className='form-group'>
          <div className='col-md-2'>
            {prop.capitalizeFirstLetter()}
          </div>
          <div className='col-md-10'>
            <input type='text' className='form-control'
                   value={this.props.objectHolder[prop]}
                   onChange={e => this.handleSelectedObjectChange(prop, e)}/>
          </div>
        </div>
      );
    });
  };

  renderColorStats = () => (
    <p><b>{this.props.secondaryData.filter(c => c.colorgroupId === this.props.objectHolder.id).length + ' '}</b>
      colors in this group.</p>
  );

  renderPage = () => {
    if (this.props.status === STATUS_DEFAULT) {
      return this.renderDefault();
    } else if (this.props.status === STATUS_CREATING) {
      return this.renderCreating();
    } else if (this.props.status === STATUS_EDITING) {
      return this.renderEditing();
    }
  };

  renderDefault = () => (
    <section className='content'>
      <div className='row'>
        <div className='col-md-6'>
          <p>{this.props.title + ': ' + this.props.data.length}</p>
        </div>
        <div className='col-md-6'>
          {this.renderDefButtons()}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          {this.renderTable(this.props.data, Colorgroup)}
        </div>
      </div>
    </section>
  );

  renderCreating = () => (
    <section className='content'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-info'>
            <div className='box-header with-border'>
              <h3 className='box-title'>Colorgroup information</h3>
            </div>
            <form className='form-horizontal'>
              <div className='box-body'>
                {this.renderInputs()}
              </div>
              <div className='box-footer'>
                {this.renderCreatingButtons()}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  renderEditing = () => (
    <section>
      <div className='row'>
        <div className='col-md-12'>
          <section className='content'>
            <div className='box box-info'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Colorgroup information</h3>
              </div>
              <form className='form-horizontal'>
                <div className='box-body'>
                  {this.renderInputs()}
                  {this.renderColorStats()}
                </div>
                <div className='box-footer'>
                  {this.renderEditingButtons()}
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </section>
  );

  render() {
    const {loading, errors} = this.props;

    return (
      <main>
        {loading ? <div className='loader'></div> : <div className='loaderDone'></div>}
        <div className='content-header'>
          <h1>Color Groups</h1>
        </div>
        {
          errors.length === 0 ? null : errors.map((err, k) => <div key={k} className='alert alert-danger'>Error:
            {err}</div>)
        }
        {this.renderPage()}
      </main>
    );
  }
}
