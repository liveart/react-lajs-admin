import React from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap';

let AddForm = React.createClass({
  propTypes: {
    fields: React.PropTypes.array
  },
  getInitialState() {
    return {
      item: {},
      isSaving: false
    };
  },
  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.fields !== 'undefined') {
      const state = Object.assign({}, this.state);
      nextProps.fields.forEach(itemObj => {
        if (!itemObj.isIdentifier) {
          state.item[itemObj.val] = nextProps.fields[itemObj.val];
        }
      });
      this.setState(state);
    }
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
      body: JSON.stringify(Object.assign({}, this.state.item))
    }).then(response => {
      if (response.status === 200) {
        that.props.showMsg('New item was added.');
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
  handleInput(val, e){
    const currState = Object.assign({}, this.state);
    currState.item[val] = e.target.value;
    this.setState(currState);
  },
  render() {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>

        {
          this.props.fields.map((field, i) => {
            if (typeof field.isIdentifier !== 'undefined') {
              return null;
            }

            return (
              <FormGroup controlId={`i${field.val}`} key={i}>
                <Col componentClass={ControlLabel} sm={2}>
                  {field.friendlyName + (field.required ? '*' : '')}
                </Col>
                <Col sm={10}>
                  {field.required ?
                    <FormControl type="text" required
                                 value={this.state[field.val]}
                                 onChange={(e) => this.handleInput(field.val, e)}
                                 disabled={this.state.isSaving}/>
                    :
                    <FormControl type="text"
                                 value={this.state[field.val]}
                                 onChange={(e) => this.handleInput(field.val, e)}
                                 disabled={this.state.isSaving}/>
                  }
                </Col>
              </FormGroup>
            );
          })
        }

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

export default AddForm;
