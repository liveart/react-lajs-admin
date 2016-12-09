import React from 'react';
import {createDataLoader} from 'react-loopback';

let Greetings = React.createClass({
  propTypes: {
    hellos: React.PropTypes.array
  },

  render() {
    const {hellos} = this.props;

    return (
      <div>
        <h1>Admin Dashboard</h1>
        <ul>
          {hellos.map(hello => (
            <li>
              <p>{hello.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
});

Greetings = createDataLoader(Greetings, {
  queries: [{
    endpoint: 'hellos'
  }]
});

export default Greetings;
