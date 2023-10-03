import { Link } from 'react-router-dom';
import '../stylings/account.css';

const SignUpPaymentInfo = () => {
  return (
    <section className='payment-info account section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Enter payment information</h2>
        <form className='user-info-form'>
          <div className='user-info'>
            <label className='user-info-label'>Card type</label>
            <input type='text' className='user-info-input' />
          </div>
          <div className='user-infos'>
            <div className='user-info'>
              <label className='user-info-label'>Card number</label>
              <input type='text' className='user-info-input' />
            </div>
            <div className='user-info'>
              <label className='user-info-label'>Expiration date</label>
              <input type='text' className='user-info-input' />
            </div>
          </div>
        </form>
        <form className='user-info-form'>
          <h3>Billing address</h3>
          <div className='user-info'>
            <label className='user-info-label'>Street</label>
            <input type='text' className='user-info-input' />
          </div>
          <div className='user-info'>
            <label className='user-info-label'>City</label>
            <input type='text' className='user-info-input' />
          </div>
          <div className='user-infos'>
            <div className='user-info'>
              <label className='user-info-label'>State</label>
              <input type='text' className='user-info-input' />
            </div>
            <div className='user-info'>
              <label className='user-info-label'>Zip code</label>
              <input type='text' className='user-info-input' />
            </div>
          </div>
          <button className='user-info-option'>Use shipping address</button>
        </form>
        <div className='user-info-CTA-button'>
          <Link to='../verification'><button className='CTA-button-two'>Skip</button></Link>
          <Link to='../verification'><button className='CTA-button-one'>Next</button></Link>
        </div>
      </div>
    </section>
  )
}

export default SignUpPaymentInfo;