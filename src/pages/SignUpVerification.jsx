import { Link } from 'react-router-dom';
import '../stylings/account.css';

const SignUpVerification = () => {
  return (
    <section className='verification account section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Verification code sent</h2>
        <p>Please check your email and enter the code down below to confirm your account</p>
        <div className='verification-code'>
          <input type='text' className='verification-number' />
          <input type='text' className='verification-number' />
          <input type='text' className='verification-number' />
          <input type='text' className='verification-number' />
          <input type='text' className='verification-number' />
        </div>
        <Link to='../confirmation'><button className='CTA-button-one'>Confirm account</button></Link>
      </div>
    </section>
  )
}

export default SignUpVerification;