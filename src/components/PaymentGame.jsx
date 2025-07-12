import React, { useState, useEffect } from 'react';

const PaymentGame = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Check if user has already paid
    const paidStatus = localStorage.getItem('portfolioAccess');
    if (paidStatus === 'paid') {
      setHasAccess(true);
      onSuccess && onSuccess();
    }
  }, [onSuccess]);

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // Create order on backend (you'll need to implement this)
      const response = await fetch('https://portfolio-main-ypr0.onrender.com/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100, // ₹1 in paise
          currency: 'INR',
        }),
      });
      
      const order = await response.json();
      
      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_9999999999',
        amount: order.amount,
        currency: order.currency,
        name: 'Portfolio Access',
        description: 'One-time payment for portfolio access',
        order_id: order.id,
        handler: function (response) {
          // Payment successful
          localStorage.setItem('portfolioAccess', 'paid');
          setHasAccess(true);
          onSuccess && onSuccess();
        },
        prefill: {
          name: 'User',
          email: 'user@example.com',
        },
        theme: {
          color: '#00ff00',
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (hasAccess) {
    return null; // User has access, don't show payment component
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-green-500 p-8 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-green-400 text-xl font-bold mb-4 text-center">
          Portfolio Access
        </h2>
        <p className="text-green-300 mb-6 text-center">
          Pay ₹1 to get permanent access to the portfolio
        </p>
        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors"
        >
          {isLoading ? 'Processing...' : 'Pay ₹1 & Get Access'}
        </button>
        <p className="text-green-500 text-sm mt-4 text-center">
          Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
};

export default PaymentGame;
