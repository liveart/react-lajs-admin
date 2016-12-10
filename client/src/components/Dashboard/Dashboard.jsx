import React from 'react';
import reactjsAdminlte from 'adminlte-reactjs';

const StatTile = reactjsAdminlte.StatTile;

let Home = React.createClass({
  render() {
    return (
      <div>
        <section className="content-header">
          <h1>Dashboard</h1>
        </section>
        <section className="content">
          <StatTile
            width='3'
            theme='bg-yellow'
            icon='fa-font'
            subject='Fonts'
            stats='0'
            link='#'
          />
        </section>
      </div>
    );
  }
});

export default Home;
