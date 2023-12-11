import { Link } from 'react-router-dom';
import '../stylings/booking.css';

const AdminView = () => {
  return (
    <section className='booking section-wrapper'>
        <div className='section-container-narrow'>
            <h2>Admin view</h2>
            <Link to='manage-movies'><button className='CTA-button-one'>Manage movies</button></Link>
            <Link to='manage-promotions'><button className='CTA-button-one'>Manage promotions</button></Link>
            <Link to='manage-users'><button className='CTA-button-one'>Manage users</button></Link>
        </div>
    </section>
  )
}

export default AdminView;