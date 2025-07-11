# Portfolio
Too lazy to explain everything — check it out [here](https://pranaw.vercel.app).

## Razorpay Payment Setup

To enable live payments for the Matrix escape feature:

### 1. Razorpay Account Setup
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/signup)
2. Complete KYC verification for live payments
3. Go to Settings → API Keys
4. Generate Live API Keys

### 2. Environment Configuration
1. Copy `.env.example` to `.env`
2. Add your live Razorpay Key ID:
   ```
   VITE_RAZORPAY_KEY_ID=rzp_live_your_actual_key_here
   ```

### 3. Backend Setup (Required for Payment Verification)
1. Deploy the `server/verify-payment.js` to your backend
2. Add your Razorpay Secret Key to backend environment
3. Update `VITE_API_URL` in `.env` with your backend URL

### 4. Testing
- Test with live keys in test mode first
- Use real payment methods for final testing
- Monitor payments in Razorpay Dashboard

### 5. Go Live
1. Activate your Razorpay account
2. Switch to live mode in Razorpay Dashboard
3. Deploy with live environment variables

**Important**: Never expose your Razorpay Secret Key on the frontend!


