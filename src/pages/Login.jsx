import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/account.css';
import axios from 'axios'; // Import Axios for API requests

const BACKEND_URL = 'http://localhost:8000/api'; // Replace with your backend API URL

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
    e.preventDefault();

    if (passwordInputRef.current) {
      const caretPosition = passwordInputRef.current.selectionStart;

      setPasswordVisible(!passwordVisible);

      setTimeout(() => {
        if (passwordInputRef.current) {
          passwordInputRef.current.focus();
          passwordInputRef.current.setSelectionRange(caretPosition, caretPosition);
        }
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make an API POST request to your login endpoint with email and password
      const response = await axios.post(`${BACKEND_URL}/login`, {
        email: 'user@example.com', // Replace with the user's email input
        password: password, // Use the password state
      });

      if (response.status === 200) {
        // Authentication was successful, you can handle the response as needed
        console.log('Login successful:', response.data);
      } else {
        // Handle authentication errors here, e.g., show an error message
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      console.error('Failed to log in:', error);
    }
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
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                ref={passwordInputRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={(e) => setPassword(e.target.value)}
                className='enhanced-input'
              />
              <button
                onClick={handleTogglePasswordVisibility}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className='eye-icon-wrapper'
              >
                <FontAwesomeIcon
                  icon={passwordVisible ? 'fa-solid fa-eye-slash fa-1x' : 'fa-solid fa-eye fa-1x'}
                  className='eye-icon'
                />
              </button>
            </div>
          </div>
          <a href='/forgot' className='user-info-option'>Forgot password</a>
          <button onClick={handleLogin} className='CTA-button-one'>
            Log in
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
