import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import adminLte from 'adminlte-reactjs';
const InfoTile = adminLte.InfoTile;

export default class Overview extends Component {
  static propTypes = {
    fontsNumber: PropTypes.number.isRequired
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
    return (
      <div>
        <section className="content-header">
          <h1>Overview</h1>
        </section>
        <section className="content">
          {this.renderFontsNumber(this.props.fontsNumber)}
        </section>
      </div>
    );
  }
}
