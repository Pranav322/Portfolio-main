# Payment Verification Server

This server handles Razorpay payment verification for the portfolio Matrix escape feature.

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
```

Edit `.env` with your actual Razorpay credentials:
```env
RAZORPAY_KEY_ID=rzp_live_your_key_id_here
RAZORPAY_SECRET=rzp_live_your_secret_key_here
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://pranaw.vercel.app
```

### 3. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Create Order
- **POST** `/api/create-order`
- Body: `{ "amount": 100, "currency": "INR" }`
- Creates a new Razorpay order

### Verify Payment
- **POST** `/api/verify-payment`
- Body: `{ "razorpay_payment_id", "razorpay_order_id", "razorpay_signature" }`
- Verifies payment signature

### Get Payment Details
- **GET** `/api/payment/:paymentId`
- Returns payment information

## Deployment Options

### 1. Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### 2. Heroku
```bash
# Install Heroku CLI
heroku create your-app-name
git push heroku main
```

### 3. Vercel (Serverless)
```bash
# Install Vercel CLI
npm install -g vercel
vercel
```

### 4. DigitalOcean App Platform
- Connect your GitHub repository
- Set environment variables
- Deploy

## Security Notes

- Never expose `RAZORPAY_SECRET` on frontend
- Use HTTPS in production
- Validate all incoming requests
- Log payment activities for audit
- Set up proper CORS policies

## Testing

Test the server locally:
```bash
# Health check
curl http://localhost:3001/health

# Create order
curl -X POST http://localhost:3001/api/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "currency": "INR"}'
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RAZORPAY_KEY_ID` | Razorpay Key ID | Yes |
| `RAZORPAY_SECRET` | Razorpay Secret Key | Yes |
| `PORT` | Server port | No (default: 3001) |
| `NODE_ENV` | Environment | No (default: development) |
| `FRONTEND_URL` | Frontend URL for CORS | No (default: localhost:5173) |

## Monitoring

- Check server logs for payment activities
- Monitor Razorpay dashboard for transactions
- Set up alerts for failed payments
- Track conversion rates

## Support

For issues:
1. Check server logs
2. Verify Razorpay credentials
3. Test API endpoints manually
4. Check CORS configuration