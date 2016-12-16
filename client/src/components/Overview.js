import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import adminLte from 'adminlte-reactjs';
const InfoTile = adminLte.InfoTile;

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
      <Link to="/fonts">
        <InfoTile
          width='2'
          content=''
          icon='fa-font'
          stats={fontsNumber}
          subject='Fonts'
          theme='bg-aqua'
        />
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
