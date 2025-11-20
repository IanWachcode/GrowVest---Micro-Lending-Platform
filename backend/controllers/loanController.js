const Loan = require('../models/Loan');

// Create loan
exports.createLoan = async (req, res) => {
  try {
    const loan = await Loan.create({ ...req.body, user: req.user.id });
    res.status(201).json({ success: true, loan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all loans for logged-in user
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id });
    res.json({ success: true, loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single loan
exports.getLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.json({ success: true, loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update loan
exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete loan
exports.deleteLoan = async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Loan deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
