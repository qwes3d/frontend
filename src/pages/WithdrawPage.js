import { useState, useEffect } from 'react';
import API from '../api';
import '../styles/WithdrawPage.css'; // Assuming you have some styles for this page

const WithdrawPage = () => {
  const [investments, setInvestments] = useState([]);
  const [method, setMethod] = useState('crypto');
  const [investmentId, setInvestmentId] = useState('');

  useEffect(() => {
    API.get('/investments').then(res => setInvestments(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/withdrawals', { investmentId, method });
      alert('Withdrawal request submitted!');
    } catch (err) {
      console.error(err);
      alert('Error submitting withdrawal.');
    }
  };

  return (
    <div>
      <h2>Request Withdrawal</h2>
      <form onSubmit={handleSubmit}>
        <label>Choose Investment:</label>
        <select onChange={(e) => setInvestmentId(e.target.value)} required>
          <option value="">Select</option>
          {investments.map((inv) => (
            <option key={inv._id} value={inv._id}>
              {inv.level} - ${inv.amount}
            </option>
          ))}
        </select>

        <label>Withdrawal Method:</label>
        <select onChange={(e) => setMethod(e.target.value)}>
          <option value="crypto">Crypto</option>
          <option value="bank">Bank</option>
          <option value="card">Card</option>
        </select>

        <button type="submit">Submit Withdrawal</button>
      </form>
    </div>
  );
};

export default WithdrawPage;
