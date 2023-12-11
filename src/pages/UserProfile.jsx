import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import '../stylings/account.css';

const UserProfile = () => {
  // User Data
  const userToken = localStorage.getItem('userToken');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [passwordNew, setPasswordNew] = useState(''); // Not needed in database due to implemented password match checker
  const [optInEmail, setOptInEmail] = useState(0);
  const [shippingStreetAddress, setShippingStreetAddress] = useState('');
  const [shippingCityAddress, setShippingCityAddress] = useState('');
  const [shippingStateAddress, setShippingStateAddress] = useState('');
  const [shippingZipCodeAddress, setShippingZipCodeAddress] = useState('');
  const [cardType1, setCardType1] = useState('');
  const [cardNumber1, setCardNumber1] = useState('');
  const [expirationDate1, setExpirationDate1] = useState('');
  const [billingStreetAddress1, setBillingStreetAddress1] = useState('');
  const [billingCityAddress1, setBillingCityAddress1] = useState('');
  const [billingStateAddress1, setBillingStateAddress1] = useState('');
  const [billingZipCodeAddress1, setBillingZipCodeAddress1] = useState('');
  const [cardType2, setCardType2] = useState('');
  const [cardNumber2, setCardNumber2] = useState('');
  const [expirationDate2, setExpirationDate2] = useState('');
  const [billingStreetAddress2, setBillingStreetAddress2] = useState('');
  const [billingCityAddress2, setBillingCityAddress2] = useState('');
  const [billingStateAddress2, setBillingStateAddress2] = useState('');
  const [billingZipCodeAddress2, setBillingZipCodeAddress2] = useState('');
  const [cardType3, setCardType3] = useState('');
  const [cardNumber3, setCardNumber3] = useState('');
  const [expirationDate3, setExpirationDate3] = useState('');
  const [billingStreetAddress3, setBillingStreetAddress3] = useState('');
  const [billingCityAddress3, setBillingCityAddress3] = useState('');
  const [billingStateAddress3, setBillingStateAddress3] = useState('');
  const [billingZipCodeAddress3, setBillingZipCodeAddress3] = useState('');

  // Profile Page Change
  const [profilePage, setProfilePage] = useState('basic');
  const [error, setError] = useState('');
  const handlePageChange = (page) => {
    setEditMode(false);
    setEditMode2(false);
    setEditMode3(false);
    setStatusMessage('');
    setStatusMessage2('');
    setStatusMessage3('');
    setProfilePage(page);
  };

  // Edit Functionalties
  const [editMode, setEditMode] = useState(false);
  const [editMode2, setEditMode2] = useState(false);
  const [editMode3, setEditMode3] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusMessage2, setStatusMessage2] = useState('');
  const [statusMessage3, setStatusMessage3] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/get-user', {
          user_token: userToken
        });
        setFirstName(response.data.user.first_name);
        setLastName(response.data.user.last_name);
        setEmail(response.data.user.email);
        setMobileNumber(response.data.user.phone_number);
        setOptInEmail(response.data.user.promotions);
        setShippingStreetAddress(response.data.user.shipping_street);
        setShippingCityAddress(response.data.user.shipping_city);
        setShippingStateAddress(response.data.user.shipping_state);
        setShippingZipCodeAddress(response.data.user.shipping_zip);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'Error fetching user data');
      }
    };

    fetchUserData();
  }, [userToken]);

  useEffect(() => {
    const fetchUserPaymentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get-cards?user_token=${userToken}`
        );
  
        console.log('Response from server:', response.data);
  
        const cards = response.data.cards;
  
        if (cards && cards.length > 0) {
          // Assuming you want to handle up to 3 cards
          for (let i = 0; i < Math.min(cards.length, 3); i++) {
            const cardInfo = cards[i];
  
            // Adjust the state variable names based on the card index
            const cardTypeKey = `cardType${i + 1}`;
            const cardNumberKey = `cardNumber${i + 1}`;
            const expirationDateKey = `expirationDate${i + 1}`;
            const billingStreetAddressKey = `billingStreetAddress${i + 1}`;
            const billingCityAddressKey = `billingCityAddress${i + 1}`;
            const billingStateAddressKey = `billingStateAddress${i + 1}`;
            const billingZipCodeAddressKey = `billingZipCodeAddress${i + 1}`;
  
            // Set the state variables with the retrieved card info
            if (i === 0) {
              setCardType1(cardInfo[cardTypeKey]);
              setCardNumber1(cardInfo[cardNumberKey]);
              setExpirationDate1(cardInfo[expirationDateKey]);
              setBillingStreetAddress1(cardInfo[billingStreetAddressKey]);
              setBillingCityAddress1(cardInfo[billingCityAddressKey]);
              setBillingStateAddress1(cardInfo[billingStateAddressKey]);
              setBillingZipCodeAddress1(cardInfo[billingZipCodeAddressKey]);
            } else if (i === 1) {
              setCardType2(cardInfo[cardTypeKey]);
              setCardNumber2(cardInfo[cardNumberKey]);
              setExpirationDate2(cardInfo[expirationDateKey]);
              setBillingStreetAddress2(cardInfo[billingStreetAddressKey]);
              setBillingCityAddress2(cardInfo[billingCityAddressKey]);
              setBillingStateAddress2(cardInfo[billingStateAddressKey]);
              setBillingZipCodeAddress2(cardInfo[billingZipCodeAddressKey]);
            } else if (i === 2) {
              setCardType3(cardInfo[cardTypeKey]);
              setCardNumber3(cardInfo[cardNumberKey]);
              setExpirationDate3(cardInfo[expirationDateKey]);
              setBillingStreetAddress3(cardInfo[billingStreetAddressKey]);
              setBillingCityAddress3(cardInfo[billingCityAddressKey]);
              setBillingStateAddress3(cardInfo[billingStateAddressKey]);
              setBillingZipCodeAddress3(cardInfo[billingZipCodeAddressKey]);
            }
          }
        } else {
          // Handle the case where there are no cards for the user
          console.log('User has no payment cards.');
        }
      } catch (error) {
        console.error('Error fetching user payment data:', error);
        setError(error.message || 'Error fetching user payment data');
      }
    };
  
    fetchUserPaymentData();
  }, [userToken]);
      
  const handleSaveChanges = async () => {
    try {
      if (profilePage === 'basic' && passwordNew === '') {
        const response = await axios.post('http://localhost:8000/api/edit-user', {
            user_token: localStorage.getItem('userToken'),
            first_name: firstName,
            last_name: lastName,
            phone_number: mobileNumber,
            promotions: optInEmail,
          });
          setEditMode(false);
          setStatusMessage('Changes saved successfully');
      } else if (profilePage === 'basic' && passwordNew !== '') {
        const response1 = await axios.post(`http://localhost:8000/api/login`, {
          email: email,
          password: passwordCurrent,
        });

        if (response1.data.user_token === -1) {
          setStatusMessage('Invalid current password');
        } else if (response1.data.user_token !== -2) {
          const response2 = await axios.post('http://localhost:8000/api/edit-user', {
            user_token: localStorage.getItem('userToken'),
            first_name: firstName,
            last_name: lastName,
            phone_number: mobileNumber,
            password: passwordNew,
            promotions: optInEmail,
          });
          setEditMode(false);
          setStatusMessage('Changes saved successfully');
        } // if else-if
      } else if (profilePage === 'shipping') {
        const response = await axios.post('http://localhost:8000/api/edit-user', {
          user_token: localStorage.getItem('userToken'),
          shipping_street: shippingStreetAddress,
          shipping_city: shippingCityAddress,
          shipping_state: shippingStateAddress,
          shipping_zip: shippingZipCodeAddress,
        });
        setEditMode(false);
        setStatusMessage('Changes saved successfully');
      } else if (profilePage === 'payment') {
        if (editMode) {
          const response = await axios.post('http://localhost:8000/api/edit-user', {
            user_token: localStorage.getItem('userToken'),
            // card_type1: cardType1,
            // card_num1: cardNumber1,
            // exp_date1: expirationDate1,
            // billing_street1: billingStreetAddress1,
            // billing_city1: billingCityAddress1,
            // billing_state1: billingStateAddress1,
            // billing_zip1: billingZipCodeAddress1,
          });

          setEditMode(false);
          setStatusMessage('Changes saved successfully');
        } else if(editMode2) {
          const response2 = await axios.post('http://localhost:8000/api/edit-user', {
            user_token: localStorage.getItem('userToken'),
            // card_type2: cardType2,
            // card_num2: cardNumber2,
            // exp_date2: expirationDate2,
            // billing_street2: billingStreetAddress2,
            // billing_city2: billingCityAddress2,
            // billing_state2: billingStateAddress2,
            // billing_zip2: billingZipCodeAddress2,
          });

          setEditMode2(false);
          setStatusMessage2('Changes saved successfully');
        } else if(editMode3) {
          const response3 = await axios.post('http://localhost:8000/api/edit-user', {
            user_token: localStorage.getItem('userToken'),
            // card_type3: cardType3,
            // card_num3: cardNumber3,
            // exp_date3: expirationDate3,
            // billing_street3: billingStreetAddress3,
            // billing_city3: billingCityAddress3,
            // billing_state3: billingStateAddress3,
            // billing_zip3: billingZipCodeAddress3,
          });

          setEditMode3(false);
          setStatusMessage3('Changes saved successfully');
        } // if else-if else-if
      } // if else-if else-if else-if
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Error saving changes');
    }
  };

  // ----- Shipping Information Section -----

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

  // ----- Payment Information Section -----

  const cardTypeOptions = [
    { value: 'Credit', label: 'Credit' },
    { value: 'Debit', label: 'Debit' },
  ];

  return (
    <section className='user-profile section-wrapper'>
      <div className='section-container-top'>
        <div className='user-profile-header'>
          <div className='user-profile-categories'>
            <h2 onClick={() => handlePageChange('basic')} className={profilePage === 'basic' ? 'active' : ''}>Basic information</h2>
            <h2 onClick={() => handlePageChange('shipping')} className={profilePage === 'shipping' ? 'active' : ''}>Shipping information</h2>
            <h2 onClick={() => handlePageChange('payment')} className={profilePage === 'payment' ? 'active' : ''}>Payment information</h2>
          </div>
          <hr className='section-separator' />
        </div>
        <div>
          {/* Basic Information */}
          {profilePage === 'basic' && (
            <div className='user-profile-page'>
              {editMode ? (
                <form className='user-info-form user-basic-info'>
                  <div className='user-infos'>
                    <div className='user-info'>
                      <label className='user-info-label'>First name</label>
                      <input
                        type='text'
                        placeholder={!editMode ? firstName : ''}
                        value={editMode ? firstName : ''}
                        onChange={(e) => setFirstName(e.target.value)}
                        className='user-info-input'
                      />
                    </div>
                    <div className='user-info'>
                      <label className='user-info-label'>Last name</label>
                      <input
                        type='text'
                        placeholder={!editMode ? lastName : ''}
                        value={editMode ? lastName : ''}
                        onChange={(e) => setLastName(e.target.value)}
                        className='user-info-input'
                      />
                    </div>
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>Mobile number</label>
                    <input
                      type='text'
                      placeholder={!editMode ? mobileNumber : ''}
                      value={editMode ? mobileNumber : ''}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className='user-info-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>Email</label>
                    <input
                      type='text'
                      placeholder={email}
                      disabled
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>Current password</label>
                    <input
                      type='password'
                      autoComplete='off'
                      placeholder={!editMode ? 'No peaking :)' : 'Enter current password to change password'}
                      onChange={(e) => setPasswordCurrent(e.target.value)}
                      className='user-info-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>New password</label>
                    <input
                      type='password'
                      autoComplete='off'
                      onChange={(e) => setPasswordNew(e.target.value)}
                      className='user-info-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-checkbox-option'>
                      <input
                        type='checkbox'
                        checked={optInEmail === 1}
                        onChange={(e) => setOptInEmail(e.target.checked ? 1 : 0)}
                      />
                      Promotional emails
                    </label>
                  </div>
                  <div className='user-profile-buttons'>
                    <button className='CTA-button-one' type='button' onClick={handleSaveChanges}>Save</button>
                    <button className='CTA-button-two' type='button' onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                  <div className='status-message'>{statusMessage}</div>
                </form>
              ) : (
                <form className='user-info-form user-basic-info'>
                  <div className='user-infos'>
                    <div className='user-info'>
                      <label className='user-info-label'>First name</label>
                      <input
                        type='text'
                        placeholder={!editMode ? firstName : ''}
                        value={editMode ? firstName : ''}
                        disabled={!editMode}
                        className='user-info-input disabled-input'
                      />
                    </div>
                    <div className='user-info'>
                      <label className='user-info-label'>Last name</label>
                      <input
                        type='text'
                        placeholder={!editMode ? lastName : ''}
                        value={editMode ? lastName : ''}
                        disabled={!editMode}
                        className='user-info-input disabled-input'
                      />
                    </div>
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>Mobile number</label>
                    <input
                      type='text'
                      placeholder={!editMode ? mobileNumber : ''}
                      value={editMode ? mobileNumber : ''}
                      disabled={!editMode}
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>Email</label>
                    <input
                      type='text'
                      placeholder={email}
                      disabled
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>Password</label>
                    <input
                      type='password'
                      autoComplete='off'
                      placeholder={!editMode ? 'No peaking :)' : 'Enter current password to change password'}
                      disabled
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-checkbox-option'>
                      <input
                        type='checkbox'
                        checked={optInEmail === 1}
                        disabled
                      />
                      Promotional emails
                    </label>
                  </div>
                  <div className='user-profile-buttons'>
                    <button className='CTA-button-one' type='button' onClick={() => setEditMode(true)}>Edit</button>
                  </div>
                  <div className='status-message'>{statusMessage}</div>
                </form>
              )}
            </div>
          )}

          {/* Shipping Information */}
          {profilePage === 'shipping' && (
            <div className='user-profile-page'>
              {editMode ? (
                <form className='user-info-form user-shipping-info'>
                  <div className='user-info'>
                    <label className='user-info-label'>Street</label>
                    <input
                      type='text'
                      placeholder={!editMode ? shippingStreetAddress : ''}
                      value={editMode ? shippingStreetAddress : ''}
                      onChange={(e) => setShippingStreetAddress(e.target.value)}
                      className='user-info-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>City</label>
                    <input
                      type='text'
                      placeholder={!editMode ? shippingCityAddress : ''}
                      value={editMode ? shippingCityAddress : ''}
                      onChange={(e) => setShippingCityAddress(e.target.value)}
                      className='user-info-input'
                    />
                  </div>
                  <div className='user-infos'>
                    <div className='user-info state'>
                      <label className='user-info-label'>State</label>
                      <Select
                        options={usStates}
                        placeholder={!editMode ? shippingStateAddress : ''}
                        value={editMode ? (usStates.find((state) => state.value === shippingStateAddress)) : ''}
                        onChange={(selectedOption) => setShippingStateAddress(selectedOption.value)}
                        styles={selectStyling}
                      />
                    </div>
                    <div className='user-info zip'>
                      <label className='user-info-label'>Zip code</label>
                      <input
                        type='text'
                        placeholder={!editMode ? shippingZipCodeAddress : ''}
                        value={editMode ? shippingZipCodeAddress : ''}
                        onChange={(e) => setShippingZipCodeAddress(e.target.value)}
                        className='user-info-input'
                      />
                    </div>
                  </div>
                  <div className='user-profile-buttons'>
                    <button className='CTA-button-one' type='button' onClick={handleSaveChanges}>Save</button>
                    <button className='CTA-button-two' type='button' onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                  <div className='status-message'>{statusMessage}</div>
                </form>
              ) : (
                <form className='user-info-form user-shipping-info'>
                  <div className='user-info'>
                    <label className='user-info-label'>Street</label>
                    <input
                      type='text'
                      placeholder={!editMode ? shippingStreetAddress : ''}
                      value={editMode ? shippingStreetAddress : ''}
                      disabled={!editMode}
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>City</label>
                    <input
                      type='text'
                      placeholder={!editMode ? shippingCityAddress : ''}
                      value={editMode ? shippingCityAddress : ''}
                      disabled={!editMode}
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-infos'>
                    <div className='user-info state'>
                      <label className='user-info-label'>State</label>
                      <Select
                        options={usStates}
                        placeholder={!editMode ? shippingStateAddress : ''}
                        value={editMode ? (usStates.find((state) => state.value === shippingStateAddress)) : ''}
                        isDisabled={!editMode}
                        styles={selectStyling}
                      />
                    </div>
                    <div className='user-info zip'>
                      <label className='user-info-label'>Zip code</label>
                      <input
                        type='text'
                        placeholder={!editMode ? shippingZipCodeAddress : ''}
                        value={editMode ? shippingZipCodeAddress : ''}
                        disabled={!editMode}
                        className='user-info-input disabled-input'
                      />
                    </div>
                  </div>
                  {(shippingStreetAddress === '') ? (
                    <div className='user-profile-buttons'>
                      <button className='CTA-button-one' type='button' onClick={() => setEditMode(true)}>Add</button>
                    </div>
                  ) : (
                    <div className='user-profile-buttons'>
                      <button className='CTA-button-one' type='button' onClick={() => setEditMode(true)}>Edit</button>
                    </div>
                  )}
                  <div className='status-message'>{statusMessage}</div>
                </form>
              )}
            </div>
          )}

          {/* Payment Information */}
          {profilePage === 'payment' && (
            <div className='user-profile-page user-payments-info'>
              {editMode ? (
                <form className='user-info-form'>
                  <h3 className='user-profile-payment'>Payment method 1</h3>
                  <div className='user-info'>
                    <label className='user-info-label'>Card type</label>
                    <Select
                      options={cardTypeOptions}
                      placeholder={!editMode ? cardType1 : ''}
                      value={cardTypeOptions.find((option) => option.value === cardType1)}
                      onChange={(selectedOption) => setCardType1(selectedOption.value)}
                      styles={selectStyling}
                    />
                  </div>
                  <div className='user-infos'>
                    <div className='user-info card-num'>
                      <label className='user-info-label'>Card number</label>
                      <input
                        type='text'
                        placeholder={!editMode ? cardNumber1 : ''}
                        value={editMode ? cardNumber1 : ''}
                        onChange={(e) => setCardNumber1(e.target.value)}
                        className='user-info-input'
                      />
                    </div>
                    <div className='user-info exp-date'>
                      <label className='user-info-label'>Exp. date</label>
                      <input
                        type='text'
                        placeholder={!editMode ? expirationDate1 : ''}
                        value={editMode ? expirationDate1 : ''}
                        onChange={(e) => setExpirationDate1(e.target.value)}
                        className='user-info-input'
                      />
                    </div>
                  </div>
                  <h3 className='user-profile-billing'>Billing address</h3>
                  <div className='user-info'>
                    <label className='user-info-label'>Street</label>
                    <input
                      type='text'
                      placeholder={!editMode ? billingStreetAddress1 : ''}
                      value={editMode ? billingStreetAddress1 : ''}
                      onChange={(e) => setBillingStreetAddress1(e.target.value)}
                      className='user-info-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>City</label>
                    <input
                      type='text'
                      placeholder={!editMode ? billingCityAddress1 : ''}
                      value={editMode ? billingCityAddress1 : ''}
                      onChange={(e) => setBillingCityAddress1(e.target.value)}
                      className='user-info-input'
                    />
                  </div>
                  <div className='user-infos'>
                    <div className='user-info state'>
                      <label className='user-info-label'>State</label>
                      <Select
                        options={usStates}
                        placeholder={!editMode ? billingStateAddress1 : ''}
                        value={editMode ? billingStateAddress1 : ''}
                        onChange={(e) => setBillingStateAddress1(e.target.value)}
                        styles={selectStyling}
                      />
                    </div>
                    <div className='user-info zip'>
                      <label className='user-info-label'>Zip code</label>
                      <input
                        type='text'
                        placeholder={!editMode ? billingZipCodeAddress1 : ''}
                        value={editMode ? billingZipCodeAddress1 : ''}
                        onChange={(e) => setBillingZipCodeAddress1(e.target.value)}
                        className='user-info-input'
                      />
                    </div>
                  </div>
                  <div className='user-profile-buttons'>
                    <button className='CTA-button-one' type='button' onClick={handleSaveChanges}>Save</button>
                    <button className='CTA-button-two' type='button' onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                  <div className='status-message'>{statusMessage}</div>
                </form>
              ) : (
                <div className='user-info-form'>
                  {(cardNumber1 === '') ? (
                    <div className='user-profile-buttons'>
                      <button className='CTA-button-one' type='button' onClick={() => setEditMode(true)}>Add payment method</button>
                    </div>
                  ) : (
                    <form>
                      <h3 className='user-profile-payment'>Payment method 1</h3>
                      <div className='user-info'>
                        <label className='user-info-label'>Card type</label>
                        <Select
                          options={cardTypeOptions}
                          placeholder={!editMode ? cardType1 : ''}
                          value={cardTypeOptions.find((option) => option.value === cardType1)}
                          isDisabled={!editMode}
                          styles={selectStyling}
                        />
                      </div>
                      <div className='user-infos'>
                        <div className='user-info card-num'>
                          <label className='user-info-label'>Card number</label>
                          <input
                            type='text'
                            placeholder={!editMode ? cardNumber1 : ''}
                            value={editMode ? cardNumber1 : ''}
                            disabled={!editMode}
                            className='user-info-input disabled-input'
                          />
                        </div>
                        <div className='user-info exp-date'>
                          <label className='user-info-label'>Exp. date</label>
                          <input
                            type='text'
                            placeholder={!editMode ? expirationDate1 : ''}
                            value={editMode ? expirationDate1 : ''}
                            disabled={!editMode}
                            className='user-info-input disabled-input'
                          />
                        </div>
                      </div>
                      <h3 className='user-profile-billing'>Billing address</h3>
                      <div className='user-info'>
                        <label className='user-info-label'>Street</label>
                        <input
                          type='text'
                          placeholder={!editMode ? billingStreetAddress1 : ''}
                          value={editMode ? billingStreetAddress1 : ''}
                          disabled={!editMode}
                          className='user-info-input disabled-input'
                        />
                      </div>
                      <div className='user-info'>
                        <label className='user-info-label'>City</label>
                        <input
                          type='text'
                          placeholder={!editMode ? billingCityAddress1 : ''}
                          value={editMode ? billingCityAddress1 : ''}
                          disabled={!editMode}
                          className='user-info-input disabled-input'
                        />
                      </div>
                      <div className='user-infos'>
                        <div className='user-info state'>
                          <label className='user-info-label'>State</label>
                          <Select
                            options={usStates}
                            placeholder={!editMode ? billingStateAddress1 : ''}
                            value={editMode ? billingStateAddress1 : ''}
                            isDisabled={!editMode}
                            styles={selectStyling}
                          />
                        </div>
                        <div className='user-info zip'>
                          <label className='user-info-label'>Zip code</label>
                          <input
                            type='text'
                            placeholder={!editMode ? billingZipCodeAddress1 : ''}
                            value={editMode ? billingZipCodeAddress1 : ''}
                            disabled={!editMode}
                            className='user-info-input disabled-input'
                          />
                        </div>
                      </div>
                      <div className='user-profile-buttons'>
                        <button className='CTA-button-one' type='button' onClick={() => setEditMode(true)}>Edit</button>
                      </div>
                      <div className='status-message'>{statusMessage}</div>
                    </form>
                  )}
                </div>
              )}
              {(cardNumber1 !== '') ? (
                <div className='user-info-form'>
                  {editMode2 ? (
                    <form className='user-info-form'>
                      <h3 className='user-profile-payment'>Payment method 2</h3>
                      <div className='user-info'>
                        <label className='user-info-label'>Card type</label>
                        <Select
                          options={cardTypeOptions}
                          placeholder={!editMode2 ? cardType2 : ''}
                          value={cardTypeOptions.find((option) => option.value === cardType2)}
                          onChange={(selectedOption) => setCardType2(selectedOption.value)}
                          styles={selectStyling}
                        />
                      </div>
                      <div className='user-infos'>
                        <div className='user-info card-num'>
                          <label className='user-info-label'>Card number</label>
                          <input
                            type='text'
                            placeholder={!editMode2 ? cardNumber2 : ''}
                            value={editMode2 ? cardNumber2 : ''}
                            onChange={(e) => setCardNumber2(e.target.value)}
                            className='user-info-input'
                          />
                        </div>
                        <div className='user-info exp-date'>
                          <label className='user-info-label'>Exp. date</label>
                          <input
                            type='text'
                            placeholder={!editMode2 ? expirationDate2 : ''}
                            value={editMode2 ? expirationDate2 : ''}
                            onChange={(e) => setExpirationDate2(e.target.value)}
                            className='user-info-input'
                          />
                        </div>
                      </div>
                      <h3 className='user-profile-billing'>Billing address</h3>
                      <div className='user-info'>
                        <label className='user-info-label'>Street</label>
                        <input
                          type='text'
                          placeholder={!editMode2 ? billingStreetAddress2 : ''}
                          value={editMode2 ? billingStreetAddress2 : ''}
                          onChange={(e) => setBillingStreetAddress2(e.target.value)}
                          className='user-info-input'
                        />
                      </div>
                      <div className='user-info'>
                        <label className='user-info-label'>City</label>
                        <input
                          type='text'
                          placeholder={!editMode2 ? billingCityAddress2 : ''}
                          value={editMode2 ? billingCityAddress2 : ''}
                          onChange={(e) => setBillingCityAddress2(e.target.value)}
                          className='user-info-input'
                        />
                      </div>
                      <div className='user-infos'>
                        <div className='user-info state'>
                          <label className='user-info-label'>State</label>
                          <Select
                            options={usStates}
                            placeholder={!editMode2 ? billingStateAddress2 : ''}
                            value={editMode2 ? billingStateAddress2 : ''}
                            onChange={(e) => setBillingStateAddress2(e.target.value)}
                            styles={selectStyling}
                          />
                        </div>
                        <div className='user-info zip'>
                          <label className='user-info-label'>Zip code</label>
                          <input
                            type='text'
                            placeholder={!editMode2 ? billingZipCodeAddress2 : ''}
                            value={editMode2 ? billingZipCodeAddress2 : ''}
                            onChange={(e) => setBillingZipCodeAddress2(e.target.value)}
                            className='user-info-input'
                          />
                        </div>
                      </div>
                      <div className='user-profile-buttons'>
                        <button className='CTA-button-one' type='button' onClick={handleSaveChanges}>Save</button>
                        <button className='CTA-button-two' type='button' onClick={() => setEditMode2(false)}>Cancel</button>
                      </div>
                      <div className='status-message'>{statusMessage2}</div>
                    </form>
                  ) : (
                    <div className='user-info-form'>
                      {(cardNumber2 === '') ? (
                        <div className='user-profile-buttons add-payment-button'>
                          <button className='CTA-button-one' type='button' onClick={() => setEditMode2(true)}>Add payment method</button>
                        </div>
                      ) : (
                        <form>
                          <h3 className='user-profile-payment'>Payment method 2</h3>
                          <div className='user-info'>
                            <label className='user-info-label'>Card type</label>
                            <Select
                              options={cardTypeOptions}
                              placeholder={!editMode2 ? cardType2 : ''}
                              value={cardTypeOptions.find((option) => option.value === cardType2)}
                              isDisabled={!editMode2}
                              styles={selectStyling}
                            />
                          </div>
                          <div className='user-infos'>
                            <div className='user-info card-num'>
                              <label className='user-info-label'>Card number</label>
                              <input
                                type='text'
                                placeholder={!editMode2 ? cardNumber2 : ''}
                                value={editMode2 ? cardNumber2 : ''}
                                disabled={!editMode2}
                                className='user-info-input disabled-input'
                              />
                            </div>
                            <div className='user-info exp-date'>
                              <label className='user-info-label'>Exp. date</label>
                              <input
                                type='text'
                                placeholder={!editMode2 ? expirationDate2 : ''}
                                value={editMode2 ? expirationDate2 : ''}
                                disabled={!editMode2}
                                className='user-info-input disabled-input'
                              />
                            </div>
                          </div>
                          <h3 className='user-profile-billing'>Billing address</h3>
                          <div className='user-info'>
                            <label className='user-info-label'>Street</label>
                            <input
                              type='text'
                              placeholder={!editMode2 ? billingStreetAddress2 : ''}
                              value={editMode2 ? billingStreetAddress2 : ''}
                              disabled={!editMode2}
                              className='user-info-input disabled-input'
                            />
                          </div>
                          <div className='user-info'>
                            <label className='user-info-label'>City</label>
                            <input
                              type='text'
                              placeholder={!editMode2 ? billingCityAddress2 : ''}
                              value={editMode2 ? billingCityAddress2 : ''}
                              disabled={!editMode2}
                              className='user-info-input disabled-input'
                            />
                          </div>
                          <div className='user-infos'>
                            <div className='user-info state'>
                              <label className='user-info-label'>State</label>
                              <Select
                                options={usStates}
                                placeholder={!editMode2 ? billingStateAddress2 : ''}
                                value={editMode2 ? billingStateAddress2 : ''}
                                isDisabled={!editMode2}
                                styles={selectStyling}
                              />
                            </div>
                            <div className='user-info zip'>
                              <label className='user-info-label'>Zip code</label>
                              <input
                                type='text'
                                placeholder={!editMode2 ? billingZipCodeAddress2 : ''}
                                value={editMode2 ? billingZipCodeAddress2 : ''}
                                disabled={!editMode2}
                                className='user-info-input disabled-input'
                              />
                            </div>
                          </div>
                          <div className='user-profile-buttons'>
                            <button className='CTA-button-one' type='button' onClick={() => setEditMode2(true)}>Edit</button>
                          </div>
                          <div className='status-message'>{statusMessage2}</div>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                null
              )}
              {(cardNumber1 !== '' && cardNumber2 !== '') ? (
                <div className='user-info-form'>
                  {editMode3 ? (
                    <form className='user-info-form'>
                      <h3 className='user-profile-payment'>Payment method 3</h3>
                      <div className='user-info'>
                        <label className='user-info-label'>Card type</label>
                        <Select
                          options={cardTypeOptions}
                          placeholder={!editMode3 ? cardType3 : ''}
                          value={cardTypeOptions.find((option) => option.value === cardType3)}
                          onChange={(selectedOption) => setCardType3(selectedOption.value)}
                          styles={selectStyling}
                        />
                      </div>
                      <div className='user-infos'>
                        <div className='user-info card-num'>
                          <label className='user-info-label'>Card number</label>
                          <input
                            type='text'
                            placeholder={!editMode3 ? cardNumber3 : ''}
                            value={editMode3 ? cardNumber3 : ''}
                            onChange={(e) => setCardNumber3(e.target.value)}
                            className='user-info-input'
                          />
                        </div>
                        <div className='user-info exp-date'>
                          <label className='user-info-label'>Exp. date</label>
                          <input
                            type='text'
                            placeholder={!editMode3 ? expirationDate3 : ''}
                            value={editMode3 ? expirationDate3 : ''}
                            onChange={(e) => setExpirationDate3(e.target.value)}
                            className='user-info-input'
                          />
                        </div>
                      </div>
                      <h3 className='user-profile-billing'>Billing address</h3>
                      <div className='user-info'>
                        <label className='user-info-label'>Street</label>
                        <input
                          type='text'
                          placeholder={!editMode3 ? billingStreetAddress3 : ''}
                          value={editMode3 ? billingStreetAddress3 : ''}
                          onChange={(e) => setBillingStreetAddress3(e.target.value)}
                          className='user-info-input'
                        />
                      </div>
                      <div className='user-info'>
                        <label className='user-info-label'>City</label>
                        <input
                          type='text'
                          placeholder={!editMode3 ? billingCityAddress3 : ''}
                          value={editMode3 ? billingCityAddress3 : ''}
                          onChange={(e) => setBillingCityAddress3(e.target.value)}
                          className='user-info-input'
                        />
                      </div>
                      <div className='user-infos'>
                        <div className='user-info state'>
                          <label className='user-info-label'>State</label>
                          <Select
                            options={usStates}
                            placeholder={!editMode3 ? billingStateAddress3 : ''}
                            value={editMode3 ? billingStateAddress3 : ''}
                            onChange={(e) => setBillingStateAddress3(e.target.value)}
                            styles={selectStyling}
                          />
                        </div>
                        <div className='user-info zip'>
                          <label className='user-info-label'>Zip code</label>
                          <input
                            type='text'
                            placeholder={!editMode3 ? billingZipCodeAddress3 : ''}
                            value={editMode3 ? billingZipCodeAddress3 : ''}
                            onChange={(e) => setBillingZipCodeAddress3(e.target.value)}
                            className='user-info-input'
                          />
                        </div>
                      </div>
                      <div className='user-profile-buttons'>
                        <button className='CTA-button-one' type='button' onClick={handleSaveChanges}>Save</button>
                        <button className='CTA-button-two' type='button' onClick={() => setEditMode3(false)}>Cancel</button>
                      </div>
                      <div className='status-message'>{statusMessage3}</div>
                    </form>
                  ) : (
                    <div className='user-info-form'>
                      {(cardNumber3 === '') ? (
                        <div className='user-profile-buttons add-payment-button'>
                          <button className='CTA-button-one' type='button' onClick={() => setEditMode3(true)}>Add payment method</button>
                        </div>
                      ) : (
                        <form>
                          <h3 className='user-profile-payment'>Payment method 3</h3>
                          <div className='user-info'>
                            <label className='user-info-label'>Card type</label>
                            <Select
                              options={cardTypeOptions}
                              placeholder={!editMode3 ? cardType3 : ''}
                              value={cardTypeOptions.find((option) => option.value === cardType3)}
                              isDisabled={!editMode3}
                              styles={selectStyling}
                            />
                          </div>
                          <div className='user-infos'>
                            <div className='user-info card-num'>
                              <label className='user-info-label'>Card number</label>
                              <input
                                type='text'
                                placeholder={!editMode3 ? cardNumber3 : ''}
                                value={editMode3 ? cardNumber3 : ''}
                                disabled={!editMode3}
                                className='user-info-input disabled-input'
                              />
                            </div>
                            <div className='user-info exp-date'>
                              <label className='user-info-label'>Exp. date</label>
                              <input
                                type='text'
                                placeholder={!editMode3 ? expirationDate3 : ''}
                                value={editMode3 ? expirationDate3 : ''}
                                disabled={!editMode3}
                                className='user-info-input disabled-input'
                              />
                            </div>
                          </div>
                          <h3 className='user-profile-billing'>Billing address</h3>
                          <div className='user-info'>
                            <label className='user-info-label'>Street</label>
                            <input
                              type='text'
                              placeholder={!editMode3 ? billingStreetAddress3 : ''}
                              value={editMode3 ? billingStreetAddress3 : ''}
                              disabled={!editMode3}
                              className='user-info-input disabled-input'
                            />
                          </div>
                          <div className='user-info'>
                            <label className='user-info-label'>City</label>
                            <input
                              type='text'
                              placeholder={!editMode3 ? billingCityAddress3 : ''}
                              value={editMode3 ? billingCityAddress3 : ''}
                              disabled={!editMode3}
                              className='user-info-input disabled-input'
                            />
                          </div>
                          <div className='user-infos'>
                            <div className='user-info state'>
                              <label className='user-info-label'>State</label>
                              <Select
                                options={usStates}
                                placeholder={!editMode3 ? billingStateAddress3 : ''}
                                value={editMode3 ? billingStateAddress3 : ''}
                                isDisabled={!editMode3}
                                styles={selectStyling}
                              />
                            </div>
                            <div className='user-info zip'>
                              <label className='user-info-label'>Zip code</label>
                              <input
                                type='text'
                                placeholder={!editMode3 ? billingZipCodeAddress3 : ''}
                                value={editMode3 ? billingZipCodeAddress3 : ''}
                                disabled={!editMode3}
                                className='user-info-input disabled-input'
                              />
                            </div>
                          </div>
                          <div className='user-profile-buttons'>
                            <button className='CTA-button-one' type='button' onClick={() => setEditMode3(true)}>Edit</button>
                          </div>
                          <div className='status-message'>{statusMessage3}</div>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                null
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default UserProfile;