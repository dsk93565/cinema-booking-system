import { Link } from 'react-router-dom';
import '../stylings/temporary.css';

const TemporaryOrderSummary = () => {
  return (
    <section className='order temporary section-wrapper'>
        <div className='section-container-narrow'>
            <h2>Cart</h2>
            <p>No tickets are in your cart</p>
            <div className='user-info'>
                <label className='user-info-label'>Promo code</label>
                <input type='text' className='user-info-input' />
            </div>
            <button className='CTA-button-two'>Apply promo code</button>
            <h3>Subtotal</h3>
            <p>$0.00</p>
            <Link to='checkout'><button className='CTA-button-one'>Checkout</button></Link>
        </div>
    </section>
  )
}

export default TemporaryOrderSummary;