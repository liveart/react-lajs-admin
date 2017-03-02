import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';
const User = {email: '', password: ''};

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
    setEditingObjectProperty: PropTypes.func.isRequired,
    restoreTableState: PropTypes.func.isRequired,
    token: PropTypes.string
  };

  componentWillMount() {
    this.props.restoreTableState(User);
    this.props.fetchUsers(this.props.token);
  }

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  renderTableData = data => {
    if (!data.length) {
      return null;
    }
    return data.map((item, k) => {

      return (
        <tr key={k} onClick={() => this.handleEdit(item)}>
          <td>{item.email}</td>
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
            <th>email</th>
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
    </div>
  );

  renderEditingButtons = () => (
    <div>
      <div className='pull-left'>
        <button type='button' className='btn btn-default'
                onClick={this.handleCancelBtnClick}>Cancel
        </button>
      </div>
    </div>
  );

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
      this.props.deleteUser(this.props.objectHolder.id, this.props.token);
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
      this.props.registerUser(entity);
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

  renderCreatingInputs = () => (
    <div>
      <div className='form-group'>
        <div className='col-md-2'>
          Email
        </div>
        <div className='col-md-10'>
          <input type='text' className='form-control'
                 value={this.props.objectHolder['email']}
                 onChange={e => this.handleSelectedObjectChange('email', e)}
          />
        </div>
      </div>
      <div className='form-group'>
        <div className='col-md-2'>
          Password
        </div>
        <div className='col-md-10'>
          <input type='text' className='form-control'
                 value={this.props.objectHolder['password']}
                 onChange={e => this.handleSelectedObjectChange('password', e)}/>
        </div>
      </div>
    </div>
  );

  renderEditingInputs = () => (
    <div>
      <div className='form-group'>
        <div className='col-md-2'>
          Email
        </div>
        <div className='col-md-10'>
          <input type='text' className='form-control'
                 value={this.props.objectHolder['email']}
                 onChange={e => this.handleSelectedObjectChange('email', e)}
                 disabled/>
        </div>
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
                {this.renderCreatingInputs()}
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
                <h3 className='box-title'>User information</h3>
              </div>
              <form className='form-horizontal'>
                <div className='box-body'>
                  {this.renderEditingInputs()}
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
