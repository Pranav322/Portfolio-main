// Backend payment verification endpoint
// You'll need to deploy this to your backend server

const crypto = require('crypto');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Your Razorpay Secret Key (NEVER expose this on frontend)
const RAZORPAY_SECRET = 'your_live_razorpay_secret_key_here';

app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    
    // Create signature for verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');
    
    if (expectedSignature === razorpay_signature) {
      // Payment is verified
      res.status(200).json({ 
        success: true, 
        message: 'Payment verified successfully' 
      });
    } else {
      // Payment verification failed
      res.status(400).json({ 
        success: false, 
        message: 'Payment verification failed' 
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Payment verification server running on port ${PORT}`);
});

module.exports = app;