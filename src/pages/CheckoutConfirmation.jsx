import { Link } from 'react-router-dom';
import '../stylings/booking.css';

const CheckoutConfirmation = () => {
  return (
    <section className='order temporary section-wrapper'>
        <div className='section-container-narrow'>
            <h2>Order confirmed</h2>
            <p>Congratulations! Your order has been placed. Jump back in to search for more movies.</p>
            <Link to='/'><button className='CTA-button-one'>Browse Cinera</button></Link>
        </div>
    </section>
  )
}

export default CheckoutConfirmation;