import React, { useState } from 'react';
import { useRouteProtection } from '../store/RouteContext';
import { useWheel } from '../store/WheelContext';

const PaymentGame = ({ onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  
  const { setAllowedRoute } = useRouteProtection();
  const { setShow } = useWheel();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Load Razorpay script dynamically
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: 'rzp_test_9999999999', // Replace with your Razorpay Test Key ID
          amount: 100, // Amount in paise (₹1 = 100 paise)
          currency: 'INR',
          name: 'Matrix Escape',
          description: 'Unlock all routes - Escape the Matrix',
          image: '/Pranav.png', // Your logo
          handler: function (response) {
            // Payment successful
            console.log('Payment successful:', response);
            setPaymentStatus('success');
            
            // Unlock all routes
            localStorage.setItem('matrixEscaped', 'true');
            setAllowedRoute('*');
            setShow(false);
            
            // Show success message briefly
            setTimeout(() => {
              onClose();
            }, 2000);
          },
          prefill: {
            name: 'User',
            email: 'user@example.com',
            contact: '9999999999'
          },
          notes: {
            address: 'Matrix Escape Payment'
          },
          theme: {
            color: '#10B981' // Green color matching your theme
          },
          modal: {
            ondismiss: function() {
              setIsProcessing(false);
              setPaymentStatus('cancelled');
            }
          }
        };

        const rzp = new window.Razorpay(options);
        
        rzp.on('payment.failed', function (response) {
          console.error('Payment failed:', response.error);
          setPaymentStatus('failed');
          setIsProcessing(false);
        });

        rzp.open();
      };

      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        setPaymentStatus('error');
        setIsProcessing(false);
      };

    } catch (error) {
      console.error('Payment initialization error:', error);
      setPaymentStatus('error');
      setIsProcessing(false);
    }
  };

  return (
    <div className="text-green-300 font-mono text-center">
      <div className="mb-6">
        <h2 className="text-green-400 text-3xl font-bold mb-4">💰 Matrix Escape Payment</h2>
        <div className="bg-black/50 rounded border border-green-500 p-6 mb-6">
          <p className="text-xl mb-4">
            Ready to escape the Matrix once and for all?
          </p>
          <p className="text-lg mb-4">
            Pay just <span className="text-green-400 font-bold text-2xl">₹1</span> to unlock all routes permanently!
          </p>
          <p className="text-sm text-green-300 opacity-75">
            No more spinning wheels, no more typing tests. Just pure freedom.
          </p>
        </div>
      </div>

      {paymentStatus === 'success' && (
        <div className="text-green-400 mb-6">
          <h3 className="text-2xl font-bold mb-2">🎉 Payment Successful!</h3>
          <p className="text-lg">Welcome to the real world. All routes are now unlocked!</p>
        </div>
      )}

      {paymentStatus === 'failed' && (
        <div className="text-red-400 mb-6">
          <h3 className="text-xl font-bold mb-2">❌ Payment Failed</h3>
          <p>Something went wrong. Please try again.</p>
        </div>
      )}

      {paymentStatus === 'cancelled' && (
        <div className="text-yellow-400 mb-6">
          <h3 className="text-xl font-bold mb-2">⚠️ Payment Cancelled</h3>
          <p>You chose to stay in the Matrix. The wheel awaits...</p>
        </div>
      )}

      {paymentStatus === 'error' && (
        <div className="text-red-400 mb-6">
          <h3 className="text-xl font-bold mb-2">🚫 Payment Error</h3>
          <p>Failed to initialize payment. Please refresh and try again.</p>
        </div>
      )}

      {!paymentStatus && (
        <div className="space-y-4">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`
              px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300
              ${isProcessing 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-500 hover:scale-105 shadow-lg hover:shadow-green-500/25'
              }
            `}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                Processing...
              </span>
            ) : (
              '💳 Pay ₹1 & Escape Forever'
            )}
          </button>
          
          <div className="text-xs text-green-300 opacity-60 mt-4">
            <p>🔒 Secure payment powered by Razorpay</p>
            <p>💡 One-time payment for lifetime access</p>
          </div>
        </div>
      )}

      {(paymentStatus === 'failed' || paymentStatus === 'cancelled' || paymentStatus === 'error') && (
        <button
          onClick={() => {
            setPaymentStatus(null);
            setIsProcessing(false);
          }}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default PaymentGame;