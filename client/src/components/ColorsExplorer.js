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
          <Grid>
            <Row>
              <a className='btn btn-app'><i className='fa fa-plus'/>Add</a>
            </Row>
            <Row>
              <Col md={2}/>
              <Col md={8}>
                <ColorsTableContainer />
              </Col>
            </Row>
          </Grid>
        </section>
      </main>
    );
  }
}
