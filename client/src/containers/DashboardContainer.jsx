import React from 'react';
import adminLte from 'adminlte-reactjs';
const StatTile = adminLte.StatTile;

let DashboardContainer = React.createClass({
  getInitialState() {
    return {fontsCount: 0};
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
          <StatTile
            width='2'
            theme='bg-yellow'
            icon='fa-font'
            subject='Fonts'
            stats={String(this.state.count)}
            link='/fonts'
          />
        </section>
      </div>
    );
  }
});

export default DashboardContainer;
