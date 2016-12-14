import {connect} from 'react-redux';
import {fetchFonts} from '../actions/fonts';
import EntityExplorer from '../components/EntityExplorer';

const mapStateToProps = state => {
  const {fonts, error, loading} = state.fonts.fontsList;
  return {
    entitiesList: {entities: fonts, error, loading}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: () => {
      dispatch(fetchFonts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityExplorer);
