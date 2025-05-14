const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, leadController.getLeads);
router.post('/', protect, leadController.createLead);
router.put('/:id', protect, leadController.updateLead);
router.delete('/:id', protect, leadController.deleteLead);

module.exports = router;