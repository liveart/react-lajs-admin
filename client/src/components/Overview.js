import React, {Component, PropTypes} from 'react';
import InfoWidget from './InfoWidget';
import {Link} from 'react-router';

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

  render() {
    const {fontsNumber, loading} = this.props;
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
          {this.renderFontsNumber(fontsNumber)}
        </section>
      </div>
    );
  }
}
