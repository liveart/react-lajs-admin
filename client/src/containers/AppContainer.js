import {connect} from 'react-redux';
import App from '../components/App';
import {restoreUserToken, validateToken} from '../actions/user';

const mapStateToProps = state => {
  const {email, token, error} = state.user;
  return {
    email,
    token,
    error
  };
};


const mapDispatchToProps = dispatch => {
  return {
    restoreUserToken(token) {
      dispatch(restoreUserToken(token));
    },
    validateUserToken(token) {
      dispatch(validateToken(token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
