import '../stylings/temporary.css';

const TemporaryManageUsers = () => {
  return (
    <section className='temporary section-wrapper'>
        <div className='section-container-narrow'>
            <h2>Manage users</h2>
            <p>No users</p>
            <button className='CTA-button-one'>Add user</button>
            <button className='CTA-button-one'>Time out user</button>
            <button className='CTA-button-one'>Delete user</button>
        </div>
    </section>
  )
}

export default TemporaryManageUsers;