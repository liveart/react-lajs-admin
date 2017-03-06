import React, {Component, PropTypes} from 'react';
import Header from './Header';
import NavbarContainer from '../containers/NavbarContainer';
import LoginForm from '../containers/LoginContainer';

export default class App extends Component {
  static propTypes = {
    token: PropTypes.string,
    error: PropTypes.string,
    restoreUserToken: PropTypes.func.isRequired,
    validateUserToken: PropTypes.func.isRequired
  };

  componentWillMount() {
    if (!this.props.token && typeof localStorage.token === 'string') {
      this.props.restoreUserToken(localStorage.token);
    }

    if (this.props.token) {
      this.props.validateUserToken(this.props.token);
    }
  }

  componentWillReceiveProps() {
    if (this.props.token && (!localStorage.token || localStorage.token !== this.props.token)) {
      localStorage.token = this.props.token;
    }
  }

  renderError = () => {
    const {error} = this.props;
    if (typeof error !== 'string' || !error.length) {
      return null;
    }

    return (
      <div className='row col-md-offset-5 col-md-2'>
        <div className='callout callout-danger lead'>{this.props.error}</div>
      </div>
    );
  };

  render() {
    if (!this.props.token) {
      return (
        <div>
          <LoginForm/>
          {this.renderError()}
        </div>
      );
    }

    const {children} = this.props;
    return (
      <div>
        <Header email={this.props.email}/>
        <NavbarContainer/>
        <main style={{height: '95vh', 'overflowY': 'scroll'}} className='content-wrapper'>
          {children}
        </main>
      </div>);
  }
}
