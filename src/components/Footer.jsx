import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='section-wrapper'>
      <div className='footer-container'>
        {/* Logo */}
        <Link to='/'><div className='logo'>Cinera</div></Link>

        {/* Copyright */}
        <div className='copyright'>© 2023 Team C7 · All rights reserved</div>
      </div>
    </footer>
  )
}

export default Footer;