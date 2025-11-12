const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: [true, 'Please add loan amount'],
    min: [1000, 'Minimum loan amount is 1000'],
  },
  purpose: {
    type: String,
    required: [true, 'Please add loan purpose'],
  },
  duration: {
    type: Number,
    required: [true, 'Please add loan duration in months'],
    min: [1, 'Minimum duration is 1 month'],
    max: [24, 'Maximum duration is 24 months'],
  },
  interestRate: {
    type: Number,
    default: 12, // 12% annual interest
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'active', 'completed'],
    default: 'pending',
  },
  totalAmount: {
    type: Number,
  },
  monthlyPayment: {
    type: Number,
  },
  remainingBalance: {
    type: Number,
  },
  nextPaymentDate: {
    type: Date,
  },
  payments: [{
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: {
    type: Date,
  },
});

// Calculate total amount and monthly payment before saving
loanSchema.pre('save', function (next) {
  if (this.isModified('amount') || this.isModified('duration') || this.isModified('interestRate')) {
    const principal = this.amount;
    const rate = this.interestRate / 100 / 12; // Monthly interest rate
    const time = this.duration;

    // Simple interest calculation: Total = Principal + (Principal * Rate * Time)
    this.totalAmount = principal + (principal * (this.interestRate / 100) * (time / 12));
    this.monthlyPayment = Math.round(this.totalAmount / time);
    this.remainingBalance = this.totalAmount;
  }
  next();
});

module.exports = mongoose.model('Loan', loanSchema);