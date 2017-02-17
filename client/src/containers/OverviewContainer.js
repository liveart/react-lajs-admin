import {connect} from 'react-redux';
import {fetchFontsNumber} from '../actions/fonts';
import Overview from '../components/Overview';

const mapStateToProps = state => {
  const {fontsNumber, fontsError, fontsLoading} = state.fonts;
  const {colorsNumber, colorsError, colorsLoading} = state.colors;
  const error = fontsError || colorsError;
  const loading = !!(fontsLoading || colorsLoading);
  return {
    fontsNumber,
    colorsNumber,
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
