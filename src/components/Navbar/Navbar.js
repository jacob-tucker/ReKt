import React, { useState, useEffect } from 'react';
import Identicon from 'identicon.js';
import './Navbar.css'
import { NavLink } from 'react-router-dom';
const classNames = require('classnames')

const Navbar = (props) => {
  const [scrollBackground, setScrollBackground] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
  }, [])

  const listenToScroll = () => {
    if (document.documentElement.scrollTop > 70) {
      setScrollBackground(true)
    } else {
      setScrollBackground(false)
    }
  }

  return (
    <nav className={classNames({ 'navbar': true, 'background': scrollBackground })}>
      <div className="navbar_leftside">
        <img src={require('./favicon.png')} alt="ReKt logo" />
        <h1>ReKt</h1>
        <input type="text" placeholder="Search for anything on ReKt..." />
      </div>
      <ul className="navbar_rightside">
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/games'>Games</NavLink>
        </li>
        <li>
          <NavLink to='/popular'>Popular</NavLink>
        </li>
        <li>
          <small id="account">{props.account}</small>
        </li>
        <li>
          {props.account
            ? <img
              src={`data:image/png;base64,${new Identicon(props.account, 30).toString()}`}
              alt="Profile icon"
            />
            : <span></span>
          }
        </li>
      </ul>
    </nav >
  );

}

export default Navbar;