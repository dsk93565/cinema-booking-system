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
    setProfilePage(page);
  };

  // Edit Functionalties
  const [editMode, setEditMode] = useState(false);
  const [editMode2, setEditMode2] = useState(false);
  const [editMode3, setEditMode3] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

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
        setPasswordCurrent(response.data.user.password);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'Error fetching user data');
      }
    };

    fetchUserData();
  }, [userToken]);

  const handleSaveChanges = async () => {
    try {
      if (passwordNew === passwordCurrent) {
        const response = await axios.post('http://localhost:8000/api/edit-user', {
          user_token: localStorage.getItem('userToken'),
          first_name: firstName,
          last_name: lastName,
          phone_number: mobileNumber,
          password: passwordNew,
        });
        setEditMode(false);
        setStatusMessage('Changes saved successfully');
      } else {
        setStatusMessage('Current password is incorrect');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Error saving changes');
    }
  };

  if (error) {
    return alert('Error: ' + error);
  } // if

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
                <div className='user-info-form user-basic-info'>
                  <div className='user-infos'>
                    <div className='user-info'>
                      <label className='user-info-label'>First name</label>
                      <input
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className='user-info-input'
                      />
                    </div>
                    <div className='user-info'>
                      <label className='user-info-label'>Last name</label>
                      <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className='user-info-input'
                      />
                    </div>
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>Mobile number</label>
                    <input
                      type='text'
                      value={mobileNumber}
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
                      placeholder={passwordCurrent ? Array(passwordCurrent.length + 1).join('*') : ''}
                      onChange={(e) => setPasswordCurrent(e.target.value)}
                      className='user-info-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>New password</label>
                    <input
                      type='password'
                      onChange={(e) => setPasswordNew(e.target.value)}
                      className='user-info-input'
                    />
                  </div>
                  <div className='user-profile-buttons'>
                    <button className='CTA-button-one' onClick={handleSaveChanges}>Save</button>
                    <button className='CTA-button-two' onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                  <div className='status-message'>{statusMessage}</div>
                </div>
              ) : (
                <div className='user-info-form user-basic-info'>
                  <div className='user-infos'>
                    <div className='user-info'>
                      <label className='user-info-label'>First name</label>
                      <input
                        type='text'
                        placeholder={firstName}
                        disabled={!editMode}
                        className='user-info-input disabled-input'
                      />
                    </div>
                    <div className='user-info'>
                      <label className='user-info-label'>Last name</label>
                      <input
                        type='text'
                        placeholder={lastName}
                        disabled={!editMode}
                        className='user-info-input disabled-input'
                      />
                    </div>
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>Mobile number</label>
                    <input
                      type='text'
                      placeholder={mobileNumber}
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
                      placeholder={passwordCurrent ? Array(passwordCurrent.length + 1).join('*') : ''}
                      disabled={!editMode}
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-profile-buttons'>
                    <button className='CTA-button-one' onClick={() => setEditMode(true)}>Edit</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Shipping Information */}
          {profilePage === 'shipping' && (
            <div className='user-profile-page'>
              {editMode ? (
                <div className='user-info-form user-shipping-info'>
                  <div className='user-info'>
                    <label className='user-info-label'>Street</label>
                    <input
                      type='text'
                      value={shippingStreetAddress}
                      onChange={(e) => setShippingStreetAddress(e.target.value)}
                      className='user-info-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>City</label>
                    <input
                      type='text'
                      value={shippingCityAddress}
                      onChange={(e) => setShippingCityAddress(e.target.value)}
                      className='user-info-input'
                    />
                  </div>
                  <div className='user-infos'>
                    <div className='user-info state'>
                      <label className='user-info-label'>State</label>
                      <Select
                        options={usStates}
                        value={usStates.find((state) => state.value === shippingStateAddress)}
                        onChange={(selectedOption) => setShippingStateAddress(selectedOption.value)}
                        styles={selectStyling}
                      />
                    </div>
                    <div className='user-info zip'>
                      <label className='user-info-label'>Zip code</label>
                      <input
                        type='text'
                        value={shippingZipCodeAddress}
                        onChange={(e) => setShippingZipCodeAddress(e.target.value)}
                        className='user-info-input'
                      />
                    </div>
                  </div>
                  <div className='user-profile-buttons'>
                    <button className='CTA-button-one' onClick={handleSaveChanges}>Save</button>
                    <button className='CTA-button-two' onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className='user-info-form user-shipping-info'>
                  <div className='user-info'>
                    <label className='user-info-label'>Street</label>
                    <input
                      type='text'
                      placeholder={shippingStreetAddress}
                      disabled={!editMode}
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>City</label>
                    <input
                      type='text'
                      placeholder={shippingCityAddress}
                      disabled={!editMode}
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-infos state'>
                    <div className='user-info'>
                      <label className='user-info-label'>State</label>
                      <Select
                        options={usStates}
                        placeholder={shippingStateAddress}
                        isDisabled={!editMode}
                        styles={selectStyling}
                      />
                    </div>
                    <div className='user-info zip'>
                      <label className='user-info-label'>Zip code</label>
                      <input
                        type='text'
                        placeholder={shippingZipCodeAddress}
                        disabled={!editMode}
                        className='user-info-input disabled-input'
                      />
                    </div>
                  </div>
                  {(shippingStreetAddress === '') ? (
                    <div className='user-profile-buttons'>
                      <button className='CTA-button-one' onClick={() => setEditMode(true)}>Add</button>
                    </div>
                  ) : (
                    <div className='user-profile-buttons'>
                      <button className='CTA-button-one' onClick={() => setEditMode(true)}>Edit</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Payment Information */}
          {profilePage === 'payment' && (
            <div className='user-profile-page user-payments-info'>
              {editMode ? (
                <div className='user-info-form'>
                </div>
              ) : (
                <div className='user-info-form'>
                  <h3 className='user-profile-payment'>Payment method 1</h3>
                  <div className='user-info'>
                    <label className='user-info-label'>Card type</label>
                    <Select
                      options={cardTypeOptions}
                      placeholder={billingStreetAddress1}
                      isDisabled={!editMode}
                      styles={selectStyling}
                    />
                  </div>
                  <div className='user-infos'>
                    <div className='user-info card-num'>
                      <label className='user-info-label'>Card number</label>
                      <input
                        type='text'
                        placeholder={cardNumber1}
                        disabled={!editMode}
                        className='user-info-input disabled-input'
                      />
                    </div>
                    <div className='user-info exp-date'>
                      <label className='user-info-label'>Exp. date</label>
                      <input
                        type='text'
                        placeholder={expirationDate1}
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
                      placeholder={billingStreetAddress1}
                      disabled={!editMode}
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>City</label>
                    <input
                      type='text'
                      placeholder={billingCityAddress1}
                      disabled={!editMode}
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-infos state'>
                    <div className='user-info'>
                      <label className='user-info-label'>State</label>
                      <Select
                        options={usStates}
                        placeholder={billingStateAddress1}
                        isDisabled={!editMode}
                        styles={selectStyling}
                      />
                    </div>
                    <div className='user-info zip'>
                      <label className='user-info-label'>Zip code</label>
                      <input
                        type='text'
                        placeholder={billingZipCodeAddress1}
                        disabled={!editMode}
                        className='user-info-input disabled-input'
                      />
                    </div>
                  </div>
                  {(billingStreetAddress1 === '') ? (
                    <div className='user-profile-buttons'>
                      <button className='CTA-button-one' onClick={() => setEditMode(true)}>Add</button>
                    </div>
                  ) : (
                    <div className='user-profile-buttons'>
                      <button className='CTA-button-one' onClick={() => setEditMode(true)}>Edit</button>
                    </div>
                  )}
                </div>
              )}
              {editMode2 ? (
                <div className='user-info-form'>
                </div>
              ) : (
                <div className='user-info-form'>
                  <h3 className='user-profile-payment'>Payment method 2</h3>
                  <div className='user-info'>
                    <label className='user-info-label'>Card type</label>
                    <Select
                    options={cardTypeOptions}
                    placeholder={billingStreetAddress2}
                    isDisabled={!editMode2}
                    styles={selectStyling}
                    />
                  </div>
                  <div className='user-infos'>
                    <div className='user-info card-num'>
                      <label className='user-info-label'>Card number</label>
                      <input
                          type='text'
                          placeholder={cardNumber2}
                          disabled={!editMode2}
                          className='user-info-input disabled-input'
                      />
                    </div>
                    <div className='user-info exp-date'>
                      <label className='user-info-label'>Exp. date</label>
                      <input
                        type='text'
                        placeholder={expirationDate2}
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
                      placeholder={billingStreetAddress2}
                      disabled={!editMode2}
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>City</label>
                    <input
                      type='text'
                      placeholder={billingCityAddress2}
                      disabled={!editMode2}
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-infos state'>
                    <div className='user-info'>
                      <label className='user-info-label'>State</label>
                      <Select
                          options={usStates}
                          placeholder={billingStateAddress2}
                          isDisabled={!editMode2}
                          styles={selectStyling}
                      />
                    </div>
                    <div className='user-info zip'>
                      <label className='user-info-label'>Zip code</label>
                      <input
                        type='text'
                        placeholder={billingZipCodeAddress2}
                        disabled={!editMode2}
                        className='user-info-input disabled-input'
                      />
                    </div>
                  </div>
                  {(billingStreetAddress2 === '') ? (
                    <div className='user-profile-buttons'>
                      <button className='CTA-button-one' onClick={() => setEditMode2(true)}>Add</button>
                    </div>
                  ) : (
                    <div className='user-profile-buttons'>
                      <button className='CTA-button-one' onClick={() => setEditMode2(true)}>Edit</button>
                    </div>
                  )}
                </div>
              )}
              {editMode3 ? (
                <div className='user-info-form'>
                </div>
              ) : (
                <div className='user-info-form'>
                  <h3 className='user-profile-payment'>Payment method 3</h3>
                  <div className='user-info'>
                    <label className='user-info-label'>Card type</label>
                    <Select
                    options={cardTypeOptions}
                    placeholder={billingStreetAddress3}
                    isDisabled={!editMode3}
                    styles={selectStyling}
                    />
                  </div>
                  <div className='user-infos'>
                    <div className='user-info card-num'>
                      <label className='user-info-label'>Card number</label>
                      <input
                          type='text'
                          placeholder={cardNumber3}
                          disabled={!editMode3}
                          className='user-info-input disabled-input'
                      />
                    </div>
                    <div className='user-info exp-date'>
                      <label className='user-info-label'>Exp. date</label>
                      <input
                        type='text'
                        placeholder={expirationDate3}
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
                      placeholder={billingStreetAddress3}
                      disabled={!editMode3}
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-info'>
                    <label className='user-info-label'>City</label>
                    <input
                      type='text'
                      placeholder={billingCityAddress3}
                      disabled={!editMode3}
                      className='user-info-input disabled-input'
                    />
                  </div>
                  <div className='user-infos state'>
                    <div className='user-info'>
                      <label className='user-info-label'>State</label>
                      <Select
                          options={usStates}
                          placeholder={billingStateAddress3}
                          isDisabled={!editMode3}
                          styles={selectStyling}
                      />
                    </div>
                    <div className='user-info zip'>
                      <label className='user-info-label'>Zip code</label>
                      <input
                        type='text'
                        placeholder={billingZipCodeAddress3}
                        disabled={!editMode3}
                        className='user-info-input disabled-input'
                      />
                    </div>
                  </div>
                  {(billingStreetAddress3 === '') ? (
                    <div className='user-profile-buttons'>
                      <button className='CTA-button-one' onClick={() => setEditMode3(true)}>Add</button>
                    </div>
                  ) : (
                    <div className='user-profile-buttons'>
                      <button className='CTA-button-one' onClick={() => setEditMode3(true)}>Edit</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default UserProfile;