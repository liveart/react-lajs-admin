import React, {Component} from 'react';
import {Link} from 'react-router';
import adminLte from 'adminlte-reactjs';
const InfoTile = adminLte.InfoTile;


export default class Overview extends Component {
  componentWillMount() {
    this.props.fetchFontsNumber();
  }

  renderFontsNumber(fontsNumber) {
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
  }

  render() {
    const {fontsNumber, loading, error} = this.props.fontsList;

    if (loading) {
      return (<div className="container"><h1>Fonts</h1><h3>Loading...</h3></div>);
    } else if (error) {
      return (<div className="alert alert-danger">Error: {error.message}</div>);
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
