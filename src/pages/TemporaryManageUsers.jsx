import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../stylings/admin.css';

const TemporaryManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/get-users') // Replace with your actual API endpoint
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
      });
  }, []);

  const makeAdmin = userId => {
    axios.post('http://localhost:8000/api/admin/make-admin', { userId }) // Replace with your actual API endpoint
      .then(response => {
        console.log(response.data);
        // Optionally, refresh the user list or update the user's status in the state
      })
      .catch(error => console.error('Error making admin:', error));
  };

  const editUser = userId => {
    // Implement navigation to the edit user page, potentially using React Router
    // and pass the userId as a parameter or through state management
  };

  const suspendUser = userId => {
    axios.post('http://localhost:8000/api/admin/suspend-user', { userId }) // Replace with your actual API endpoint
      .then(response => {
        console.log(response.data);
        // Optionally, refresh the user list or update the user's status in the state
      })
      .catch(error => console.error('Error suspending user:', error));
  };

  return (
    <section className='temporary section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Manage Users</h2>
        {error && <p className="error">{error}</p>}
        {users.length ? (
          users.map(user => (
            <div key={user.id}>
              <p>{user.username} - {user.email}</p>
              <button onClick={() => makeAdmin(user.id)} className='admin-user-button'>Make Admin</button>
              <button onClick={() => editUser(user.id)} className='admin-user-button'>Edit User</button>
              <button onClick={() => suspendUser(user.id)} className='admin-user-button'>Suspend User</button>
            </div>
          ))
        ) : (
          <p>No users</p>
        )}
      </div>
    </section>
  );
}

export default TemporaryManageUsers;