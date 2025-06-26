import { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/FormStyles.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/auth/reset-password/${token}`, { newPassword });
      toast.success('Password updated! You can now log in.');
      navigate('/login');
    } catch (err) {
      toast.error('Reset failed. Link may have expired.');
    }
  };

  return (
   <div className="form-container">
    <h2>Reset Password</h2>
    <form onSubmit={handleSubmit}>
      <label>New Password:</label>
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
  </div>
  );
};

export default ResetPassword;
