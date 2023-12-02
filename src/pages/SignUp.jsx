import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import '../stylings/account.css';

const SignUp = (props) => {
  // Form Data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Not needed in database due to implemented password match checker
  const [optInEmail, setOptInEmail] = useState(0);
  const [shippingStreetAddress, setShippingStreetAddress] = useState('');
  const [shippingCityAddress, setShippingCityAddress] = useState('');
  const [shippingStateAddress, setShippingStateAddress] = useState('');
  const [shippingZipCodeAddress, setShippingZipCodeAddress] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [billingStreetAddress, setBillingStreetAddress] = useState('');
  const [billingCityAddress, setBillingCityAddress] = useState('');
  const [billingStateAddress, setBillingStateAddress] = useState('');
  const [billingZipCodeAddress, setBillingZipCodeAddress] = useState('');

  // Sign Up Process
  const location = useLocation();
  const initialSignUpStep = location.state?.signUpStep || 1;
  const [signUpStep, setSignUpStep] = useState(initialSignUpStep);
  console.log(props);
  console.log('-----');
  const handleSkipButtonClick = () => {
    if (signUpStep === 2) {
      setShippingStreetAddress('');
      setShippingCityAddress('');
      setShippingStateAddress('');
      setShippingZipCodeAddress('');
    } else if (signUpStep === 3) {
      setCardType('');
      setCardNumber('');
      setExpirationDate('');
      setBillingStreetAddress('');
      setBillingCityAddress('');
      setBillingStateAddress('');
      setBillingZipCodeAddress('');

      const basicUserData = {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
        optInEmail,
        shippingStreetAddress,
        shippingCityAddress,
        shippingStateAddress,
        shippingZipCodeAddress,
        cardType,
        cardNumber,
        expirationDate,
        billingStreetAddress,
        billingCityAddress,
        billingStateAddress,
        billingZipCodeAddress,
      };
  
      fetch('http://localhost:8000/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(basicUserData),
      })
        .then((response) => {
          if (response.status === 200) {
            sendVerificationCode();
          } else {
            console.error('Failed to send basic user data to the server.');
          } // if
        })
        .catch((error) => {
          console.error('Error occurred while sending basic user data:', error);
        });
    } // if else-if

    setSignUpStep(signUpStep + 1);
  }
  const handleNextButtonClick = () => {
    if (signUpStep === 1) {
      const mobileNumberIntFormat = parseInt(mobileNumber.replace(/\D/g, ''), 10);
      setMobileNumber(mobileNumberIntFormat);

      const isOptedIn = document.querySelector('input[type="checkbox"]').checked;
      setOptInEmail(isOptedIn ? 1 : 0);
    }
    if (signUpStep === 3) { // Send account information to database and verification code to account email
      const basicUserData = {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
        optInEmail,
        shippingStreetAddress,
        shippingCityAddress,
        shippingStateAddress,
        shippingZipCodeAddress,
        cardType,
        cardNumber,
        expirationDate,
        billingStreetAddress,
        billingCityAddress,
        billingStateAddress,
        billingZipCodeAddress,
      };
  
      fetch('http://localhost:8000/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(basicUserData),
      })
        .then((response) => {
          if (response.status === 200) {
            sendVerificationCode();
          } else {
            console.error('Failed to send basic user data to the server.');
          } // if
        })
        .catch((error) => {
          console.error('Error occurred while sending basic user data:', error);
        });
    } // if

    setSignUpStep(signUpStep + 1);
  };
  
  // Sign Up Status Message
  const [statusMessage, setStatusMessage] = useState('');

  // Select Styling
  const selectStyling = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#D7CDEB',
      border: 'none',
      borderRadius: '2rem',
      boxShadow: 'none',
      outline: state.isFocused ? '#7D41E1 0.125rem solid' : 'transparent 0.125rem solid',
      fontSize: '1rem',
      fontWeight: '400',
      width: '100%',
      padding: '1rem 1.125rem',
      transition: 'outline 0.2s ease-in-out',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0',
      padding: '0',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#0F1419',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#7D7387',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#7D7387',
      padding: '0',
      ':hover': {
        color: '#7D7387',
      }
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      margin: '0',
      padding: '0',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#FFFFFF' : '#0F1419',
      backgroundColor: state.isSelected ? '#7D41E1' : '',
      '&:hover': {
        ...provided,
        backgroundColor: state.isSelected ? '#7D41E1' : '#D7CDEB',
      },
    }),
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
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
  ];

  // Zip Code Validity
  const [isShippingZipCodeAddressValid, setIsShippingZipCodeAddressValid] = useState(true);

  // Zip Code Input Format
  useEffect(() => {
    const isValid = shippingZipCodeAddress.trim().length === 5;
    
    setIsShippingZipCodeAddressValid(isValid);
  }, [shippingZipCodeAddress]);

  // Filled Form Checker For Shipping Address Section
  const isShippingAddressFormFilled = () => {
    return (
      shippingStreetAddress.trim() !== '' &&
      shippingCityAddress.trim() !== '' &&
      shippingStateAddress.trim() !== '' &&
      shippingZipCodeAddress.trim() !== ''
    );
  };

  // ----- Payment Information Section -----

  const cardTypeOptions = [
    { value: 'Credit', label: 'Credit' },
    { value: 'Debit', label: 'Debit' },
  ];

  // Card Number Validity
  const isCardNumberValid = (cardNumber) => {
    const numericValue = cardNumber.replace(/\D/g, '');
    
    return numericValue.length === 16;
  };

  // Card Number Input Format
  const formatCardNumber = (inputValue) => {
    const numericValue = inputValue.replace(/\D/g, '').slice(0, 16);
  
    let formattedValue = '';

    for (let i = 0; i < numericValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      } // if

      formattedValue += numericValue[i];
    } // for
  
    return formattedValue;
  };

  // Expiration Date Validity
  const isExpirationDateValid = (expirationDate) => {
    const isValidFormat = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate);
    const [month, year] = expirationDate.split('/');
    const currentDate = new Date();
    const isValidMonth = parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12;
    const currentYear = currentDate.getFullYear() % 100;
    const isValidYear = parseInt(year, 10) >= currentYear && parseInt(year, 10) <= currentYear + 10;
  
    return isValidFormat && isValidMonth && isValidYear;
  };

  // Expiration Date Input Format
  const formatExpirationDate = (inputValue) => {
    const numericValue = inputValue.replace(/\D/g, '').slice(0, 7);
  
    let formattedValue = numericValue;
  
    if (formattedValue.length >= 2) {
      formattedValue = formattedValue.slice(0, 2) + (formattedValue.length > 2 ? '/' : '') + formattedValue.slice(2);
    } // if
  
    if (formattedValue.endsWith('/')) {
      formattedValue = formattedValue.slice(0, -1);
    } // if
  
    if (formattedValue.length >= 5) {
      formattedValue = formattedValue.slice(0, 5);
    } // if
  
    return formattedValue;
  };

  // Zip Code Validity
  const [isBillingZipCodeAddressValid, setIsBillingZipCodeAddressValid] = useState(true);

  // Zip Code Input Format
  useEffect(() => {
    const isValid = billingZipCodeAddress.trim().length === 5;
    
    setIsBillingZipCodeAddressValid(isValid);
  }, [billingZipCodeAddress]);

  // Filled Shipping Address Checker
  const [isShippingAddressEmpty, setIsShippingAddressEmpty] = useState(true);
  useEffect(() => {
    const isEmpty =
      shippingStreetAddress.trim() === '' ||
      shippingCityAddress.trim() === '' ||
      shippingStateAddress.trim() === '' ||
      shippingZipCodeAddress.trim() === '';
  
    setIsShippingAddressEmpty(isEmpty);
  }, [shippingStreetAddress, shippingCityAddress, shippingStateAddress, shippingZipCodeAddress]);
  

  // Use Shipping Address As Billing Address
  const handleUseShippingAddressForBilling = (e) => {
    e.preventDefault();
    setBillingStreetAddress(shippingStreetAddress);
    setBillingCityAddress(shippingCityAddress);
    setBillingStateAddress(shippingStateAddress);
    setBillingZipCodeAddress(shippingZipCodeAddress);
  };

  // Filled Form Checker For Payment Information Section
  const isPaymentInfoFormFilled = () => {
    return (
      cardType.trim() !== '' &&
      billingStreetAddress.trim() !== '' &&
      billingCityAddress.trim() !== '' &&
      billingStateAddress.trim() !== '' &&
      billingZipCodeAddress.trim() !== ''
    );
  };

  // ----- Account Verification Section -----

  // Verification Code
  const [verificationCodeInputs, setVerificationCodeInputs] = useState(['', '', '', '', '']);
  const verificationInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const handleVerificationCodeChange = (index, e) => {
    const value = e.target.value;
    const newInputs = [...verificationCodeInputs];
    newInputs[index] = value;
    setVerificationCodeInputs(newInputs);

    if (value && /^\d$/.test(value) && index < verificationInputRefs.length - 1) {
      verificationInputRefs[index + 1].current.focus();
    } // if
  };
  const handleVerificationCodeKeyUp = (index, e) => {
    if (e.key === 'Backspace' && index > 0) {
      verificationInputRefs[index - 1].current.focus();
    } // if
  };
  const [verificationCode, setVerificationCode] = useState('');
  const sendVerificationCode = () => {
    fetch('http://localhost:8000/api/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => {
        if (response.email_sent === 1) {
          console.error('Sent user email to the server.');
        } else {
          setStatusMessage('Failed to send email');
        } // if else
      })
      .catch((error) => {
        console.error('Error occurred while sending email:', error);
      });
  };
  const handleVerificationCodeSubmit = () => {
    const enteredVerificationCode = verificationCodeInputs.join('');

    fetch('http://localhost:8000/api/email-is-verified', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, verificationCode: enteredVerificationCode }),
      })
        .then((response) => {
          if (response.email_verified === 1) {
            setSignUpStep(signUpStep + 1);
          } else {
            setStatusMessage('incorrect verification code');
          } // if else
        })
        .catch((error) => {
          console.error('Error occurred while sending verification code:', error);
        });
  };

  // Resend Verification Code
  const [verificationHeaderText, setVerificationHeaderText] = useState('Verification code sent');
  const resendVerificationCode = () => {
    fetch('http://localhost:8000/api/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => {
        if (response.status === 200) {
          setVerificationHeaderText('New verification code sent');
          const newInputs = Array(5).fill('');
          setVerificationCodeInputs(newInputs);
          setStatusMessage('');
        } else {
          setStatusMessage('Failed to send email');
        } // if else
      })
      .catch((error) => {
        console.error('Error occurred while sending email:', error);
      });
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
              <label className='user-checkbox-option'><input type='checkbox' />Opt in for promo emails</label>
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
                <input type='text' onChange={(e) => setShippingStreetAddress(e.target.value)} className='user-info-input' />
              </div>
              <div className='user-info'>
                <label className='user-info-label'>City</label>
                <input type='text' onChange={(e) => setShippingCityAddress(e.target.value)} className='user-info-input' />
              </div>
              <div className='user-infos'>
                <div className='user-info state'>
                  <label className='user-info-label'>State</label>
                  <Select
                    placeholder=''
                    value={usStates.find((state) => state.value === shippingStateAddress)}
                    onChange={(selectedOption) => setShippingStateAddress(selectedOption.value)}
                    options={usStates}
                    styles={selectStyling}
                  />
                </div>
                <div className='user-info zip'>
                  <label className='user-info-label'>Zip code</label>
                  <input
                    type='text'
                    value={shippingZipCodeAddress}
                    onChange={(e) => setShippingZipCodeAddress(e.target.value)}
                    maxLength={5}
                    className='user-info-input'
                  />
                  <div className={`input-error ${!isShippingZipCodeAddressValid && shippingZipCodeAddress.length > 0 ? 'visible' : ''}`}>Please enter all 5 digits</div>
                </div>
              </div>
            </form>
            <div className='user-info-CTA-button'>
              <button onClick={handleSkipButtonClick} className='CTA-button-two'>Skip</button>
              <button
                onClick={handleNextButtonClick}
                disabled={!isShippingZipCodeAddressValid || !isShippingAddressFormFilled()}
                className={`CTA-button-one ${isShippingZipCodeAddressValid && isShippingAddressFormFilled() ? '' : 'disabled-button'}`}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Payment Information */}
      {signUpStep === 3 && (
        <section className='payment-info account section-wrapper'>
          <div className='section-container-narrow'>
            <h2>Enter payment information</h2>
            <form className='user-info-form'>
              <div className='user-info'>
                <label className='user-info-label'>Card type</label>
                <Select
                  placeholder=''
                  value={cardTypeOptions.find((option) => option.value === cardType)}
                  onChange={(selectedOption) => setCardType(selectedOption.value)}
                  options={cardTypeOptions}
                  styles={selectStyling}
                />
              </div>
              <div className='user-infos'>
                <div className='user-info card-num'>
                  <label className='user-info-label'>Card number</label>
                  <input
                    type='text'
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    className='user-info-input'
                  />
                  <div className={`input-error ${!isCardNumberValid(cardNumber) && cardNumber.length > 0 ? 'visible' : ''}`}>Please enter all 16 digits</div>
                </div>
                <div className='user-info exp-date'>
                  <label className='user-info-label'>Exp. date</label>
                  <input
                    type='text'
                    placeholder='MM/YY'
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(formatExpirationDate(e.target.value))}
                    maxLength={5}
                    className='user-info-input'
                  />
                  <div className={`input-error ${!isExpirationDateValid(expirationDate) && expirationDate.length > 0 ? 'visible' : ''}`}>Please enter a valid date</div>
                </div>
              </div>
            </form>
            <form className='user-info-form'>
              <h3>Billing address</h3>
              <div className='user-info'>
                <label className='user-info-label'>Street</label>
                <input
                  type='text'
                  value={billingStreetAddress}
                  onChange={(e) => setBillingStreetAddress(e.target.value)}
                  className='user-info-input'
                />
              </div>
              <div className='user-info'>
                <label className='user-info-label'>City</label>
                <input
                  type='text'
                  value={billingCityAddress}
                  onChange={(e) => setBillingCityAddress(e.target.value)}
                  className='user-info-input'
                />
              </div>
              <div className='user-infos'>
                <div className='user-info state'>
                  <label className='user-info-label'>State</label>
                  <Select
                    placeholder=''
                    value={usStates.find((state) => state.value === billingStateAddress)}
                    onChange={(selectedOption) => setBillingStateAddress(selectedOption.value)}
                    options={usStates}
                    styles={selectStyling}
                  />
                </div>
                <div className='user-info zip'>
                  <label className='user-info-label'>Zip code</label>
                  <input
                    type='text'
                    value={billingZipCodeAddress}
                    onChange={(e) => setBillingZipCodeAddress(e.target.value)}
                    maxLength={5}
                    className='user-info-input'
                  />
                  <div className={`input-error ${!isBillingZipCodeAddressValid && billingZipCodeAddress.length > 0 ? 'visible' : ''}`}>Please enter all 5 digits</div>
                </div>
              </div>
              <button
                onClick={handleUseShippingAddressForBilling}
                disabled={isShippingAddressEmpty}
                className={`user-info-option ${isShippingAddressEmpty ? 'disabled-user-option' : ''}`}
              >
                Use shipping address
              </button>
            </form>
            <div className='user-info-CTA-button'>
              <button onClick={handleSkipButtonClick} className='CTA-button-two'>Skip</button>
              <button
                onClick={handleNextButtonClick}
                disabled={!isCardNumberValid(cardNumber) || !isExpirationDateValid(expirationDate) || !isPaymentInfoFormFilled()}
                className={`CTA-button-one ${isCardNumberValid(cardNumber) && isExpirationDateValid(expirationDate) && isPaymentInfoFormFilled() ? '' : 'disabled-button'}`}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Account Verification */}
      {signUpStep === 4 && (
        <section className='verification account section-wrapper'>
          <div className='section-container-narrow'>
            <h2>{verificationHeaderText}</h2>
            <p>Please check your email and enter the code down below to confirm your account</p>
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

      {/* Account Confirmation */}
      {signUpStep === 5 && (
        <section className='forgot-password account section-wrapper'>
          <div className='section-container-narrow'>
            <h2>Account confirmed</h2>
            <p>Congratulations! Your account has been successfully created. Jump right in to explore the new era of cinema.</p>
            <Link to="/"><button className='CTA-button-one'>Browse Cinera</button></Link>
          </div>
        </section>
      )}
    </>
  )
}

export default SignUp;