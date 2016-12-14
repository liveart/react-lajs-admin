import React from 'react';
import {Alert} from 'react-bootstrap';

let ErrorAlertContainer = React.createClass({
  render() {
    return (
      <Alert bsStyle="danger" onDismiss={this.props.hideAlert}>
        <h4>An error occurred...</h4>
        <p>{this.props.errorMsg}</p>
      </Alert>
    );
  }
});

export default ErrorAlertContainer;
