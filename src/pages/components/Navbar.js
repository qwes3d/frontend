import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Dashboard</Link> | 
      <Link to="/profile">Profile</Link> | 
      <Link to="/login">Login</Link> | 
      <Link to="/register">Register</Link> | 
      <Link to="/withdraw">Withdraw</Link> |
      <Link to="/admin/users">Admin Users</Link> |
      <Link to="/admin/investments">Admin Investments</Link> |
      <Link to="/admin/withdrawals">Admin Withdrawals</Link> |




      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
