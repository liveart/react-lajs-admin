import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import FontsListContainer from './FontsListContainer';
import {InfoTile} from 'react-bootstrap';
import {fetchFonts, fetchFontsFailure, fetchFontsSuccess} from '../actions';

class Main extends Component {
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

export default connect()(Main);
