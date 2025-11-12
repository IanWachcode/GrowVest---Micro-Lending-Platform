const express = require('express');
const router = express.Router();
const {
  getSavings,
  deposit,
  withdraw,
  getTransactions,
} = require('../controllers/savingsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSavings);
router.route('/deposit').post(protect, deposit);
router.route('/withdraw').post(protect, withdraw);
router.route('/transactions').get(protect, getTransactions);

module.exports = router;