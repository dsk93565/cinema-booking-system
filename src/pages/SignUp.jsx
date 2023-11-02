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
  const [signUpStep, setSignUpStep] = useState(1);
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

      sendVerificationCode();
    } // if else-if

    setSignUpStep(signUpStep + 1);
  }
  const handleNextButtonClick = () => {
    if (signUpStep === 3) { // Send account information to database and verification code to account email
      const basicUserData = {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
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
            setSignUpStep(signUpStep + 1);
          } else {
            console.error('Failed to send basic user data to the server.');
          } // if
        })
        .catch((error) => {
          console.error('Error occurred while sending basic user data:', error);
        });
      
      sendVerificationCode();
    } // if

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
    }
  };
  
  const handleMobileNumberChange = (e) => {
    const inputValue = e.target.value;
    let formattedNumber = formatMobileNumber(inputValue);
  
    if (formattedNumber.length === 14) {
      setIsMobileNumberValid(true);
    } else {
      setIsMobileNumberValid(false);
    }
  
    if (formattedNumber.startsWith('(') && !/\d/.test(formattedNumber)) {
      formattedNumber = '';
    }
  
    setMobileNumber(formattedNumber);
  
    // Convert the formatted number to an integer before sending it to the database
    const mobileNumberForDatabase = parseInt(formattedNumber.replace(/\D/g, ''), 10);
    
    // Now you can send `mobileNumberForDatabase` to your database as an integer.
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
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
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
  const [useShippingAddressForBilling, setUseShippingAddressForBilling] = useState(false);
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
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationCodeValid, setIsVerificationCodeValid] = useState(false);
  const generateRandomVerificationCode = () => {
    return Math.floor(10000 + Math.random() * 90000);
  };
  const sendVerificationCode = () => {
    const code = generateRandomVerificationCode();
    // Use your email service to send the code to the user's email (implement this part)
    // For demonstration, we'll log the code to the console
    console.log('Verification code sent to email:', code);
    setVerificationCode(code.toString());
  };

  // Verification Input Format
  const handleVerificationCodeChange = (e) => {
    const code = e.target.value;
    
    setVerificationCode(code);
    setIsVerificationCodeValid(code.length === 5 && /^\d+$/.test(code));
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
                <input type='text' onChange={(e) => setShippingStreetAddress(e.target.value)} className='user-info-input' />
              </div>
              <div className='user-info'>
                <label className='user-info-label'>City</label>
                <input type='text' onChange={(e) => setShippingCityAddress(e.target.value)} className='user-info-input' />
              </div>
              <div className='user-infos'>
                <div className='user-info state'>
                  <label className='user-info-label'>State</label>
                  <select
                    value={shippingStateAddress}
                    onChange={(e) => setShippingStateAddress(e.target.value)}
                    className='user-info-input'
                  >
                    <option value='' selected disabled>Select a state</option>
                    {usStates.map((state) => (
                      <option key={state.abbreviation} value={state.abbreviation}>
                        {state.name}
                      </option>
                    ))}
                  </select>
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
                <select
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                  className='user-info-input'
                >
                  <option value='' selected disabled>Select card type</option>
                  <option value='Credit'>Credit</option>
                  <option value='Debit'>Debit</option>
                </select>
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
                  <select
                    value={billingStateAddress}
                    onChange={(e) => setBillingStateAddress(e.target.value)}
                    className='user-info-input'
                  >
                    <option value='' selected disabled>Select a state</option>
                    {usStates.map((state) => (
                      <option key={state.abbreviation} value={state.abbreviation}>
                        {state.name}
                      </option>
                    ))}
                  </select>
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
            <h2>Verification code sent</h2>
            <p>Please check your email and enter the code down below to confirm your account</p>
            <div className='verification-code'>
              {Array.from({ length: 5 }).map((_, index) => (
                <input
                  type='text'
                  value={verificationCode[index] || ''}
                  key={index}
                  onChange={handleVerificationCodeChange}
                  className='verification-number'
                />
              ))}
            </div>
            <button disabled={!isVerificationCodeValid} className='CTA-button-one'>Confirm account</button>
          </div>
        </section>
      )}

      {/* Account Confirmation */}
      {signUpStep === 5 && (
        <section className='confirmation account section-wrapper'>
          <div className='section-container-narrow'>
            <h2>Account confirmed</h2>
            <p>Congratulations! Your account has been successfully created. Jump right in to explore the new era of cinema.</p>
            <button className='CTA-button-one'>Browse Cinera</button>
          </div>
        </section>
      )}
    </>
  )
}

export default SignUp;