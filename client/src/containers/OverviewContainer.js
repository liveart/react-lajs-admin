import {connect} from 'react-redux';
import {fetchFontsNumber} from '../actions/fonts';
import {fetchFontFilesNumber} from '../actions/fontFiles';
import Overview from '../components/Overview';

const mapStateToProps = state => {
  const {fontsNumber, fontsError, fontsLoading} = state.fonts;
  const {fontFilesNumber, fontFilesError, fontFilesLoading} = state.fontFiles;
  const {colorsNumber, colorsError, colorsLoading} = state.colors;
  const error = fontsError || colorsError || fontFilesError;
  const loading = !!(fontsLoading || colorsLoading || fontFilesLoading);
  return {
    fontFilesNumber,
    fontFilesNumber,
    colorsNumber,
    error,
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFontsNumber() {
      dispatch(fetchFontsNumber());
    },
    fetchFontFilesNumber() {
      dispatch(fetchFontFilesNumber());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
