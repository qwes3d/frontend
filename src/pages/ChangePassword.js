import { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import '../styles/FormStyles.css';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put('/auth/change-password', { oldPassword, newPassword });
      toast.success('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password change failed');
    }
  };

  return (
  <div className="form-container">
    <h2>Change Password</h2>
    <form onSubmit={handleSubmit}>
      <label>Old Password:</label>
      <input
        type="password"
        placeholder="Enter old password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <label>New Password:</label>
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button type="submit">Change Password</button>
    </form>
  </div>
  );
};

export default ChangePassword;
