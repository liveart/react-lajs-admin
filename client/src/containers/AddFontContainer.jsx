import React from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap';

let AddFont = React.createClass({
  getInitialState() {
    return {
      name: '',
      fontFamily: '',
      vector: '',
      italicAllowed: undefined,
      boldAllowed: undefined,
      isSaving: false
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.setLoading();
    const that = this;
    fetch('/api/fonts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        fontFamily: this.state.fontFamily,
        vector: this.state.vector,
        italicAllowed: this.state.italicAllowed,
        boldAllowed: this.state.boldAllowed
      })
    }).then(response => {
      if (response.status === 200) {
        that.props.showMsg('New font was saved.');
      } else {
        that.props.showError(`Status ${response.status}, Message: ${response.statusText}`);
      }
      this.setNotLoading();
    });
  },
  setLoading() {
    const currState = Object.assign({}, this.state);
    currState.isSaving = true;
    this.setState(currState);
  },
  setNotLoading() {
    const currState = Object.assign({}, this.state);
    currState.isSaving = false;
    this.setState(currState);
  },
  handleNameInput(e){
    const currState = Object.assign({}, this.state);
    currState.name = e.target.value;
    this.setState(currState);
  },
  handleFontFamilyInput(e){
    const currState = Object.assign({}, this.state);
    currState.fontFamily = e.target.value;
    this.setState(currState);
  },
  handleVectorInput(e){
    const currState = Object.assign({}, this.state);
    currState.vector = e.target.value;
    this.setState(currState);
  },
  handleItalicAllowedInput(e){
    const currState = Object.assign({}, this.state);
    currState.italicAllowed = e.target.value;
    this.setState(currState);
  },
  handleBoldAllowedInput(e){
    const currState = Object.assign({}, this.state);
    currState.boldAllowed = e.target.value;
    this.setState(currState);
  },
  render() {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="iName">
          <Col componentClass={ControlLabel} sm={2}>
            name
          </Col>
          <Col sm={10}>
            <FormControl type="text" required
                         value={this.state.name}
                         onChange={this.handleNameInput}
                         disabled={this.state.isSaving}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="iFontFamily">
          <Col componentClass={ControlLabel} sm={2}>
            fontFamily
          </Col>
          <Col sm={10}>
            <FormControl type="text" required
                         value={this.state.fontFamily}
                         onChange={this.handleFontFamilyInput}
                         disabled={this.state.isSaving}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="iVector">
          <Col componentClass={ControlLabel} sm={2}>
            vector
          </Col>
          <Col sm={10}>
            <FormControl type="text" required
                         value={this.state.vector}
                         onChange={this.handleVectorInput}
                         disabled={this.state.isSaving}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="iItalicAllowed">
          <Col componentClass={ControlLabel} sm={2}>
            italicAllowed
          </Col>
          <Col sm={10}>
            <FormControl type="text"
                         value={this.state.italicAllowed}
                         onChange={this.handleItalicAllowedInput}
                         disabled={this.state.isSaving}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="iBoldAllowed">
          <Col componentClass={ControlLabel} sm={2}>
            boldAllowed
          </Col>
          <Col sm={10}>
            <FormControl type="text"
                         value={this.state.boldAllowed}
                         onChange={this.handleBoldAllowedInput}
                         disabled={this.state.isSaving}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" disabled={this.state.isSaving}>
              Save
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
});

export default AddFont;
