const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const Razorpay = require('razorpay');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Payment server is running',
    timestamp: new Date().toISOString()
  });
});

// Create order endpoint
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount = 100, currency = 'INR' } = req.body;

    const options = {
      amount: amount, // ₹1 in paise
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Verify payment endpoint
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment parameters'
      });
    }

    // Create signature for verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');
    
    if (expectedSignature === razorpay_signature) {
      // Payment is verified - you can save to database here
      console.log('Payment verified successfully:', {
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        timestamp: new Date().toISOString()
      });

      res.status(200).json({ 
        success: true, 
        message: 'Payment verified successfully',
        payment_id: razorpay_payment_id
      });
    } else {
      console.log('Payment verification failed:', {
        expected: expectedSignature,
        received: razorpay_signature,
        payment_id: razorpay_payment_id
      });

      res.status(400).json({ 
        success: false, 
        message: 'Payment verification failed' 
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Get payment details endpoint (optional)
app.get('/api/payment/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await razorpay.payments.fetch(paymentId);
    
    res.status(200).json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        method: payment.method,
        created_at: payment.created_at
      }
    });
  } catch (error) {
    console.error('Payment fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Payment verification server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;