import React, { useState, useEffect } from 'react';
import '../stylings/account.css';
// Import FontAwesomeIcon if you're using icons

const UserProfile = () => {
    // State for user data and editing mode
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '', // Added address field
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user data from the server on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:8000/api/get-user');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phoneNumber: data.phoneNumber,
                    address: data.address, // Assuming the API returns this
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Function to handle saving changes
    const handleSaveChanges = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/edit-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Success:', data);
            setIsEditing(false); // Turn off editing mode
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
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