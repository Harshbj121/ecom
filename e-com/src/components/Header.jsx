/* eslint-disable react/prop-types */
// import React from 'react'
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import logo from "../images/logo.png"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

  const [isHidden, setIsHidden] = useState(true);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsHidden(!isHidden);
  };

  const cartItems = useSelector((store)=> store.cart.items)

  const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in 

  const logout = () => {
    localStorage.removeItem('token');// Remove token from localStorage
    localStorage.removeItem('user');// Remove user from localStorage 
    navigate('/login') // Redirect to login page after logout
  }

  return (
    <>
      <header className="header1">
        <div className="header1-logo">
          <span className="logo"><img src={logo} alt="website logo" /></span>
          <div id="search1" style={{ display: isHidden ? 'none' : 'flex' }}>
            {isLoggedIn ? (
              <Link className="item-login" onClick={logout}>Logout</Link>
            ) : (
              <Link to="/login" className="item-login">Login</Link>
            )
            }
            <Link to="/mycart" style={{color:'white' , fontWeight:'bold' , fontSize:'20px'}}><FontAwesomeIcon className="cart" icon={faCartShopping} id="i-login" size="lg"/>  {cartItems.length}</Link>
          </div>
        </div>
        <span id="icon" onClick={toggleSearch}>
          <FontAwesomeIcon className="cart" icon={faBars} />
        </span>
      </header>
      <nav className="header2-nav" id="header2" >
        <ul className="nav nav-pills header2-ul">
          <li className="nav-item"><Link to="/" className="nav-link header2-a ">Home</Link></li>
          <li className="nav-item"><Link to="/womenproducts" className="nav-link header2-a ">Women</Link></li>
          <li className="nav-item"><Link to="/menproducts" className="nav-link header2-a ">Men</Link></li>
          <li className="nav-item"><Link to="/kidproducts" className="nav-link header2-a ">Kid</Link></li>
          <li className="nav-item"><Link to="/contact" className="nav-link header2-a ">Contact Us</Link></li>
        </ul>html
      </nav>
    </>
  )
}

export default Header;