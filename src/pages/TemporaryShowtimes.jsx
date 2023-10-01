import { Link } from 'react-router-dom';
import '../stylings/temporary.css';

const TemporaryShowtimes = () => {
  return (
    <section className='temporary section-wrapper'>
        <div className='section-container-narrow'>
            <h2>Select the date and time</h2>
            <p>No dates available</p>
            <Link to='../seats'><button className='CTA-button-one'>Next</button></Link>
        </div>
    </section>
  )
}

export default TemporaryShowtimes;