import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/account.css';

const Login = () => {
  // Password Input Outline
  const [passwordInput, setPasswordInput] = useState(false);
  const handleInputFocus = () => {
    setPasswordInput(true);
  };
  const handleInputBlur = () => {
    setPasswordInput(false);
  };

  // Password Visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null);
  
  const handleTogglePasswordVisibility = (e) => {
    setPasswordVisible(!passwordVisible);
    e.preventDefault();

    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    } // if
  };

  return (
    <section className='login account section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Log in to your account</h2>
        <form className='user-info-form'>
          <div className='user-info'>
            <label className='user-info-label'>Email</label>
            <input type='email' className='user-info-input' />
          </div>
          <div className='user-info'>
            <label className='user-info-label'>Password</label>
            <div className={`password-info ${passwordInput ? 'is-active' : ''}`}>
              <input
                type={passwordVisible ? 'text' : 'password'} value={password} ref={passwordInputRef} onFocus={handleInputFocus}
                onBlur={handleInputBlur} onChange={(e) => setPassword(e.target.value)} className='enhanced-input'
              />
              <button onClick={handleTogglePasswordVisibility} onFocus={handleInputFocus} onBlur={handleInputBlur} className='eye-icon-wrapper'>
                <FontAwesomeIcon
                  icon={passwordVisible ? 'fa-solid fa-eye-slash fa-1x' : 'fa-solid fa-eye fa-1x'} className='eye-icon'
                />
              </button>
            </div>
          </div>
          <Link to='forgot'><button className='user-info-option'>Forgot password</button></Link>
        </form>
        <Link to='/'><button className='CTA-button-one'>Log in</button></Link>
      </div>
    </section>
  )
}

export default Login;