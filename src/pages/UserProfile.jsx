import { useState, useRef } from 'react';
import '../stylings/account.css';
import AccountSubsection from '../components/AccountSubsection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserProfile = () => {

    // Password Input Outline
    const [password, setPassword] = useState('');
    const [passwordInput, setPasswordInput] = useState(false);
    const handleInputFocus = () => {
        setPasswordInput(true);
    };
    const handleInputBlur = () => {
        setPasswordInput(false);
    };

    // Password Visibility
    const [passwordVisible, setPasswordVisible] = useState(false);
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

    return (
    <section className='temporary section-wrapper'>
        <div className='section-container-narrow'>
            <h2>Profile</h2>
            <form className='user-info-form'>
                <div className='user-infos'>
                    <div className='user-info'>
                        <label className='user-info-label'>First name</label>
                        <input type='text' placeholder='Jane' className='user-info-input' />
                    </div>
                    <div className='user-info'>
                        <label className='user-info-label'>Last name</label>
                        <input type='text' placeholder='Doe' className='user-info-input' />
                    </div>
                </div>
                <div className='user-info'>
                    <label className='user-info-label'>Mobile number</label>
                    <input type='text' placeholder='404-123-4567' className='user-info-input' />
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
                <AccountSubsection name="shipping-info" />
                <AccountSubsection name="payment-info" />
            </form>
            <button className='CTA-button-one'>Save changes</button>
        </div>
    </section>
  )
}

export default UserProfile;