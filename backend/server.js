import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { isMockDataMode } from './config/dataMode.js';

dotenv.config();

const app = express();

// CORS: fixed URLs + optional env list + any *.vercel.app (preview deployments use unique hostnames)
const corsOrigins = [
  'https://the-hire-hub-tech-assignment.vercel.app',
  'https://the-hire-hub-tech-assignment-devesh-pandagre.vercel.app',
  'http://localhost:3000',
  ...(process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim()) : []),
];

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (corsOrigins.includes(origin)) return callback(null, true);
    try {
      const { hostname } = new URL(origin);
      if (hostname.endsWith('.vercel.app')) return callback(null, true);
    } catch {
      // ignore
    }
    callback(null, false);
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (isMockDataMode()) {
  console.warn('MONGODB_URI not set — using in-memory dummy data (jobs & candidates).');
} else {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection failed:', err.message));
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
