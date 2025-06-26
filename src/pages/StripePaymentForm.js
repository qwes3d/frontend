import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import API from '../api';
import { toast } from 'react-toastify';
import '../styles/StripeForm.css';

const stripePromise = loadStripe('pk_test_YOUR_PUBLIC_KEY');  // Replace with your real Stripe public key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      const res = await API.post('/payment/stripe', { amount });

      const result = await stripe.confirmCardPayment(res.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          toast.success('Payment Successful!');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Payment failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Stripe Payment</h2>
      <input
        type="number"
        placeholder="Amount in USD"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay Now</button>
    </form>
  );
};

const StripePaymentForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripePaymentForm;
