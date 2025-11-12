const Savings = require('../models/Savings');

// @desc    Get user savings account
// @route   GET /api/savings
// @access  Private
const getSavings = async (req, res) => {
  try {
    let savings = await Savings.findOne({ user: req.user._id });

    // Create savings account if it doesn't exist
    if (!savings) {
      savings = await Savings.create({ user: req.user._id });
    }

    // Calculate interest before returning
    await savings.calculateInterest();

    res.status(200).json(savings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Deposit money
// @route   POST /api/savings/deposit
// @access  Private
const deposit = async (req, res) => {
  try {
    const { amount, description } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: 'Invalid deposit amount' });
    }

    let savings = await Savings.findOne({ user: req.user._id });

    // Create savings account if it doesn't exist
    if (!savings) {
      savings = await Savings.create({ user: req.user._id });
    }

    await savings.deposit(amount, description || 'Deposit');

    res.status(200).json(savings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Withdraw money
// @route   POST /api/savings/withdraw
// @access  Private
const withdraw = async (req, res) => {
  try {
    const { amount, description } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: 'Invalid withdrawal amount' });
    }

    const savings = await Savings.findOne({ user: req.user._id });

    if (!savings) {
      return res.status(404).json({ message: 'Savings account not found' });
    }

    await savings.withdraw(amount, description || 'Withdrawal');

    res.status(200).json(savings);
  } catch (error) {
    console.error(error);
    if (error.message === 'Insufficient balance') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

// @desc    Get transactions
// @route   GET /api/savings/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const savings = await Savings.findOne({ user: req.user._id });

    if (!savings) {
      return res.status(404).json({ message: 'Savings account not found' });
    }

    // Calculate interest before returning transactions
    await savings.calculateInterest();

    res.status(200).json(savings.transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSavings,
  deposit,
  withdraw,
  getTransactions,
};