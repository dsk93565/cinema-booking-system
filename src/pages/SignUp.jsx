import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/account.css';

const SignUp = () => {
  // Form Data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Not needed in database due to implemented password match checker
  const [streetShippingAddress, setStreetShippingAddress] = useState('');
  const [cityShippingAddress, setCityShippingAddress] = useState('');
  const [stateShippingAddress, setStateShippingAddress] = useState('');
  const [zipCodeShippingAddress, setZipCodeShippingAddress] = useState('');

  // Sign Up Process
  const [signUpStep, setSignUpStep] = useState(1);
  const handleSkipButtonClick = () => {
    setSignUpStep(signUpStep + 1);
  }
  const handleNextButtonClick = () => {
    if (signUpStep === 1) {
      // Send basic user information to database
    } else if (signUpStep === 2) {
      // Send shipping address information to database
    } else if (signUpStep === 3) {
      // Send payment information to database
    } // if else-if else-if

    setSignUpStep(signUpStep + 1);
  };

  // ----- Basic User Information Section -----

  // Email Validity
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email === '';

  // Mobile Number Validity
  const [isMobileNumberValid, setIsMobileNumberValid] = useState(false);

  // Mobile Number Input Format
  const formatMobileNumber = (inputValue) => {
    const mobileNumber = inputValue.replace(/\D/g, '');

    if (mobileNumber.length <= 3) {
      return `(${mobileNumber}`;
    } else if (mobileNumber.length <= 6) {
      return `(${mobileNumber.slice(0, 3)}) ${mobileNumber.slice(3)}`;
    } else {
      return `(${mobileNumber.slice(0, 3)}) ${mobileNumber.slice(3, 6)}-${mobileNumber.slice(6, 10)}`;
    } // if else-if else
  };
  const handleMobileNumberChange = (e) => {
    const inputValue = e.target.value;
    let formattedNumber = formatMobileNumber(inputValue);

    if (formattedNumber.length === 14) {
      setIsMobileNumberValid(true);
    } else {
      setIsMobileNumberValid(false);
    } // if else

    if (formattedNumber.startsWith('(') && !/\d/.test(formattedNumber)) {
      formattedNumber = '';
    } // if

    setMobileNumber(formattedNumber);
  };

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

  // Filled Form Checker For Basic Information Section
  const isBasicInfoFormFilled = (firstName && lastName && email && mobileNumber && password && confirmPassword && doesPasswordMatch);

  // ----- Shipping Address Information Section -----

  // US States
  const usStates = [
    { label: 'Alabama', value: 'AL' },
    { label: 'Alaska', value: 'AK' },
    { label: 'Arizona', value: 'AZ' },
    { label: 'Arkansas', value: 'AR' },
    { label: 'California', value: 'CA' },
    { label: 'Colorado', value: 'CO' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Delaware', value: 'DE' },
    { label: 'Florida', value: 'FL' },
    { label: 'Georgia', value: 'GA' },
    { label: 'Hawaii', value: 'HI' },
    { label: 'Idaho', value: 'ID' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Indiana', value: 'IN' },
    { label: 'Iowa', value: 'IA' },
    { label: 'Kansas', value: 'KS' },
    { label: 'Kentucky', value: 'KY' },
    { label: 'Louisiana', value: 'LA' },
    { label: 'Maine', value: 'ME' },
    { label: 'Maryland', value: 'MD' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Michigan', value: 'MI' },
    { label: 'Minnesota', value: 'MN' },
    { label: 'Mississippi', value: 'MS' },
    { label: 'Missouri', value: 'MO' },
    { label: 'Montana', value: 'MT' },
    { label: 'Nebraska', value: 'NE' },
    { label: 'Nevada', value: 'NV' },
    { label: 'New Hampshire', value: 'NH' },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New Mexico', value: 'NM' },
    { label: 'New York', value: 'NY' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'North Dakota', value: 'ND' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Oregon', value: 'OR' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'South Carolina', value: 'SC' },
    { label: 'South Dakota', value: 'SD' },
    { label: 'Tennessee', value: 'TN' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Vermont', value: 'VT' },
    { label: 'Virginia', value: 'VA' },
    { label: 'Washington', value: 'WA' },
    { label: 'West Virginia', value: 'WV' },
    { label: 'Wisconsin', value: 'WI' },
    { label: 'Wyoming', value: 'WY' },
  ];  

  // Zip Code Validity
  const [isZipCodeShippingAddressValid, setIsZipCodeShippingAddressValid] = useState(true);

  // Zip Code Input Format
  useEffect(() => {
    const isValid = zipCodeShippingAddress.trim().length === 5;
    
    setIsZipCodeShippingAddressValid(isValid);
  }, [zipCodeShippingAddress]);

  // Filled Form Checker For Shipping Address Section
  const isShippingAddressFormFilled = () => {
    return (
      streetShippingAddress.trim() !== '' &&
      cityShippingAddress.trim() !== '' &&
      stateShippingAddress.trim() !== '' &&
      zipCodeShippingAddress.trim() !== ''
    );
  };

  return (
    <>
      {/* Basic User Information */}
      {signUpStep === 1 && (
        <section className='sign-up account section-wrapper'>
          <div className='section-container-narrow'>
            <h2>Create an account</h2>
            <form className='user-info-form'>
              <div className='user-infos'>
                <div className='user-info'>
                  <label className='user-info-label'>First name</label>
                  <input type='text' onChange={(e) => setFirstName(e.target.value)} className='user-info-input' />
                </div>
                <div className='user-info'>
                  <label className='user-info-label'>Last name</label>
                  <input type='text' onChange={(e) => setLastName(e.target.value)} className='user-info-input' />
                </div>
              </div>
              <div className='user-info'>
                <label className='user-info-label'>Email</label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='user-info-input'
                />
                <div className={`input-error ${!isEmailValid && email !== '' ? 'visible' : ''}`}>Please enter a valid email</div>
              </div>
              <div className='user-info'>
                <label className='user-info-label'>Mobile number</label>
                <input
                  type='tel'
                  placeholder='(000) 000-0000'
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  maxLength={14}
                  className='user-info-input'
                />
                <div className={`input-error ${!isMobileNumberValid && mobileNumber.length > 0 ? 'visible' : ''}`}>Please enter all 10 digits</div>
              </div>
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
                <div className={`input-error ${!doesPasswordMatch && confirmPassword !== '' ? 'visible' : ''}`}>Passwords do not match</div>
              </div>
            </form>
            <div className='user-info-CTA-button'>
              <button
                onClick={handleNextButtonClick}
                disabled={!isEmailValid || !isMobileNumberValid || !doesPasswordMatch || !isBasicInfoFormFilled}
                className={`CTA-button-one ${isEmailValid && isMobileNumberValid && doesPasswordMatch && isBasicInfoFormFilled ? '' : 'disabled-button'}`}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Shipping Address Information */}
      {signUpStep === 2 && (
        <section className='shipping-address account section-wrapper'>
          <div className='section-container-narrow'>
            <h2>Enter shipping address</h2>
            <form className='user-info-form'>
              <div className='user-info'>
                <label className='user-info-label'>Street</label>
                <input type='text' onChange={(e) => setStreetShippingAddress(e.target.value)} className='user-info-input' />
              </div>
              <div className='user-info'>
                <label className='user-info-label'>City</label>
                <input type='text' onChange={(e) => setCityShippingAddress(e.target.value)} className='user-info-input' />
              </div>
              <div className='user-infos'>
                <div className='user-info'>
                  <label className='user-info-label'>State</label>
                  <input type='text' onChange={(e) => setStateShippingAddress(e.target.value)} className='user-info-input' />
                </div>
                <div className='user-info'>
                  <label className='user-info-label'>Zip code</label>
                  <input
                    type='text'
                    value={zipCodeShippingAddress}
                    onChange={(e) => setZipCodeShippingAddress(e.target.value)}
                    maxLength={5}
                    className='user-info-input'
                  />
                  <div className={`input-error ${!isZipCodeShippingAddressValid && zipCodeShippingAddress.length > 0 ? 'visible' : ''}`}>Please enter all 5 digits</div>
                </div>
              </div>
            </form>
            <div className='user-info-CTA-button'>
              <button onClick={handleSkipButtonClick} className='CTA-button-two'>Skip</button>
              <button
                onClick={handleNextButtonClick}
                disabled={!isZipCodeShippingAddressValid || !isShippingAddressFormFilled()}
                className={`CTA-button-one ${isZipCodeShippingAddressValid && isShippingAddressFormFilled() ? '' : 'disabled-button'}`}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default SignUp;