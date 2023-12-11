import { Link, useParams } from 'react-router-dom';
import '../stylings/temporary.css';

const Seats = () => {
  const { shid } = useParams();

  return (
    <section className='temporary section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Select your seats</h2>
        <p>Selected Show ID: {shid}</p>
        {/* Your seats selection UI goes here */}
        <Link to='/book/age'>
          <button className='CTA-button-one'>Next</button>
        </Link>
      </div>
    </section>
  );
};

export default Seats;