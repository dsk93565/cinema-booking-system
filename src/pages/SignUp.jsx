import { Link } from 'react-router-dom';
import '../stylings/account.css';

const SignUp = () => {
  return (
    <section className='sign-up account section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Create an account</h2>
        <form className='user-info-form'>
          <div className='user-infos'>
            <div className='user-info'>
              <label className='user-info-label'>First name</label>
              <input type='text' className='user-info-input' />
            </div>
            <div className='user-info'>
              <label className='user-info-label'>Last name</label>
              <input type='text' className='user-info-input' />
            </div>
          </div>
          <div className='user-info'>
            <label className='user-info-label'>Email</label>
            <input type='email' className='user-info-input' />
          </div>
          <div className='user-info'>
            <label className='user-info-label'>Mobile number</label>
            <input type='tel' className='user-info-input' />
          </div>
          <div className='user-info'>
            <label className='user-info-label'>Password</label>
            <input type='password' className='user-info-input' />
          </div>
        </form>
        <div className='user-info-CTA-button'>
          <Link to='shipping-address'><button className='CTA-button-one'>Next</button></Link>
        </div>
      </div>
    </section>
  )
}

export default SignUp;