import {connect} from 'react-redux';
import {fetchFontsNumber} from '../actions/fonts';
import {fetchColorsNumber} from '../actions/colors';
import {fetchGraphicsCategoriesNumber} from '../actions/graphicsCategories';
import Overview from '../components/Overview';

const mapStateToProps = state => {
  const {graphicsCategoriesNumber, graphicsCategoriesError, graphicsCategoriesLoading} = state.graphicsCategories;
  const {fontsNumber, fontsError, fontsLoading} = state.fonts;
  const {colorsNumber, colorsError, colorsLoading} = state.colors;
  const error = fontsError || colorsError;
  const loading = !!(fontsLoading || colorsLoading);
  return {
    graphicsCategoriesNumber,
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
    },
    fetchColorsNumber() {
      dispatch(fetchColorsNumber());
    },
    fetchGraphicsCategoriesNumber() {
      dispatch(fetchGraphicsCategoriesNumber());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
