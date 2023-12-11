import { Link } from 'react-router-dom';
import '../stylings/temporary.css';

const Seats = () => {
  return (
    <section className='temporary section-wrapper'>
        <div className='section-container-narrow'>
            <h2>Select your seats</h2>
            <p>No seats available</p>
            <Link to='../age'><button className='CTA-button-one'>Next</button></Link>
        </div>
    </section>
  )
}

export default Seats;