import React, {Component} from 'react';
import {Button, FormControl} from 'react-bootstrap';

export default class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {email: '', password: ''};
  }

  handleLoginBtnClick = () => {
    this.props.getUserToken(this.state.email, this.state.password);
  };

  handleEmailInputChange = event => {
    this.setState({...this.state, email: event.target.value});
  };

  handlePasswordInputChange = event => {
    this.setState({...this.state, password: event.target.value});
  };

  render() {
    return (
      <section>
        <div className="login-box">
          <div className="login-logo">
            <b>LiveArt</b>Admin
          </div>
          <div className="login-box-body">
            <p className="login-box-msg">Log In</p>
            <div className="form-group has-feedback">
              <p>Email:</p>
              <FormControl type="email" value={this.state.email} onChange={this.handleEmailInputChange}/>
            </div>
            <div className="form-group has-feedback">
              <p>Password:</p>
              <FormControl type="password" value={this.state.password} onChange={this.handlePasswordInputChange}/>
            </div>
            <div className="row">
              <div className="col-xs-8">
              </div>
              <div className="col-xs-4">
                <Button className="btn btn-default btn-block btn-flat" onClick={this.handleLoginBtnClick}>
                  Log In</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
