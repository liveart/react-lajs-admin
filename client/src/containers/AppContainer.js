import {connect} from 'react-redux';
import App from '../components/App';
import {restoreUserToken} from '../actions/user';

const mapStateToProps = state => {
  const {token, email, error} = state.user;
  return {
    token,
    email,
    error
  };
};


const mapDispatchToProps = dispatch => {
  return {
    restoreUserToken(token) {
      dispatch(restoreUserToken(token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
