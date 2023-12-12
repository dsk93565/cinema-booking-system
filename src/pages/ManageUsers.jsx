import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../stylings/admin.css';
import { useNavigate, useLocation } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [uidAdmin, setUserToAdmin] = useState(0);
  const [uidSuspend, setUserToSuspend] = useState(0);
  const user_token = localStorage.getItem('userToken');
  const navigate = useNavigate();

  async function getUsers() {
    const adminData = {
      user_token: user_token
    };

    await axios.post('http://localhost:8000/api/admin/get-users', {
      body: JSON.stringify(adminData),
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000})
      .then(response => {
        setUsers(response.data);
        console.log("Users data", response.data);
      })
      .catch(error => {
        if (error.code === 'ECONNABORTED')
          console.error('Request timed out.');
        console.error('Error fetching users:', error);
        setError('Failed to load users');
      }).finally(() => {
        setIsLoading(false);
      });
  }

  // Initial Load
  useEffect(() => {
    getUsers();
  }, []);

  useEffect( () => {
    if (uidAdmin != 0) {

      const makeAdminData = {
        user_token: user_token,
        uid: uidSuspend,
        timeout: 5000
      }

      async function postAdmin() {
        await axios.post('http://localhost:8000/api/admin/make-admin', {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(makeAdminData)})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => console.error('Error making admin:', error));
      }
      postAdmin();
    }
  }, [uidAdmin]);

  const editUser = (userId) => {
    // Implement navigation to the edit user page, potentially using React Router
    // and pass the userId as a parameter or through state management
  };

  useEffect( () => {
    if (uidSuspend != 0) {
      async function postSuspend() {

        const suspendData = {
          user_token: user_token,
          uid: uidSuspend,
          timeout: 5000
        }

        await axios.post('http://localhost:8000/api/admin/suspend-user', {
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(suspendData)})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => console.error('Error suspending user:', error));
      }
      postSuspend();
      navigate('/admin');
    }
  }, [uidSuspend]);

  return (
    <section className='temporary section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Manage Users</h2>
        {error && <p className="error">{error}</p>}
        {isLoading && (<div><h3>Loading...</h3></div>)}
        {(users.length !== 0) && (
          users.map(user => 
            user.type_id == 1 ?
            (
              <div key={user.uid}>
                <p>{user.first_name} {user.last_name} - {user.email}</p>
                <button onClick={() => setUserToAdmin(user.uid)} className='admin-user-button'>Make Admin</button>
                <button onClick={() => editUser(user.id)} className='admin-user-button'>Edit User</button>
                {user.state_id != 3 ? (
                  <button onClick={() => setUserToSuspend(user.uid)} className='admin-user-button'>Suspend User</button>
                ) : (
                  <button className='suspended-user-button'>User Suspended</button>
                )}
              </div>
            ) : (
              <div key={user.uid}>
                <p>{user.first_name} {user.last_name} - {user.email}</p>
                <button className='remove-admin-button'>Remove Admin</button>
                <button onClick={() => editUser(user.uid)} className='admin-user-button'>Edit User</button>
              </div>
            ))
        )}
        {(!isLoading && !users.length) && (<p>No users</p>)}
      </div>
    </section>
  );
}

export default ManageUsers;