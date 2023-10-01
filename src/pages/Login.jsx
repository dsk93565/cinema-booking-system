import { Link } from 'react-router-dom';
import '../stylings/account.css';

const Login = () => {
  return (
    <section className='login account section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Log in to your account</h2>
        <form className='user-info-form'>
          <div className='user-info'>
            <label className='user-info-label'>Email</label>
            <input type='email' className='user-info-input' />
          </div>
          <div className='user-info'>
            <label className='user-info-label'>Password</label>
            <input type='password' className='user-info-input' />
          </div>
          <Link to='forgot'><button className='user-info-option'>Forgot password</button></Link>
        </form>
        <Link to='/'><button className='CTA-button-one'>Log in</button></Link>
      </div>
    </section>
  )
}

export default Login;