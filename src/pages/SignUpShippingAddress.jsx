import { Link } from 'react-router-dom';
import '../stylings/account.css';

const SignUpShippingAddress = () => {
  return (
    <section className='shipping-address account section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Enter shipping address</h2>
        <form className='user-info-form'>
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
        </form>
        <div className='user-info-CTA'>
          <Link to='../payment-info'><button className='CTA-button-two'>Skip</button></Link>
          <Link to='../payment-info'><button className='CTA-button-one'>Next</button></Link>
        </div>
      </div>
    </section>
  )
}

export default SignUpShippingAddress;