import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDataContext } from '../DataContext';
import '../stylings/navigation.css';

const Navigation = () => {
  const rememberMe = localStorage.getItem('rememberMe');
  const userType = localStorage.getItem('userType');
  const userToken = localStorage.getItem('userToken');
  const navigate = useNavigate();
  
  const [navBar, setNavBar] = useState(true);
  const [sideNav, setSideNav] = useState(false);
  const handleSideNav = () => {
    setSideNav(!sideNav);

    if (window.scrollY > 32) {
      setNavBar(!navBar);
    } // if
  };
  const handleScrollToSection = (sectionId) => {
    setSideNav(!sideNav);
  
    if (window.scrollY > 32) {
      setNavBar(!navBar);
    } // if
  
    const isHomePage = location.pathname === '/';
  
    if (isHomePage) {
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      } // if
    } else {
      navigate(`/?scrollTo=${sectionId}`);
    } // if else
  };
  

  // Disable Side Navigation Bar With Certain Screen Width
  const nonHamburgerMenuScreenWidth = window.matchMedia('(min-width: 64rem)');
  nonHamburgerMenuScreenWidth.onchange = (width) => {
    if ((width.matches) && (sideNav === true)) {
      setSideNav(!sideNav);
    } // if
  };

  // Search Bar Outline
  const [searchInput, setSearchInput] = useState(false);
  const handleInputFocus = () => {
    setSearchInput(true);
  };
  const handleInputBlur = () => {
    setSearchInput(false);
  };

  // Store Search Input & Disable Search Button With Empty Search Input
  const [movieInputData, setMovieInputData] = useState('');
  const handleMovieInputData = (e) => {
    setMovieInputData(e.target.value);
  };

  const { setSharedData } = useDataContext();
  const sendMovieInputData = () => {
    setSharedData(movieInputData);
  }

  const location = useLocation();

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

  // Sign Out
  const handleSignOut = () => {
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('userType');
    localStorage.removeItem('userToken');
    window.dispatchEvent(new Event("storage"));
    navigate('/');
  };

  return (
    <>
      {/* Navigation Bar */}
      <header className={`navigation-bar ${navBar ? 'top-position' : ''} ${sideNav ? 'side-navigation' : ''}`}>
        <div className='navigation-bar-container'>
          {/* Logo */}
          <Link to='/'><div className={`logo ${sideNav ? 'is-hidden' : ''}`}>Cinera</div></Link>

          {/* Search Bar */}
          {location.pathname !== '/login' && location.pathname !== '/login/forgot' && location.pathname !== '/sign-up' ? (
            <form className={`search-bar ${searchInput ? 'is-active' : ''} ${sideNav ? 'is-hidden' : ''}`}>
              <input
                type='text' placeholder='Search' onFocus={handleInputFocus} onBlur={handleInputBlur}
                onChange={(e) => handleMovieInputData(e)} className='search-input'
              />
              <Link to='/search-results'>
                <button type='submit' onClick={sendMovieInputData} disabled={!movieInputData} className='search-icon-wrapper'>
                  <FontAwesomeIcon icon='fa-solid fa-magnifying-glass fa-1x' className='search-icon' />
                </button>
              </Link>
            </form>
          ) : null}

          {/* Navigation Menu */}
          <nav className='navigation-menu'>
            {(userToken || rememberMe === 'true') ? (
              <ol>
                {(userType === '2') ? (
                  // Admin Portal
                  <Link to='/admin'><button className='navigation-link non-CTA-button'>Portal</button></Link>
                ) : null}

                {/* User Profile */}
                <Link to='/profile'><button className='navigation-link non-CTA-button'>Profile</button></Link>

                {/* Cart */}
                <Link to='/cart'><button className='navigation-link non-CTA-button'>Cart</button></Link>

                {/* Sign Out */}
                <button onClick={handleSignOut} className='navigation-link CTA-button-one'>Sign out</button>

                {/* Search Icon */}
                {location.pathname !== '/login' && location.pathname !== '/login/forgot' && location.pathname !== '/sign-up' ? (
                  <button className={`mobile-search-wrapper ${sideNav ? 'is-hidden' : ''}`}>
                    <FontAwesomeIcon icon='fa-solid fa-magnifying-glass fa-1x' className='mobile-search-icon' />
                  </button>
                ) : null}

                {/* Hamburger Menu */}
                {location.pathname !== '/login' && location.pathname !== '/login/forgot' && location.pathname !== '/sign-up' ? (
                  <button onClick={handleSideNav} className={`hamburger-menu ${sideNav ? 'is-active' : ''}`}>
                    <div className='hamburger-line'></div>
                  </button>
                ) : null}
              </ol>
            ) : (
              <ol>
                {/* Log In */}
                {location.pathname !== '/login' && location.pathname !== '/login/forgot' && location.pathname !== '/sign-up' ? (
                  <Link to='/login'><button className='navigation-link non-CTA-button'>Log in</button></Link>
                ) : null}

                {/* Log In Page Nav Item */}
                {location.pathname === '/login' || location.pathname === '/login/forgot' ? (
                  <div className='login-page-nav-item'>
                    <p>Don't have a Cinera account?</p>
                    <Link to='/sign-up'><button className='fixed-navigation-link'>Sign up</button></Link>
                  </div>
                ) : null}
    
                {/* Sign Up */}
                {location.pathname !== '/login' && location.pathname !== '/login/forgot' && location.pathname !== '/sign-up' ? (
                  <Link to='/sign-up'><button className='navigation-link CTA-button-one'>Sign up</button></Link>
                ) : null}

                {/* Sign Up Page Nav Item */}
                {location.pathname === '/sign-up' ? (
                  <div className='login-page-nav-item'>
                    <p>Already have a Cinera account?</p>
                    <Link to='/login'><button className='fixed-navigation-link'>Log in</button></Link>
                  </div>
                ) : null}

                {/* Search Icon */}
                {location.pathname !== '/login' && location.pathname !== '/login/forgot' && location.pathname !== '/sign-up' ? (
                  <button className={`mobile-search-wrapper ${sideNav ? 'is-hidden' : ''}`}>
                    <FontAwesomeIcon icon='fa-solid fa-magnifying-glass fa-1x' className='mobile-search-icon' />
                  </button>
                ) : null}
                
                {/* Hamburger Menu */}
                {location.pathname !== '/login' && location.pathname !== '/login/forgot' && location.pathname !== '/sign-up' ? (
                  <button onClick={handleSideNav} className={`hamburger-menu ${sideNav ? 'is-active' : ''}`}>
                    <div className='hamburger-line'></div>
                  </button>
                ) : null}
              </ol>
            )}
          </nav>
        </div>
      </header>

      {/* Side Navigation Bar */}
      <div>
        {/* Side Navigation Menu */}
        <nav className={`side-navigation-menu ${sideNav ? 'is-active' : ''}`}>
          <div className='side-navigation-header'></div>
          <div className='side-navigation-lists'>
            <div className='side-navigation-title-top'>Movies</div>
            <ol className='side-navigation-list'>
              <li><button onClick={() => handleScrollToSection('trending')} className='side-navigation-link'>Trending</button></li>
              <li><button onClick={() => handleScrollToSection('now-playing')} className='side-navigation-link'>Now Playing</button></li>
              <li><button onClick={() => handleScrollToSection('coming-soon')} className='side-navigation-link'>Coming Soon</button></li>            </ol>
            {(userToken || rememberMe === 'true') ? (
              <div>
                <div className='side-navigation-title'>Account</div>
                <ol className='side-navigation-list'>
                  <li>
                    {(userType === '2') ? (
                      // Admin Portal
                      <Link to='/admin'><button onClick={handleSideNav} className='side-navigation-link'>Portal</button></Link>
                    ) : null}
                  </li>
                  <li>
                    {/* User Profile */}
                    <Link to='/profile'><button onClick={handleSideNav} className='side-navigation-link'>Profile</button></Link>
                  </li>
                  <li>
                    {(userType === '1' || userType === '2') ? (
                      // Cart
                      <Link to='/cart'><button onClick={handleSideNav} className='side-navigation-link'>Cart</button></Link>
                    ) : null}
                  </li>
                </ol>
              </div>
              ) : (
                null
              )}
          </div>
          {(userToken || rememberMe === 'true') ? (
            <ol className='side-navigation-user-account'>
              <li><button onClick={() => { handleSignOut(); handleSideNav();}} className='CTA-button-one'>Sign out</button></li>
            </ol>
          ) : (
            <ol className='side-navigation-user-account'>
              <li><Link to='/login'><button onClick={handleSideNav} className='CTA-button-two'>Log in</button></Link></li>
              <li><Link to='/sign-up'><button onClick={handleSideNav} className='CTA-button-one'>Sign up</button></Link></li>
            </ol>
          )}
        </nav>

        {/* Side Navigation Overlay */}
        <div onClick={handleSideNav} className={`side-navigation-overlay ${sideNav ? 'is-active' : ''}`}></div>
      </div>
    </>
  )
}

export default Navigation;