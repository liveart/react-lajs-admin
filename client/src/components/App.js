import React, {Component, PropTypes} from 'react';
import Header from './Header';
import NavBar from './Navbar';
import LoginForm from '../containers/LoginContainer';

export default class App extends Component {
  static propTypes = {
    email: PropTypes.string,
    token: PropTypes.string,
    error: PropTypes.string
  };

  renderError = () => {
    const {error} = this.props;
    if (typeof error !== 'string' || !error.length) {
      return null;
    }

    return (
      <div className="row col-md-offset-5 col-md-2">
        <div className="callout callout-danger lead">{this.props.error}</div>
      </div>
    );
  };

  render() {
    if (typeof this.props.token !== 'string') {
      return (<div>
        <LoginForm/>
        {this.renderError()}
      </div>);
    }

    const {children} = this.props;
    return (
      <div>
        <Header/>
        <NavBar/>
        <main className="content-wrapper">
          {children}
        </main>
      </div>);
  }
}
