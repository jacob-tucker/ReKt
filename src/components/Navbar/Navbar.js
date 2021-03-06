import React, { useState, useEffect } from 'react';
import Identicon from 'identicon.js';
import './Navbar.css'
import { NavLink } from 'react-router-dom';

import { connect } from "react-redux"
import { search } from "../../redux/actions"

const classNames = require('classnames')


const Navbar = (props) => {
  const [scrollBackground, setScrollBackground] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
  }, [])

  const listenToScroll = () => {
    if (document.documentElement.scrollTop > 30) {
      setScrollBackground(true)
    } else {
      setScrollBackground(false)
    }
  }

  const keyPressed = (event) => {
    if (event.key === "Enter") {
      console.log("Redux Chain!")
      props.search(searchValue)
    }
  }

  return (
    <nav className={classNames({ 'navbar': true, 'background': scrollBackground })}>
      <div className="navbar_leftside">
        <div className="flexIt">
          <img src={require('./favicon.png')} alt="ReKt logo" />
          <h1>ReKt</h1>
        </div>
        <input type="text" placeholder="Search for anything on ReKt..." onKeyPress={keyPressed} onChange={(input) => setSearchValue(input.target.value)} />
      </div>
      <ul className="navbar_rightside">
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/games'>Games</NavLink>
        </li>
        <li id="accountAddress">
          <small id="account">{props.account}</small>
        </li>
        <li>
          {props.account
            ? <NavLink to={{
              pathname: `/profile/${props.account}`
            }} ><img
                src={`data:image/png;base64,${new Identicon(props.account, 30).toString()}`}
                alt="Profile icon"
              /></NavLink>
            : <span></span>
          }
        </li>
      </ul>
    </nav >
  );

}

export default connect(
  null,
  { search }
)(Navbar);