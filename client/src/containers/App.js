import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import NavBar from '../components/Navbar';

class App extends Component {
  render() {
    const {children} = this.props;
    return (
      <div>
        <Header/>
        <NavBar/>
        <main className="content-wrapper">
          {children}
        </main>
      </div>
    );
  }
}

export default connect()(App);
