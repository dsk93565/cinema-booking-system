import { Link } from 'react-router-dom';
import '../stylings/account.css';

const SignUpConfirmation = () => {
  return (
    <section className='confirmation account section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Account confirmed</h2>
        <p>Congratulations! Your account has been successfully created. Jump right in to explore the new era of cinema.</p>
        <Link to='/'><button className='CTA-button-one'>Browse Cinera</button></Link>
      </div>
    </section>
  )
}

export default SignUpConfirmation;