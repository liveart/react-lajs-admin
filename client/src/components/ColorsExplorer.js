import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Grid, Col, Row} from 'react-bootstrap';
import ColorsTableContainer from '../containers/colors/ColorsTableContainer';

export default class EntityExplorer extends Component {

  render() {
    const {loading, error} = this.props;
    if (loading) {
      return (
        <main>
          <div className='loader'></div>
          <section className='content-header'>
            <h1>Loading...</h1>
          </section>
          <section className='content'>
          </section>
        </main>
      );
    }

    if (error) {
      return (<div className='alert alert-danger'>Error: {error}</div>);
    }

    return (
      <main>
        <section className='content-header'>
          <h1>Navigator</h1>
        </section>
        <section className='content'>
          <ColorsTableContainer />
        </section>
      </main>
    );
  }
}
