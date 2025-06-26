import { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import '../styles/FormStyles.css';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/forgot-password', { email });
      toast.success('Reset link sent! Check your email.');
    } catch (err) {
      toast.error('Error sending reset link.');
    }
  };

  return (
    <div className="form-container">
  <h2>Forgot Password</h2>
  <form onSubmit={handleSubmit}>
    <label>Email Address:</label>
    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <button type="submit">Send Reset Link</button>
  </form>
</div>

  );
};

export default ForgotPassword;
