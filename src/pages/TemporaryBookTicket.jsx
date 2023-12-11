import { Link } from 'react-router-dom';
import '../stylings/temporary.css';

const TemporaryBookTicket = () => {
  return (
    <section className='temporary section-wrapper'>
        <div className='section-container-narrow'>
            <h2>Select a movie</h2>
            <p>No movies yet</p>
            <Link to='showtimes'><button className='CTA-button-one'>Next</button></Link>
        </div>
    </section>
  )
}

export default TemporaryBookTicket;