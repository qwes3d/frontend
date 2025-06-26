import { useEffect, useState } from 'react';
import API from '../api';
import './Dashboard.css';


const Dashboard = () => {
  const [profile, setProfile] = useState({});
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await API.get('/auth/profile');
        const investmentsRes = await API.get('/investments');
        setProfile(profileRes.data);
        setInvestments(investmentsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalEarned = investments.reduce((sum, inv) => sum + inv.earned, 0);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {profile.fullName}</h2>

      <div>
        <p><strong>Total Invested:</strong> ${totalInvested}</p>
        <p><strong>Total ROI Earned:</strong> ${totalEarned.toFixed(2)}</p>
      </div>

      <h3>Your Investments:</h3>
      <ul>
        {investments.map((inv) => (
          <li key={inv._id}>
            Level: {inv.level} | Amount: ${inv.amount} | Earned: ${inv.earned.toFixed(2)} | Status: {inv.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
