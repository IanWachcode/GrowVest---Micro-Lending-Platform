const Loan = require('../models/Loan');

// @desc    Get user loans
// @route   GET /api/loans
// @access  Private
const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single loan
// @route   GET /api/loans/:id
// @access  Private
const getLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Make sure user owns loan
    if (loan.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.status(200).json(loan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new loan
// @route   POST /api/loans
// @access  Private
const createLoan = async (req, res) => {
  try {
    const { amount, purpose, duration } = req.body;

    const loan = await Loan.create({
      user: req.user._id,
      amount,
      purpose,
      duration,
    });

    res.status(201).json(loan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Make loan payment
// @route   POST /api/loans/:id/payment
// @access  Private
const makePayment = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Make sure user owns loan
    if (loan.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: 'Invalid payment amount' });
    }

    // Add payment to loan
    loan.payments.push({ amount });
    loan.remainingBalance -= amount;

    // Check if loan is fully paid
    if (loan.remainingBalance <= 0) {
      loan.status = 'completed';
      loan.remainingBalance = 0;
    }

    await loan.save();

    res.status(200).json(loan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getLoans,
  getLoan,
  createLoan,
  makePayment,
};