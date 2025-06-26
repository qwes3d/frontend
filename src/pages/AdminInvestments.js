import { useEffect, useState } from 'react';
import API from '../api';

const AdminInvestments = () => {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    API.get('/admin/investments')
      .then((res) => setInvestments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteInvestment = async (id) => {
    try {
      await API.delete(`/admin/investments/${id}`);
      alert('Investment deleted');
      setInvestments(investments.filter((inv) => inv._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Admin - Investments</h2>
      <ul>
        {investments.map((inv) => (
          <li key={inv._id}>
            {inv.user?.email} | {inv.level} | ${inv.amount} | Status: {inv.status}
            <button onClick={() => deleteInvestment(inv._id)}>Delete Investment</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminInvestments;
