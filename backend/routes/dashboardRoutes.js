const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected and require authentication
router.use(protect);

// Get dashboard statistics
router.get('/stats', dashboardController.getStats);

// Get recent leads
router.get('/recent-leads', dashboardController.getRecentLeads);

// Get recent tickets
router.get('/recent-tickets', dashboardController.getRecentTickets);

module.exports = router;