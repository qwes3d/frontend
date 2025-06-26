import { useEffect, useState } from 'react';
import API from '../api';
import './AdminUsers.css';


const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/admin/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const promoteToAdmin = async (userId) => {
    try {
      await API.put(`/admin/users/${userId}/promote`);
      alert('User promoted');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await API.delete(`/admin/users/${userId}`);
      alert('User deleted');
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Admin - Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.fullName} - {user.email} - {user.role}
            {user.role !== 'admin' && (
              <>
                <button onClick={() => promoteToAdmin(user._id)}>Make Admin</button>
                <button onClick={() => deleteUser(user._id)}>Delete User</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
