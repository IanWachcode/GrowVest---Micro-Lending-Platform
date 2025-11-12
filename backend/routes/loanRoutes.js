const express = require('express');
const router = express.Router();
const {
  getLoans,
  getLoan,
  createLoan,
  makePayment,
} = require('../controllers/loanController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getLoans).post(protect, createLoan);
router.route('/:id').get(protect, getLoan);
router.route('/:id/payment').post(protect, makePayment);

module.exports = router;