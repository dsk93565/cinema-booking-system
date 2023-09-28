import { Link } from 'react-router-dom';
import '../stylings/login.css';

const Login = () => {
  return (
    <section className='universal-section-container'>
        <div className='small-section-container'>
            <h2>Log in to your account</h2>
            <form className='user-info-form'>
                <div className='user-info'>
                    <label for='user-email' className='user-info-label'>Email</label>
                    <input type='text' placeholder='Email' id='user-email' className='user-info-input' />
                </div>
                <div className='user-info'>
                    <label for='user-password' className='user-info-label'>Password</label>
                    <input type='password' placeholder='Password' id='user-password' className='user-info-input' />
                    <Link to='forgot' className='vertical-link'><button className='sub-action-link'>Forgot password</button></Link>
                </div>
            </form>
            <Link to='/'><button className='CTA-form-button'>Continue</button></Link> {/* Still needs to be linked correctly */}
        </div>
    </section>
  )
}

export default Login;