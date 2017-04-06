import {connect} from 'react-redux';
import {fetchFontsNumber} from '../actions/fonts';
import {fetchColorsNumber} from '../actions/colors';
import {fetchGraphicsNumber} from '../actions/graphics';
import {fetchProductsNumber} from '../actions/products';
import Overview from '../components/Overview';

const mapStateToProps = state => {
  const {fontsNumber, fontsError, fontsLoading} = state.fonts;
  const {colorsNumber, colorsError, colorsLoading} = state.colors;
  const {graphicsNumber} = state.graphics;
  const {productsNumber} = state.products;
  const error = fontsError || colorsError;
  const loading = !!(fontsLoading || colorsLoading);
  return {
    fontsNumber,
    colorsNumber,
    graphicsNumber,
    productsNumber,
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
    fetchGraphicsNumber() {
      dispatch(fetchGraphicsNumber());
    },
    fetchProductsNumber() {
      dispatch(fetchProductsNumber());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
