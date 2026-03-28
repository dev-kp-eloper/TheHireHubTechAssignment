import express from 'express';

const router = express.Router();

// Admin credentials
const ADMIN_USER = {
  username: 'admin',
  password: 'admin123',
  email: 'admin@thehirehub.com',
  name: 'Admin User'
};

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    return res.status(200).json({
      success: true,
      user: {
        id: '1',
        username: ADMIN_USER.username,
        email: ADMIN_USER.email,
        name: ADMIN_USER.name
      },
      token: 'admin-token-12345'
    });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// Logout route
router.post('/logout', (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// Check auth status
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || token !== 'admin-token-12345') {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  res.status(200).json({
    success: true,
    user: {
      id: '1',
      username: ADMIN_USER.username,
      email: ADMIN_USER.email,
      name: ADMIN_USER.name
    }
  });
});

export default router;
