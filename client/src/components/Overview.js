import React, {Component, PropTypes} from 'react';
import InfoWidget from './InfoWidget';
import {Link} from 'react-router';
import {Row, Col, Grid} from 'react-bootstrap';

export default class Overview extends Component {
  static propTypes = {
    fontsNumber: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchFontsNumber();
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

  render() {
    const {fontsNumber, fontsLoading} = this.props;
    const {colorsNumber, colorsLoading} = this.props;
    const loading = fontsLoading || colorsLoading;
    if (loading) {
      return (
        <main>
          <div className="loader"></div>
          <section className="content-header">
            <h1>Loading...</h1>
          </section>
          <section className="content">
          </section>
        </main>
      );
    }

    return (
      <div>
        <section className="content-header">
          <h1>Overview</h1>
        </section>
        <section className="content">
          <Grid>
            <Row>
              <Col md={3}>{this.renderFontsNumber(fontsNumber)}</Col>
              <Col md={3}>{this.renderColorsNumber(colorsNumber)}</Col>
            </Row>
          </Grid>
        </section>
      </div>
    );
  }
}
