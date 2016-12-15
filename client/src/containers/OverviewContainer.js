import {connect} from 'react-redux';
import {fetchFontsNumber} from '../actions/fonts';
import Overview from '../components/Overview';

const mapStateToProps = state => {
  return {
    fontsNumber: state.fonts.fontsNumber
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFontsNumber: () => {
      dispatch(fetchFontsNumber());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
