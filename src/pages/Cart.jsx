import { Link } from 'react-router-dom';
import '../stylings/booking.css';

const Cart = () => {
  return (
    <section className='order temporary section-wrapper'>
        <div className='section-container-narrow'>
            <h2>Cart</h2>
            <p>No tickets are in your cart</p>
            <Link to='checkout'><button className='CTA-button-one'>Checkout</button></Link>
        </div>
    </section>
  )
}

export default Cart;