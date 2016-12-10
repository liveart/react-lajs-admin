import React from 'react';
import {Link} from 'react-router';
import adminLte from 'adminlte-reactjs';
const InfoTile = adminLte.InfoTile;

let DashboardContainer = React.createClass({
  getInitialState() {
    return {fontsCount: '0'};
  },
  componentDidMount() {
    fetch('/api/fonts/count')
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState(json);
      });
  },
  render() {
    return (
      <div>
        <section className="content-header">
          <h1>Dashboard</h1>
        </section>
        <section className="content">
          <Link to="/fonts">
            <InfoTile
              width='2'
              content=''
              icon='fa-font'
              stats={String(this.state.count)}
              subject='Fonts'
              theme='bg-aqua'
            />
          </Link>
        </section>
      </div>
    );
  }
});

export default DashboardContainer;
