import React, { Component, Fragment } from 'react';
import './Header.css';

class Header extends Component {
  render(){
    return(
      <div className='header'>
        <div className='page-title'>Movie Trailers</div>
        <button className='button'>COMING SOON</button>
        <button className='button now-showing'>NOW SHOWING</button>
      </div>
    );
  }
}

export default Header;
