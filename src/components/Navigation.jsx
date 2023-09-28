import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/navigation.css'

const Navigation = (props) => {
  const [sideNav, setSideNav] = useState(false);
  const handleSideNav = () => setSideNav(!sideNav);
  const nonHamburgerMenuScreenWidth = window.matchMedia('(min-width: 64rem)');

  nonHamburgerMenuScreenWidth.onchange = (width) => {
    if ((width.matches) && (sideNav === true)) {
      setSideNav(!sideNav);
    } // if
  }

  useEffect(() => {
    if (sideNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    } // if else
  }, [sideNav]);

  return (
    <>
      {/* Navigation Bar */}
      <header className={`navigation-bar ${sideNav ? 'side-navigation' : ''}`}>
        <div className='navigation-bar-container'>
          {/* Logo */}
          <a href='../../public/index.html' className='logo'>Cinebook</a>

          {/* Search Bar */}
          <div className='search-bar'>
            <input type='text' placeholder='Search' className='search' />
            <button onClick={props.toggleSearchResults} className='search-icon-wrapper'>
              <FontAwesomeIcon icon='fa-solid fa-magnifying-glass fa-1x' className='search-icon' />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className='navigation-menu'>
            <ol>
              {/* Log In */}
              <button onClick={props.toggleLogin} className='navigation-link non-CTA-link'>Log in</button>
              {/* Sign Up */}
              <button onClick={props.toggleSignUp} className='navigation-link CTA-link'>Sign up</button>
              {/* Search Icon */}
              <button onClick={props.toggleSearchResults} className={`mobile-search-wrapper ${sideNav ? 'is-hidden' : ''}`}>
                <FontAwesomeIcon icon='fa-solid fa-magnifying-glass fa-1x' className='mobile-search-icon' />
              </button>
              {/* Hamburger Menu */}
              <button onClick={handleSideNav} className={`hamburger-menu ${sideNav ? 'is-active' : ''}`}>
                <div className='hamburger-line'></div>
              </button>
            </ol>
          </nav>
        </div>
      </header>

      {/* Side Navigation Bar */}
      <div>
        {/* Side Navigation Menu */}
        <nav className={`side-navigation-menu ${sideNav ? 'is-active' : ''}`}>
          <div className='side-navigation-header'></div>
          <ol className='side-navigation-list'>
            <li><button onClick={() => {props.toggleLogin(); handleSideNav();}} className='CTA-side-link login-side-link'>Log in</button></li>
            <li><button onClick={() => {props.toggleSignUp(); handleSideNav();}} className='CTA-side-link sign-up-side-link'>Sign up</button></li>
          </ol>
        </nav>

        {/* Side Navigation Overlay */}
        <div onClick={handleSideNav} className={`side-navigation-overlay ${sideNav ? 'is-active' : ''}`}></div>
      </div>
    </>
  )
}

export default Navigation;