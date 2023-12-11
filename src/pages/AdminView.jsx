import { Link } from 'react-router-dom';
import '../stylings/admin.css';

const AdminView = () => {
  return (
    <section className='booking section-wrapper'>
        <div className='section-container-narrow'>
            <div className='admin-view-title'><h2>Admin view</h2></div>
            <Link to='manage-movies'><button className='admin-view-button'>Manage movies</button></Link>
            <Link to='manage-promotions'><button className='admin-view-button'>Manage promotions</button></Link>
            <Link to='manage-users'><button className='admin-view-button'>Manage users</button></Link>
        </div>
    </section>
  )
}

export default AdminView;