import {connect} from 'react-redux';
import {removeUserToken} from '../actions/user';
import Navbar from '../components/Navbar';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    logOut() {
      dispatch(removeUserToken());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
