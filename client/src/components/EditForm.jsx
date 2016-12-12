import React from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap';

let EditForm = React.createClass({
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
    if (typeof nextProps.selectedItem !== 'undefined') {
      const state = Object.assign({}, this.state);
      this.props.fields.forEach(itemObj => {
        if (!itemObj.isIdentifier) {
          state.item[itemObj.val] = nextProps.selectedItem[itemObj.val];
        } else {
          state.selectedId = nextProps.selectedItem[itemObj.val];
        }
      });
      this.setState(state);
    } else if (typeof nextProps.fields !== 'undefined') {
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
    fetch('/api/' + this.props.endpoint + this.state.selectedId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.assign({}, this.state.item))
    }).then(response => {
      if (response.status === 200) {
        that.props.showMsg('Item was changed.');
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
    /*
    console.log(this.state);
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
                                 value={this.state.item[field.val]}
                                 onChange={(e) => this.handleInput(field.val, e)}
                                 disabled={this.state.isSaving}/>
                    :
                    <FormControl type="text"
                                 value={this.state.item[field.val]}
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
              Edit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
    */
    return null; // TODO implement through redux
  }
});

export default EditForm;
