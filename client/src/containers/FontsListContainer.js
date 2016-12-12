import {connect} from 'react-redux';
import {fetchFonts, fetchFontsSuccess, fetchFontsFailure} from '../actions';
import FontsList from '../components/FontsList';

const mapStateToProps = (state) => {
  return {
    fontsList: state.fonts.fontsList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFonts: () => {
      dispatch(fetchFonts()).then((response) => {
        return response.json();

      }).then(res => {
        if (res.status !== 200) {
          dispatch(fetchFontsFailure(res));
        } else {
          dispatch(fetchFontsSuccess(res));
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FontsList);
