import React from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap';

let EditFont = React.createClass({

  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="iName">
          <Col componentClass={ControlLabel} sm={2}>
            name
          </Col>
          <Col sm={10}>
            <FormControl type="text" required disabled={this.props.isLoading}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="iFontFamily">
          <Col componentClass={ControlLabel} sm={2}>
            fontFamily
          </Col>
          <Col sm={10}>
            <FormControl type="text" required disabled={this.props.isLoading}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="iVector">
          <Col componentClass={ControlLabel} sm={2}>
            vector
          </Col>
          <Col sm={10}>
            <FormControl type="text" required disabled={this.props.isLoading}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="iItalicAllowed">
          <Col componentClass={ControlLabel} sm={2}>
            italicsAllowed
          </Col>
          <Col sm={10}>
            <FormControl type="text" disabled={this.props.isLoading}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="iBoldAllowed">
          <Col componentClass={ControlLabel} sm={2}>
            boldAllowed
          </Col>
          <Col sm={10}>
            <FormControl type="text" disabled={this.props.isLoading}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.props.handleEdit} disabled={this.props.isLoading}>
              Edit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
});

export default EditFont;
