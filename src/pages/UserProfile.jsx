import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylings/account.css';

const UserProfile = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const userToken = localStorage.getItem('userToken');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/get-user', {
                    user_token: userToken
                });
                setUserData({
                    firstName: response.data.user.first_name,
                    lastName: response.data.user.last_name,
                    phoneNumber: response.data.user.phone_number,
                    address: response.data.user.address,
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message || 'Error fetching user data');
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userToken]);

    const handleSaveChanges = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/edit-user', {
                email: userData.email, // You need to include the email in the userData state
                password: userData.password, // Include only if you want to update the password
                phonenumber: userData.phoneNumber,
                first_name: userData.firstName,
                last_name: userData.lastName,
                promotions: userData.promotions, // Include only if you're updating promotions
                // Include any additional fields you want to update
            });
            console.log('Success:', response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Error saving changes');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className='temporary section-wrapper'>
            <div className='section-container-narrow'>
                <div className='profile-header'>
                    <h2>Profile</h2>
                </div>
                <div className='user-info-form'>
                    <div className='user-infos'>
                        {isEditing ? (
                            <>
                                <input type="text" value={userData.firstName} onChange={(e) => setUserData({...userData, firstName: e.target.value})} />
                                <input type="text" value={userData.lastName} onChange={(e) => setUserData({...userData, lastName: e.target.value})} />
                                <input type="text" value={userData.phoneNumber} onChange={(e) => setUserData({...userData, phoneNumber: e.target.value})} />
                                <input type="text" value={userData.address} onChange={(e) => setUserData({...userData, address: e.target.value})} />
                            </>
                        ) : (
                            <>
                                <div className='user-info-text'>{userData.firstName}</div>
                                <div className='user-info-text'>{userData.lastName}</div>
                                <div className='user-info-text'>{userData.phoneNumber}</div>
                                <div className='user-info-text'>{userData.address}</div>
                            </>
                        )}
                    </div>
                    {isEditing ? (
                        <>
                            <button onClick={handleSaveChanges}>Save Changes</button>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default UserProfile; 