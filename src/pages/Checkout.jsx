import { Link } from 'react-router-dom';
import '../stylings/booking.css';

const Checkout = () => {
  return (
    <section className='order temporary section-wrapper'>
        <div className='section-container-narrow'>
            <h2>Checkout</h2>
            <p>Empty</p>
            <div className='user-info'>
                <label className='user-info-label'>Promo code</label>
                <input type='text' className='user-info-input' />
            </div>
            <button className='CTA-button-two'>Apply promo code</button>
            <button className='user-info-option'>Add payment method</button>
            <h3>Subtotal</h3>
            <p>$0.00</p>
            <Link to='../confirmation'><button className='CTA-button-one'>Place order</button></Link>
        </div>
    </section>
  )
}

export default Checkout;