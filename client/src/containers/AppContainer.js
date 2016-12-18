import {connect} from 'react-redux';
import App from '../components/App';

const mapStateToProps = state => {
  const {token, email, error} = state.user;
  return {
    token,
    email,
    error
  };
};

export default connect(mapStateToProps)(App);
