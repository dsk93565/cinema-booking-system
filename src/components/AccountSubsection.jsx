import { useEffect, useState } from 'react';

const AccountSubsection = ({name}) => {

    const [Vis, setVis] = useState(false);
    const handleToggleSection = (e) => {
        e.preventDefault();
        setVis(!Vis);
    };
      
    if (name === 'shipping-info') {
        return (
            <div className='section-holder'>
            <button className="user-info-option" onClick={handleToggleSection}>
                Add Shipping Information
            </button>
            {Vis && (
                <div className='subsection'>
                    <div className='user-info'>
                        <label className='user-info-label'>Address Line One</label>
                        <input type='text' placeholder='123 Placehold Lane' className='user-info-input' />
                    </div>

                    <div className='user-info'>
                        <label className='user-info-label'>Address Line Two</label>
                        <input type='text' placeholder='Apt 2' className='user-info-input' />
                    </div>

                    <div className='user-infos'>
                        <div className='user-info'>
                            <label className='user-info-label'>State</label>
                            <input type='text' placeholder='GA' className='user-info-input' />
                        </div>
                        <div className='user-info'>
                            <label className='user-info-label'>Zip Code</label>
                            <input type='text' placeholder='12345' className='user-info-input' />
                        </div>
                    </div>
                {/* subsection */}</div> 
            )}
            </div>
        );
    } else if (name === 'payment-info') {
        return (
            <div className='section-holder'>
            <button className="user-info-option" onClick={handleToggleSection}>
                Add Payment Information
            </button>
            {Vis && (
                <div className='subsection'>

                    <div className='user-info'>
                        <label className='user-info-label'>Name on Card</label>
                        <input type='text' placeholder='Bob Cardholder' className='user-info-input' />
                    </div>
                
                    <div className='user-info'>
                        <label className='user-info-label'>Credit Card Number</label>
                        <input type='text' placeholder='1234 4567 8910 1112' className='user-info-input' />
                    </div>

                    <div className='user-infos'>
                        <div className='user-info'>
                            <label className='user-info-label'>CV</label>
                            <input type='text' placeholder='707' className='user-info-input' />
                        </div>
                        <div className='user-info'>
                            <label className='user-info-label'>Zip Code</label>
                            <input type='text' placeholder='12345' className='user-info-input' />
                        </div>
                    </div>
                {/* subsection */}</div> 
            )}
            </div>
        );
    }
    
  }
  
  export default AccountSubsection;