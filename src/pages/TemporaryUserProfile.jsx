import { useState } from 'react';
import '../stylings/account.css';
import AccountSubsection from '../components/AccountSubsection';

const UserProfile = () => {
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
                    <div className='user-info-input'>*******************</div>
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