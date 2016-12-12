import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import FontsListContainer from './FontsListContainer';
import {InfoTile} from 'react-bootstrap';
import {fetchFonts, fetchFontsFailure, fetchFontsSuccess} from '../actions';

class Main extends Component {

  handleRefreshClick = e => {
    e.preventDefault(); // TODO Add handler
  };

  render() {
    return (
      <div>
        <section className="content-header">
          <h1>Stats</h1>
          <FontsListContainer/>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fontsList: state.fonts.fontsList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFonts: () => {
      dispatch(fetchFonts()).then((response) => {
        !response.error ? dispatch(fetchFontsSuccess(response.payload.data)) :
          dispatch(fetchFontsFailure(response.payload.data));
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
