import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// CORS configuration for Vercel deployment
app.use(cors({
  origin: [
    'https://the-hire-hub-tech-assignment.vercel.app',
    'https://the-hire-hub-tech-assignment-devesh-pandagre.vercel.app',
    'http://localhost:3000',
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection failed:', err.message));
} else {
  console.warn('MONGODB_URI not set — database-backed routes will fail until configured.');
}

app.get('/', (req, res) => {
  res.json({ name: 'TheHireHub API', health: '/api/health' });
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/candidates', candidateRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
