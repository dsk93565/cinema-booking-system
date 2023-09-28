import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to='/'><div className='logo'>Cinebook</div></Link>

          {/* Search Bar */}
          <div className='search-bar'>
            <input type='text' placeholder='Search' className='search-input' />
            <Link to='results'>
              <button className='search-icon-wrapper'>
                <FontAwesomeIcon icon='fa-solid fa-magnifying-glass fa-1x' className='search-icon' />
              </button>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className='navigation-menu'>
            <ol>
              {/* Log In */}
              <Link to='login'><button className='navigation-link non-CTA-link'>Log in</button></Link>
              {/* Sign Up */}
              <Link to='signup'><button className='navigation-link CTA-link'>Sign up</button></Link>
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
            <li><Link to='login'><button onClick={handleSideNav} className='CTA-side-link login-side-link'>Log in</button></Link></li>
            <li><Link to='signup'><button onClick={handleSideNav} className='CTA-side-link sign-up-side-link'>Sign up</button></Link></li>
          </ol>
        </nav>

        {/* Side Navigation Overlay */}
        <div onClick={handleSideNav} className={`side-navigation-overlay ${sideNav ? 'is-active' : ''}`}></div>
      </div>
    </>
  )
}

export default Navigation;