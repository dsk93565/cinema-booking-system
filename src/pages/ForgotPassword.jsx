import { useState } from 'react';
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
    } else if (forgotPasswordStep === 2) {
    } else if (forgotPasswordStep === 3) {
    } // if else-if else-if
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
        <section className='verification account section-wrapper'>
          <div className='section-container-narrow'>
            <h2>Enter code</h2>
            <p>Please check your email and enter the code down below to confirm your password change.</p>
            <div className='verification-code'>
              {verificationCodeInputs.map((value, index) => (
                <input
                  key={index}
                  type='text'
                  maxLength={1}
                  ref={verificationInputRefs[index]}
                  value={value}
                  onChange={(e) => handleVerificationCodeChange(index, e)}
                  onKeyUp={(e) => handleVerificationCodeKeyUp(index, e)}
                  className='verification-number'
                />
              ))}
            </div>
            <button
              onClick={resendVerificationCode}
              className='user-info-option'
            >
              Resend email
            </button>
            <div>
              <button onClick={handleVerificationCodeSubmit} className='CTA-button-one'>Confirm account</button>
              <div className='status-message'>{statusMessage}</div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ForgotPassword;
