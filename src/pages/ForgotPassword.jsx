import { useState, useRef } from 'react';
import '../stylings/account.css';
import axios from 'axios';

const ForgotPassword = () => {
  // Form Data
  const [email, setEmail] = useState('');

  // Forgot Password Process
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const handleForgotPasswordClick = (e) => {
    if (forgotPasswordStep === 1) {
      sendEmailAuthorizationCode(e);
    } // if
  }

  // Email Validity
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email === '';

  // Forgot Password Status Message
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmailAuthorizationCode = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatusMessage('Please enter an email');
      return;
    } // if

    if (!isEmailValid) {
      setStatusMessage('Please enter a valid email');
      return;
    } // if

    try {
      // Send a POST request to your server to initiate the forgot password process
      const response = await axios.post('http://localhost:8000/api/forgot-password', {
        email: email,
      });

      if (response.status === 200) {
        setForgotPasswordStep(forgotPasswordStep + 1);
      } else {
        // Handle other response statuses or errors here
        setStatusMessage('Failed to send password reset email.');
      } // if else
    } catch (error) {
      // Handle network or other errors
      console.error('Error sending forgot password request:', error);
      setStatusMessage('An error occurred while sending the request.');
    }
  };

  // Resend Authorization Code
  const [authorizationHeaderText, setAuthorizationHeaderText] = useState('Email sent');
  const resendAuthorizationCode = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your server to initiate the forgot password process
      const response = await axios.post('http://localhost:8000/api/forgot-password', {
        email: email,
      });

      if (response.status === 200) {
        setAuthorizationHeaderText('Email resent');
        setStatusMessage('');
      } else {
        // Handle other response statuses or errors here
        setStatusMessage('Failed to send password reset email.');
      } // if else
    } catch (error) {
      // Handle network or other errors
      console.error('Error sending forgot password request:', error);
      setStatusMessage('An error occurred while sending the request.');
    }
  };

  return (
    <>
      {/* Email Identification */}
      {forgotPasswordStep == 1 && (
        <section className='forgot-password account section-wrapper'>
          <div className='section-container-narrow'>
            <h2>Forgot password</h2>
            <p>Please enter the email associated with your account.</p>
            <form className='user-info-form'>
              <label className='user-info-label'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='user-info-input'
              />
            </form>
            <div>
              <button
                onClick={handleForgotPasswordClick}
                className='CTA-button-one'
              >
                Continue
              </button>
              <div className='status-message'>{statusMessage}</div>
            </div>
          </div>
        </section>
      )}

      {/* Email Authorization Code */}
      {forgotPasswordStep == 2 && (
        <section className='forgot-password account section-wrapper'>
          <div className='section-container-narrow'>
            <h2>{authorizationHeaderText}</h2>
            <p>Please check your email for a link to reset your password.</p>
            <div>
              <button onClick={resendAuthorizationCode} className='CTA-button-one'>Resend email</button>
              <div className='status-message'>{statusMessage}</div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ForgotPassword;