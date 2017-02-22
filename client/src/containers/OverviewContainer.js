import {connect} from 'react-redux';
import {fetchFontsNumber} from '../actions/fonts';
import {fetchFontFilesNumber} from '../actions/fontFiles';
import {fetchColorsNumber} from '../actions/colors';
import Overview from '../components/Overview';

const mapStateToProps = state => {
  const {fontsNumber, fontsError, fontsLoading} = state.fonts;
  const {fontFilesNumber, fontFilesError, fontFilesLoading} = state.fontFiles;
  const {colorsNumber, colorsError, colorsLoading} = state.colors;
  const error = fontsError || colorsError || fontFilesError;
  const loading = !!(fontsLoading || colorsLoading || fontFilesLoading);
  return {
    fontsNumber,
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
    },
    fetchColorsNumber() {
      dispatch(fetchColorsNumber());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
