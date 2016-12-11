import React from 'react';
import {Panel, Table, Alert} from 'react-bootstrap';
import {createDataLoader} from 'react-loopback';
import AddFontContainer from './AddFontContainer';
import ErrorAlertContainer from './ErrorAlertContainer';
import EditFont from '../components/Font/EditFont';

let FontsContainer = React.createClass({
  getInitialState() {
    return {
      alertVisible: false,
      errorMsg: '',
      successMsgVisible: false,
      successMsg: '',
    };
  },
  propTypes: {
    fonts: React.PropTypes.array
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
          <h1>Fonts</h1>
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
              <Panel collapsible header="Edit font">
                <EditFont/>
              </Panel>
            </div>
            <div className="col-md-6">
              <Panel collapsible header="Add new">
                <AddFontContainer showError={this.showAlert} showMsg={this.showSuccessMsg}/>
              </Panel>
            </div>
          </div>
          <Panel collapsible defaultExpanded header="Available Fonts">
            <Table responsive hover fill>
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
                <tr key={String(font.id)}>
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
          </Panel>
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
