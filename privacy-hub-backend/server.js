const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your Vite frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Mock dashboard stats endpoint
app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    activeReviews: 5,
    reviewTrend: 'up',
    pendingDSRs: 3,
    dsrTrend: 'down',
    riskScore: 85,
    riskTrend: 'stable'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 