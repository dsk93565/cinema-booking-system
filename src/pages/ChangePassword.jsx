import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/account.css';
import axios from 'axios';

const ChangePassword = () => {
  const { identifier, token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/change-password/none/${token}`);
  }, []);

  // Form Data
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Not needed in database due to implemented password match checker

  // Change Password Process
  const [changePasswordStep, setChangePasswordStep] = useState(1);
  const handleChangePasswordClick = (e) => {
    if (changePasswordStep === 1) {
      changeUserPassword(e);
    } // if
  }

  // Password Input Outline
  const [passwordInput, setPasswordInput] = useState(false);
  const [confirmPasswordInput, setConfirmPasswordInput] = useState(false);
  const handlePasswordInputFocus = () => {
    setPasswordInput(true);
    setConfirmPasswordInput(false);
  };
  const handleConfirmPasswordInputFocus = () => {
    setConfirmPasswordInput(true);
    setPasswordInput(false);
  };
  const handleInputBlur = () => {
    setPasswordInput(false);
    setConfirmPasswordInput(false);
  };

  // Password & Confirm Password Visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const handleTogglePasswordVisibility = (e, inputRef, visibilityState, setVisibilityState) => {
    e.preventDefault();

    if (inputRef.current) {
      const caretPosition = inputRef.current.selectionStart;

      setVisibilityState(!visibilityState);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(caretPosition, caretPosition);
        } // if
      });
    } // if
  };

  // Password Match Checker
  const [doesPasswordMatch, setDoesPasswordMatch] = useState(true);
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;

    setPassword(newPassword);
    setDoesPasswordMatch(newPassword === confirmPassword);
  };
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;

    setConfirmPassword(newConfirmPassword);
    setDoesPasswordMatch(password === newConfirmPassword);
  };

  // Change Password Status Message
  const [statusMessage, setStatusMessage] = useState('');

  // Change User Password
  const changeUserPassword = async (e) => {
    e.preventDefault();

    if (!password) {
      setStatusMessage('Please enter a password');
      return;
    } // if

    if (!confirmPassword) {
      setStatusMessage('Please confirm your password');
      return;
    } // if

    if (!doesPasswordMatch) {
      setStatusMessage('Please enter matching passwords');
      return;
    } // if

    try {
      // Send a POST request to your server to initiate the forgot password process
      const response = await axios.post('http://localhost:8000/api/change-password/${identifier}/${token}', {
        password: password,
      });

      if (response.status === 200) {
        setChangePasswordStep(changePasswordStep + 1);
      } else {
        // Handle other response statuses or errors here
        setStatusMessage('Failed reset password.');
      } // if else
    } catch (error) {
      // Handle network or other errors
      console.error('Error changing password:', error);
      setStatusMessage('An error occurred while sending the request.');
    }
  }

  return (
    <>
      {/* Password Change */}
      {changePasswordStep == 1 && (
        <section className='change-password account section-wrapper'>
          <div className='section-container-narrow'>
            <h2>Reset password</h2>
            <form className='user-info-form'>
              <div className='user-info'>
                <label className='user-info-label'>Password</label>
                <div className={`password-info ${passwordInput ? 'is-active' : ''}`}>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    value={password}
                    ref={passwordInputRef}
                    onFocus={handlePasswordInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handlePasswordChange}
                    className='enhanced-input'
                  />
                  <button
                    onClick={(e) => handleTogglePasswordVisibility(e, passwordInputRef, passwordVisible, setPasswordVisible)}
                    onFocus={handlePasswordInputFocus}
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
              <div className='user-info'>
                <label className='user-info-label'>Confirm Password</label>
                <div className={`password-info ${confirmPasswordInput ? 'is-active' : ''}`}>
                  <input
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    value={confirmPassword}
                    ref={confirmPasswordInputRef}
                    onFocus={handleConfirmPasswordInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleConfirmPasswordChange}
                    className='enhanced-input'
                  />
                  <button
                    onClick={(e) => handleTogglePasswordVisibility(e, confirmPasswordInputRef, confirmPasswordVisible, setConfirmPasswordVisible)}
                    onFocus={handleConfirmPasswordInputFocus}
                    onBlur={handleInputBlur}
                    className='eye-icon-wrapper'
                  >
                    <FontAwesomeIcon
                      icon={confirmPasswordVisible ? 'fa-solid fa-eye-slash fa-1x' : 'fa-solid fa-eye fa-1x'}
                      className='eye-icon'
                    />
                  </button>
                </div>
              </div>
            </form>
            <div className='user-info-CTA-button'>
              <button onClick={handleChangePasswordClick} className='CTA-button-one'>Change password</button>
            </div>
            <div className='status-message'>{statusMessage}</div>
          </div>
        </section>
      )}

      {/* Password Change Confirmation */}
      {changePasswordStep == 2 && (
        <section className='change-password account section-wrapper'>
          <div className='section-container-narrow'>
            <h2>Password reset</h2>
          </div>
        </section>
      )}
    </>
  )
}

export default ChangePassword;