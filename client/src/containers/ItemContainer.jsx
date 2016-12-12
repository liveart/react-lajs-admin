import React from 'react';
import {Panel, Table, Alert} from 'react-bootstrap';
import AddForm from '../components/AddForm';
import ErrorAlertContainer from './ErrorAlertContainer';
import EditFont from '../components/Font/EditFont';


let ItemContainer = React.createClass({
  propTypes: {
    items: React.PropTypes.array
  },
  getInitialState() {
    return {
      alertVisible: false,
      errorMsg: '',
      successMsgVisible: false,
      successMsg: '',
    };
  },
  getEndpoint() {
    return this.props.endpoint;
  },
  hideAlert() {
    this.setState({
      alertVisible: false,
      errorMsg: ''
    });
  },
  showAlert(text) {
    this.setState({
      alertVisible: true,
      errorMsg: text
    });
  },
  showSuccessMsg(text) {
    const state = Object.assign(this.state);
    state.successMsg = text;
    state.successMsgVisible = true;
    this.setState(state);

    const that = this;
    state.successMsgVisible = false;
    setTimeout(() => that.setState(Object.assign({}, state)), 1500);
  },
  render() {
    return (
      <div>
        <section className="content-header">
          <h1>{this.props.header}</h1>
        </section>
        <section className="content">
          {this.state.alertVisible ?
            <div className="row">
              <div className="col-md-offset-3 col-md-6">
                <ErrorAlertContainer errorMsg={this.state.errorMsg} hideAlert={this.hideAlert}/>
              </div>
            </div>
            : null}
          {this.state.successMsgVisible ?
            <div className="row">
              <div className="col-md-offset-3 col-md-6">
                <Alert bsStyle="success">
                  <strong>Success!</strong> {this.state.successMsg}
                </Alert>
              </div>
            </div>
            : null}
          <div className="row">
            <div className="col-md-6">
              <Panel collapsible header="Edit">
                <EditFont/>
              </Panel>
            </div>
            <div className="col-md-6">
              <Panel collapsible header="Add new">
                <AddForm showError={this.showAlert} showMsg={this.showSuccessMsg} fields={this.props.fields}/>
              </Panel>
            </div>
          </div>
          <Panel collapsible defaultExpanded header="Available">
            <Table responsive hover fill>
              <thead>
              <tr>
                {
                  this.props.fields.map((item, i) => {
                    return (<th key={i}>{item.friendlyName}</th>);
                  })
                }
              </tr>
              </thead>
              <tbody>
              {
                this.props.items.map(item => {
                  const idField = this.props.fields[0];
                  return (
                    <tr key={item[idField.val]}>
                      {
                        this.props.fields.map((field, j) => {
                          return (
                            <td key={j}>{item[field.val]}</td>
                          );
                        })
                      }
                    </tr>);
                })
              }
              </tbody>
            </Table>
          </Panel>
        </section>
      </div>
    );
  }
});


export default ItemContainer;
