import React from 'react';
import {Link} from 'react-router';

let NavBar = React.createClass({
  render: function () {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="Search..."/>
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                <i className="fa fa-search"/></button>
              </span>
            </div>
          </form>
          <ul className="sidebar-menu">
            <li className="header">MAIN NAVIGATION</li>
            <li>
              <Link to="/" activeClassName="active">
                <i className="fa fa-dashboard"/><span>Dashboard</span>
              </Link>
            </li>
            <li className="header">ENTITIES</li>
            <li>
              <Link to="/fonts" activeClassName="active">
                <i className="fa fa-font"/> <span>Fonts</span>
              </Link>
            </li>
            <li className="header">ADDITIONAL</li>
            <li><a href="#"><i className="fa fa-cog"/> <span>Settings</span></a></li>
            <li><a href="#"><i className="fa fa-book"/> <span>Documentation</span></a></li>
            <li><a href="#"><i className="fa fa-sign-out"/> <span>Log out</span></a></li>
          </ul>
        </section>
      </aside>
    );
  }
});

export default NavBar;
