import React, {Component, PropTypes} from 'react';
import InfoWidget from './InfoWidget';
import {Link} from 'react-router';
import {Row, Col, Grid} from 'react-bootstrap';

export default class Overview extends Component {
  static propTypes = {
    fontsNumber: PropTypes.number.isRequired,
    colorsNumber: PropTypes.number.isRequired,
    graphicsNumber: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    fetchFontsNumber: PropTypes.func.isRequired,
    fetchColorsNumber: PropTypes.func.isRequired,
    fetchGraphicsNumber: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchFontsNumber();
    this.props.fetchColorsNumber();
    this.props.fetchGraphicsNumber();
  }

  renderDataNumber = (title, iconName, redirect, number) => {
    return (
      <Link to={`/${redirect}`}>
        <InfoWidget title={title} number={number} iconClass={`fa ${iconName}`}/>
      </Link>
    );
  };

  render() {
    const {fontsNumber, colorsNumber, graphicsNumber, loading} = this.props;

    return (
      <main>
        {loading ? <div className='loader'></div> : <div className='loaderDone'></div>}
        <section className='content-header'>
          <h1>Overview</h1>
        </section>
        <section className='content'>
          <Grid>
            <Row>
              <Col md={3}>{this.renderDataNumber('Fonts', 'fa-font', 'fonts', fontsNumber)}</Col>
              <Col md={3}>{this.renderDataNumber('Colors', 'fa-paint-brush', 'colors', colorsNumber)}</Col>
              <Col md={3}>{this.renderDataNumber('Graphics', 'fa-picture-o', 'graphics', graphicsNumber)}</Col>
            </Row>
          </Grid>
        </section>
      </main >
    );
  }
}
