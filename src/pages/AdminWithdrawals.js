import { useEffect, useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';

const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  // Fetch all withdrawals
  const fetchWithdrawals = async () => {
    try {
      const res = await API.get('/admin/withdrawals');
      setWithdrawals(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch withdrawals');
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  // Approve Withdrawal
  const handleApprove = async (withdrawalId) => {
    try {
      await API.put(`/admin/withdrawals/${withdrawalId}/approve`);
      toast.success('Withdrawal Approved');
      fetchWithdrawals();
    } catch (err) {
      toast.error('Approval failed');
    }
  };

  // Reject Withdrawal
  const handleReject = async (withdrawalId) => {
    try {
      await API.put(`/admin/withdrawals/${withdrawalId}/reject`);
      toast.success('Withdrawal Rejected');
      fetchWithdrawals();
    } catch (err) {
      toast.error('Rejection failed');
    }
  };

  // Mark as Paid
  const handleMarkPaid = async (withdrawalId) => {
    try {
      await API.put(`/admin/withdrawals/${withdrawalId}/mark-paid`);
      toast.success('Marked as Paid');
      fetchWithdrawals();
    } catch (err) {
      toast.error('Failed to mark as paid');
    }
  };

  return (
    <div>
      <h2>Admin - Withdrawals</h2>

      {withdrawals.length === 0 ? (
        <p>No withdrawals found.</p>
      ) : (
        <ul>
          {withdrawals.map((wd) => (
            <li key={wd._id} style={{ marginBottom: '1rem' }}>
              <strong>User:</strong> {wd.user?.email} | 
              <strong> Amount:</strong> ${wd.investment?.amount} | 
              <strong> Method:</strong> {wd.method} | 
              <strong> Status:</strong> {wd.status}

              {/* Action Buttons based on status */}
              <div style={{ marginTop: '0.5rem' }}>
                {wd.status === 'pending' && (
                  <>
                    <button onClick={() => handleApprove(wd._id)}>Approve</button>
                    <button onClick={() => handleReject(wd._id)}>Reject</button>
                  </>
                )}
                {wd.status === 'approved' && (
                  <button onClick={() => handleMarkPaid(wd._id)}>Mark as Paid</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminWithdrawals;
