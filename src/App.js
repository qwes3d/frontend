import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import WithdrawPage from './pages/WithdrawPage';
import AdminUsers from './pages/AdminUsers';
import AdminInvestments from './pages/AdminInvestments';
import AdminWithdrawals from './pages/AdminWithdrawals';
import Deposit from './pages/Deposit';
import DepositConfirmation from './pages/DepositConfirmation';
import StripePaymentForm from './pages/StripePaymentForm';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/withdraw" element={<PrivateRoute><WithdrawPage /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><AdminUsers /></PrivateRoute>} />
        <Route path="/admin/investments" element={<PrivateRoute><AdminInvestments /></PrivateRoute>} />
        <Route path="/admin/withdrawals" element={<PrivateRoute><AdminWithdrawals /></PrivateRoute>} />
        <Route path="/deposit" element={<PrivateRoute><Deposit /></PrivateRoute>} />
        <Route path="/deposit-confirmation" element={<PrivateRoute><DepositConfirmation /></PrivateRoute>} />
        <Route path="/payment/stripe" element={<PrivateRoute><StripePaymentForm /></PrivateRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
