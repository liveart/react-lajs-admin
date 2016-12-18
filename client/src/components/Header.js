import React, {Component}  from 'react';
import {Link} from 'react-router';

export default class Header extends Component {
  pushMenu() {
    const body = document.body;
    if (body.clientWidth > 768) {
      if (body.className.indexOf('sidebar-collapse') === -1) {
        body.className += ' sidebar-collapse';
      } else {
        body.className = body.className.replace(' sidebar-collapse', '');
      }
    } else {
      if (body.className.indexOf('sidebar-open') === -1) {
        body.className += ' sidebar-open';
      } else {
        body.className = body.className.replace(' sidebar-open', '');
      }
    }
  }

  render() {
    return (
      <header className="main-header">
        <Link to="/" className="logo">
          <span className="logo-mini"><b>LA</b>A</span>
          <span className="logo-lg"><b>LiveArt</b>Admin</span>
        </Link>
        <nav className="navbar navbar-static-top" role="navigation">
          <a href="#" className="sidebar-toggle" role="button" onClick={this.pushMenu}>
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li><Link to="/profile">{this.props.name}</Link></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
