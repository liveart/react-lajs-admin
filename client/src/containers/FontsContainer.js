import React from 'react';
import {Table} from 'react-bootstrap';
import {createDataLoader} from 'react-loopback';

let FontsContainer = React.createClass({
  propTypes: {
    fonts: React.PropTypes.array
  },
  render() {
    return (
      <div>
        <section className="content-header">
          <h1>Fonts</h1>
        </section>
        <section className="content">
          <Table responsive hover>
            <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>fontFamily</th>
              <th>vector</th>
              <th>boldAllowed</th>
              <th>italicAllowed</th>
            </tr>
            </thead>
            <tbody>
            {this.props.fonts.map(font => (
              <tr key={font.id+''}>
                <td>{font.id}</td>
                <td>{font.name}</td>
                <td>{font.fontFamily}</td>
                <td>{font.vector}</td>
                <td>{font.boldAllowed}</td>
                <td>{font.italicAllowed}</td>
              </tr>
            ))}
            </tbody>
          </Table>
        </section>
      </div>
    );
  }
});

FontsContainer = createDataLoader(FontsContainer, {
  queries: [{
    endpoint: 'fonts'
  }]
});

export default FontsContainer;
