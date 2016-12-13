import {connect} from 'react-redux';
import {fetchFonts} from '../actions/fonts';
import FontsList from '../components/FontsList';

const mapStateToProps = (state) => {
  return {
    fontsList: state.fonts.fontsList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFonts: () => {
      dispatch(fetchFonts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FontsList);
