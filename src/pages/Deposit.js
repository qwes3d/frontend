import { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../styles/Deposit.css';


const Deposit = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [level, setLevel] = useState('bronze');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Please enter a valid deposit amount.');
      return;
    }

    setLoading(true);
    try {
      await API.post('/investments', { amount, level, paymentMethod });
      toast.success('Deposit Successful!');

      // Optional: Clear form
      setAmount('');
      setLevel('bronze');
      setPaymentMethod('card');

      // Navigate to confirmation page
      navigate('/deposit-confirmation');

    } catch (err) {
      toast.error('Deposit failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Make a New Deposit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount (USD):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter deposit amount"
          />
        </div>

        <div>
          <label>Choose Plan Level:</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="bronze">Bronze (3% ROI)</option>
            <option value="silver">Silver (5% ROI)</option>
            <option value="gold">Gold (7% ROI)</option>
            <option value="platinum">Platinum (10% ROI)</option>
          </select>
        </div>

        <div>
          <label>Payment Method:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="card">Card</option>
            <option value="crypto">Crypto</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit Deposit'}
        </button>
      </form>
    </div>
  );
};

export default Deposit;
