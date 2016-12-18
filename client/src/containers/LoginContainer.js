import {connect} from 'react-redux';
import {getUserToken} from '../actions/user';
import LoginForm from '../components/LoginForm';

const mapStateToProps = state => {
  const {error, loading} = state.user;
  return {
    error,
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserToken(email, password) {
      dispatch(getUserToken(email, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
