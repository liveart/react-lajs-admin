import React, {Component, PropTypes} from 'react';
import InfoWidget from './InfoWidget';
import {Link} from 'react-router';
import {Row, Col, Grid} from 'react-bootstrap';

export default class Overview extends Component {
  static propTypes = {
    fontsNumber: PropTypes.number.isRequired,
    colorsNumber: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    fetchFontsNumber: PropTypes.func.isRequired,
    fetchColorsNumber: PropTypes.func.isRequired,
    fetchGraphicsCategoriesNumber: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchFontsNumber();
    this.props.fetchColorsNumber();
    this.props.fetchGraphicsCategoriesNumber();
  }

  renderFontsNumber = fontsNumber => {
    return (
      <Link to='/fonts'>
        <InfoWidget title='Fonts' number={fontsNumber} iconClass='fa fa-font'/>
      </Link>
    );
  };

  renderColorsNumber = colorsNumber => {
    return (
      <Link to='/colors'>
        <InfoWidget title='Colors' number={colorsNumber} iconClass='fa fa-paint-brush'/>
      </Link>
    );
  };

  renderGraphicsCategoriesNumber = graphicsCategoriesNumber => {
    return (
      <Link to='/graphicsCategories'>
        <InfoWidget title='Graphics Categories' number={graphicsCategoriesNumber} iconClass='fa fa-file-picture-o'/>
      </Link>
    );
  };

  render() {
    const {graphicsCategoriesNumber, fontsNumber, colorsNumber, loading} = this.props;

    return (
      <main>
        {loading ? <div className='loader'></div> : <div className='loaderDone'></div>}
        <section className='content-header'>
          <h1>Overview</h1>
        </section>
        <section className='content'>
          <Grid>
            <Row>
              <Col md={3}>{this.renderFontsNumber(fontsNumber)}</Col>
              <Col md={3}>{this.renderColorsNumber(colorsNumber)}</Col>
              <Col md={3}>{this.renderGraphicsCategoriesNumber(graphicsCategoriesNumber)}</Col>
            </Row>
          </Grid>
        </section>
      </main>
    );
  }
}
