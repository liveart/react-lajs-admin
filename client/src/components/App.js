import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import NavbarContainer from '../containers/NavbarContainer';
import LoginForm from '../containers/LoginContainer';
import 'react-select/dist/react-select.css';

const NotificationSystem = require('react-notification-system');

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
      this.props.validateUserToken(localStorage.token);
    } else if (this.props.token) {
      this.props.validateUserToken(this.props.token);
    }
  }

  addNotification = (level, title, message, autoDismiss, actionF) => {
    if (!autoDismiss) {
      autoDismiss = 3;
    }
    if (this._notificationSystem) {
      if (actionF) {
        this._notificationSystem.addNotification({
          title,
          level,
          message,
          autoDismiss,
          action: {
            label: 'Proceed',
            callback: actionF
          }
        });
      } else {
        this._notificationSystem.addNotification({
          title,
          level,
          message,
          autoDismiss
        });
      }
    }
  };

  componentWillReceiveProps(props) {
    if (props.token) {
      if (!localStorage.token || localStorage.token !== props.token) {
        localStorage.token = props.token;
      }
      if (props.token !== this.props.token) {
        this.props.validateUserToken(props.token);
      }
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
        <NavbarContainer />
        <main style={{height: '95vh', 'overflowY': 'scroll', 'overflowX': 'hidden'}} className='content-wrapper'>
          <section className='ct'>{React.Children.map(children, child => React.cloneElement(child, {
            addNotification: this.addNotification
          }))}
            <NotificationSystem ref={elem => this._notificationSystem = elem}/>
          </section>
        </main>
      </div>);
  }
}
