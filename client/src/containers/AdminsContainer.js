import {connect} from 'react-redux';
import {fetchUsers, registerUser, editUser, deleteUser} from '../actions/user';

import {
  selectRow, setObjectHolderProperty,
  enableEditing, enableCreating, enableDefaultStatus, setInitialState
} from '../actions/table';
import AdminComponent from '../components/Admins';

const mapStateToProps = state => {
  const {users, loading, error, token} = state.user;
  const {objectHolder, status} = state.table;
  const errors = error ? [error.message] : [];
  return {
    title: 'Admins',
    token,
    data: users,
    errors,
    loading,
    objectHolder,
    status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers(token) {
      dispatch(fetchUsers(token));
    },
    selectRow(object) {
      dispatch(selectRow(object));
    },
    setEditingObjectProperty(propertyName, value) {
      dispatch(setObjectHolderProperty(propertyName, value));
    },
    enableEditing(object) {
      dispatch(enableEditing(object));
    },
    enableCreating(object) {
      dispatch(enableCreating(object));
    },
    enableDefaultStatus() {
      dispatch(enableDefaultStatus());
    },
    registerUser(usr, token) {
      dispatch(registerUser(usr, token));
    },
    editUser(usr, token) {
      dispatch(editUser(usr, token));
    },
    deleteUser(usr, token) {
      dispatch(deleteUser(usr, token));
    },
    restoreTableState(object) {
      dispatch(setInitialState(object));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent);
