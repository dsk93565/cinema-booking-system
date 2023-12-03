import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylings/account.css';

const UserProfile = () => {
    const [userData, setUserData] = useState({
        email: '', // Will be fetched but not editable
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        password: '', // For password updates
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false); // Define this state
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const userToken = localStorage.getItem('userToken');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/get-user', {
                    user_token: userToken
                });
                // Update the state with the email as well
                setUserData({
                    email: response.data.user.email, // Add this line to set the email
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
                user_token: localStorage.getItem('userToken'),
                ...(isChangingPassword && { password: userData.password }),
                phonenumber: userData.phoneNumber,
                first_name: userData.firstName,
                last_name: userData.lastName,
            });
            console.log('Success:', response.data);
            setIsEditing(false);
            setIsChangingPassword(false); // Reset the password change prompt
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Error saving changes');
        }
    };

    const handlePasswordChange = (e) => {
        setIsChangingPassword(true); // Prompt for current password before allowing a change
        setUserData({...userData, password: e.target.value});
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
                                <label>First Name</label>
                                <input 
                                    type="text" 
                                    value={userData.firstName} 
                                    onChange={(e) => setUserData({...userData, firstName: e.target.value})} 
                                />

                                {/* ... other input fields ... */}

                                {/* Display email, but make it read-only */}
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    value={userData.email} 
                                    disabled 
                                />

                                {/* Conditionally render input for address if it's empty */}
                                <label>Address</label>
                                {userData.address ? (
                                    <input 
                                        type="text" 
                                        value={userData.address} 
                                        onChange={(e) => setUserData({...userData, address: e.target.value})} 
                                    />
                                ) : (
                                    <input 
                                        type="text" 
                                        placeholder="Enter address" 
                                        onChange={(e) => setUserData({...userData, address: e.target.value})} 
                                    />
                                )}

                                {/* ... rest of your component ... */}
                            </>
                        ) : (
                            <>
                                <div className='user-info-display'>First Name: {userData.firstName}</div>
                                <div className='user-info-display'>Last Name: {userData.lastName}</div>
                                <div className='user-info-display'>Phone Number: {userData.phoneNumber || "Add Phone Number"}</div>
                                <div className='user-info-display'>Address: {userData.address || "Add Address"}</div>
                                <div className='user-info-display'>Email: {userData.email}</div>
                                
                                {/* ... rest of your component ... */}
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