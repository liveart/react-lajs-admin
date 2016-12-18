import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class NavBar extends Component {
  static propTypes = {
    logOut: PropTypes.func.isRequired
  };

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <ul className="sidebar-menu">
            <li className="header">MAIN NAVIGATION</li>
            <li>
              <Link to="/" activeClassName="active">
                <i className="fa fa-dashboard"/><span>Overview</span>
              </Link>
            </li>
            <li className="header">EXPLORER</li>
            <li>
              <Link to="/fonts" activeClassName="active">
                <i className="fa fa-font"/> <span>Fonts</span>
              </Link>
            </li>
            <li className="header">ADDITIONAL</li>
            <li><a href="#"><i className="fa fa-cog"/><span>Settings</span></a></li>
            <li><a href="#" onClick={this.props.logOut}><i className="fa fa-sign-out"/><span>Log out</span></a></li>
          </ul>
        </section>
      </aside>
    );
  }
}
