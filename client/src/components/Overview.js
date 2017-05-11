import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InfoWidget from './InfoWidget';
import {Link} from 'react-router';

export default class Overview extends Component {
  static propTypes = {
    fontsNumber: PropTypes.number.isRequired,
    colorsNumber: PropTypes.number.isRequired,
    graphicsNumber: PropTypes.number.isRequired,
    productsNumber: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    fetchFontsNumber: PropTypes.func.isRequired,
    fetchColorsNumber: PropTypes.func.isRequired,
    fetchGraphicsNumber: PropTypes.func.isRequired,
    fetchProductsNumber: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchFontsNumber();
    this.props.fetchColorsNumber();
    this.props.fetchGraphicsNumber();
    this.props.fetchProductsNumber();
  }

  renderDataNumber = (title, iconName, redirect, number) => {
    return (
      <Link to={`/${redirect}`}>
        <InfoWidget title={title} number={number} iconClass={`fa ${iconName}`}/>
      </Link>
    );
  };

  render() {
    const {fontsNumber, colorsNumber, graphicsNumber, productsNumber, loading} = this.props;

    return (
      <main>
        {loading ? <div className='loader'/> : <div className='loaderDone'/>}
        <section className='content-header'>
          <h1>Overview</h1>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-md-3'>{this.renderDataNumber('Fonts', 'fa-font', 'fonts', fontsNumber)}</div>
            <div className='col-md-3'>{this.renderDataNumber('Colors', 'fa-paint-brush', 'colors', colorsNumber)}
            </div>
            <div
              className='col-md-3'>{this.renderDataNumber('Graphics', 'fa-picture-o', 'graphics', graphicsNumber)}
            </div>
          </div>
          <div className='row'>
            <div
              className='col-md-3'>{this.renderDataNumber('Products', ' fa-shopping-cart', 'products', productsNumber)}
            </div>
          </div>
        </section>
      </main>
    );
  }
}
