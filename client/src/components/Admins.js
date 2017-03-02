import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';
const DELETE_COLORS = 'DELETE_COLORS';
const MOVE_COLORS_TO_OTHER_GROUP = 'MOVE_COLORS_TO_OTHER_GROUP';
const LEAVE_COLORS_WITHOUT_GROUP = 'LEAVE_COLORS_WITHOUT_GROUP';
const User = {username: '', role: ''};

export default class extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    objectHolder: PropTypes.object,
    status: PropTypes.string.isRequired,
    selectRow: PropTypes.func.isRequired,
    enableEditing: PropTypes.func.isRequired,
    enableCreating: PropTypes.func.isRequired,
    enableDefaultStatus: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    setEditingObjectProperty: PropTypes.func.isRequired,
    restoreTableState: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.restoreTableState(User);
    this.props.fetchUsers();
  }

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  renderTableData = (data, object) => {
    if (!data.length) {
      return null;
    }

    const rows = this.sortRows(data, object);

    return rows.map((item, k) => {

      return (
        <tr key={k} onClick={() => this.handleEdit(item)}>
          <td>{item.username}</td>
          <td key={i}>{item.role}</td>
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
            <th>username</th>
            <th>type</th>
          </tr>
          </thead>
          <tbody>
          {this.renderTableData(data, object)}
          </tbody>
        </table>
      </tb>
    </div>
  );

  renderDefButtons = () => (
    <div className='pull-right'>
      <button type='button' className='btn btn-primary' style={{marginBottom: '3px'}}
              onClick={this.handleAddNew}>Add new user
      </button>
      <button type='button' className='btn btn-default' style={{marginBottom: '3px'}}
              onClick={() => this.props.restoreTableState(User)}>Reset filter
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
      this.props.enableEditing(User);
      this.props.selectRow(object);
    }
  };

  handleAddNew = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableCreating(User);
    }
  };

  handleDeleteBtnClick = () => {
    if (this.props.status === STATUS_EDITING) {
      this.props.deleteEntity(this.props.objectHolder.id);
      this.props.enableDefaultStatus();
      this.props.restoreTableState(User);
    }
  };

  handleSaveBtnClick = redirect => {
    if (this.props.status === STATUS_EDITING) {
      const properties = Object.getOwnPropertyNames(User);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
      });
      this.props.editEntity(this.props.objectHolder.id, entity);
      if (redirect) {
        this.props.enableDefaultStatus();
        this.props.restoreTableState(User);
      }
    } else if (this.props.status === STATUS_CREATING) {
      const properties = Object.getOwnPropertyNames(User);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
      });
      this.props.createEntity(entity);
      this.props.enableDefaultStatus();
      this.props.restoreTableState(User);
    }
  };

  handleCancelBtnClick = () => {
    if (this.props.status !== STATUS_DEFAULT) {
      this.props.enableDefaultStatus();
      this.props.restoreTableState(User);
    }
  };

  renderInputs = () => (
    <div key={key} className='form-group'>
      <div className='col-md-2'>
        Username
      </div>
      <div className='col-md-10'>
        {this.props.objectHolder['username']}
      </div>
    </div>
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
        </div>
        <div className='col-md-6'>
          {this.renderDefButtons()}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          {this.renderTable(this.props.data, User)}
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
              <h3 className='box-title'>Admins</h3>
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

    if (loading) {
      return (
        <main>
          <div className='loader'></div>
          <section className='content-header'>
            <h1>Loading...</h1>
          </section>
          <section className='content'>
          </section>
        </main>
      );
    }

    return (
      <main>
        <div className='content-header'>
          <h1>Navigator</h1>
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
