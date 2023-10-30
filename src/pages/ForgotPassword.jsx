import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      // Send a POST request to your server to initiate the forgot password process
      const response = await axios.post('http://localhost:8000/api/forgot-password', {
        email: email,
      });

      if (response.status === 200) {
        // Password reset email sent successfully
        setMessage('Password reset email sent. Please check your inbox.');
      } else {
        // Handle other response statuses or errors here
        setMessage('Failed to send password reset email.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error sending forgot password request:', error);
      setMessage('An error occurred while sending the request.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleForgotPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
