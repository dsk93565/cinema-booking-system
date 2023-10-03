import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import '../stylings/navigation.css';

const Navigation = (props) => {
  const [navBar, setNavBar] = useState(true);
  const [sideNav, setSideNav] = useState(false);
  const handleSideNav = () => {
    setSideNav(!sideNav);

    if (window.scrollY > 32) {
      setNavBar(!navBar);
    } // if
  };
  const nonHamburgerMenuScreenWidth = window.matchMedia('(min-width: 64rem)');

  nonHamburgerMenuScreenWidth.onchange = (width) => {
    if ((width.matches) && (sideNav === true)) {
      setSideNav(!sideNav);
    } // if
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 32) {
        setNavBar(false);
      } else {
        setNavBar(true);
      } // if else
    });
  });

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
      <header className={`navigation-bar ${navBar ? 'top-position' : ''} ${sideNav ? 'side-navigation' : ''}`}>
        <div className='navigation-bar-container'>
          {/* Logo */}
          <Link to='/'><div className={`logo ${sideNav ? 'is-hidden' : ''}`}>Cinera</div></Link>

          {/* Search Bar */}
          <SearchBar />

          {/* Navigation Menu */}
          <nav className='navigation-menu'>
            <ol>
              {/* Log In */}
              <Link to='login'><button className='navigation-link non-CTA-button'>Log in</button></Link>
              {/* Sign Up */}
              <Link to='sign-up'><button className='navigation-link CTA-button-one'>Sign up</button></Link>
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
          <div className='side-navigation-lists'>
            <div className='side-navigation-title'>Movies</div>
            <ol className='side-navigation-list'>
              <li><Link to='trending'><button onClick={handleSideNav} className='side-navigation-link'>Trending</button></Link></li>
              <li><Link to='now-playing'><button onClick={handleSideNav} className='side-navigation-link'>Now Playing</button></Link></li>
              <li><Link to='coming-soon'><button onClick={handleSideNav} className='side-navigation-link'>Coming Soon</button></Link></li>
            </ol>
          </div>
          <ol className='side-navigation-user-account'>
            <li><Link to='login'><button onClick={handleSideNav} className='CTA-button-two'>Log in</button></Link></li>
            <li><Link to='sign-up'><button onClick={handleSideNav} className='CTA-button-one'>Sign up</button></Link></li>
          </ol>
        </nav>

        {/* Side Navigation Overlay */}
        <div onClick={handleSideNav} className={`side-navigation-overlay ${sideNav ? 'is-active' : ''}`}></div>
      </div>
    </>
  )
}

export default Navigation;