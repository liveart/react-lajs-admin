import {connect} from 'react-redux';
import {fetchFontsNumber} from '../actions/fonts';
import Overview from '../components/Overview';

const mapStateToProps = state => {
  const {fontsNumber, error, loading} = state.fonts;
  return {
    fontsNumber,
    error,
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFontsNumber() {
      dispatch(fetchFontsNumber());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
