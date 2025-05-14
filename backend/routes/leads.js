const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Protected route - only authenticated users
router.get('/leads', protect, async (req, res) => {
  // Your route handler
});

// Protected route - only admin users
router.post('/leads', protect, authorize('admin'), async (req, res) => {
  // Your route handler
});

// Protected route - admin and manager users
router.put('/leads/:id', protect, authorize('admin', 'manager'), async (req, res) => {
  // Your route handler
});