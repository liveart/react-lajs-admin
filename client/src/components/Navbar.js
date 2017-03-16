import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class NavBar extends Component {
  static propTypes = {
    logOut: PropTypes.func.isRequired
  };

  handleLogOut = () => {
    localStorage.removeItem('token');
    this.props.logOut();
  };

  render() {
    return (
      <aside className='main-sidebar'>
        <section className='sidebar'>
          <ul className='sidebar-menu'>
            <li className='header'>MAIN NAVIGATION</li>
            <li>
              <Link to='/' activeClassName='active'>
                <i className='fa fa-dashboard'/><span>Overview</span>
              </Link>
            </li>
            <li className='header'>EXPLORER</li>
            <li>
              <Link to='/fonts' activeClassName='active'>
                <i className='fa fa-font'/> <span>Fonts</span>
              </Link>
            </li>
            <li>
              <Link to='/colors' activeClassName='active'>
                <i className='fa fa-paint-brush'/> <span>Colors</span>
              </Link>
            </li>
            <li>
              <Link to='/colorgroups' activeClassName='active'>
                <i className='fa fa-object-group'/> <span>Color Groups</span>
              </Link>
            </li>
            <li>
              <Link to='/graphics' activeClassName='active'>
                <i className='fa fa-picture-o'/> <span>Graphics</span>
              </Link>
            </li>
            <li>
              <Link to='/graphicsCategories' activeClassName='active'>
                <i className='fa fa-file-picture-o'/> <span>Graphics Categories</span>
              </Link>
            </li>
            <li className='header'>ADDITIONAL</li>
            <li>
              <Link to='/admins' activeClassName='active'>
                <i className='fa fa-group'/><span>Admins</span>
              </Link>
            </li>
            <li><a href='#' onClick={this.handleLogOut}><i className='fa fa-sign-out'/><span>Sign out</span></a></li>
          </ul>
        </section>
      </aside>
    );
  }
}
