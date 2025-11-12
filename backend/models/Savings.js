const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  interestRate: {
    type: Number,
    default: 5, // 5% annual interest
  },
  transactions: [{
    type: {
      type: String,
      enum: ['deposit', 'withdrawal'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: '',
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
  lastInterestCalculation: {
    type: Date,
    default: Date.now,
  },
});

// Method to add deposit
savingsSchema.methods.deposit = function (amount, description = 'Deposit') {
  this.balance += amount;
  this.transactions.push({
    type: 'deposit',
    amount,
    description,
  });
  return this.save();
};

// Method to withdraw
savingsSchema.methods.withdraw = function (amount, description = 'Withdrawal') {
  if (this.balance < amount) {
    throw new Error('Insufficient balance');
  }
  this.balance -= amount;
  this.transactions.push({
    type: 'withdrawal',
    amount,
    description,
  });
  return this.save();
};

// Method to calculate interest (monthly)
savingsSchema.methods.calculateInterest = function () {
  const now = new Date();
  const monthsSinceLastCalc = Math.floor(
    (now - this.lastInterestCalculation) / (1000 * 60 * 60 * 24 * 30)
  );

  if (monthsSinceLastCalc > 0) {
    const monthlyRate = this.interestRate / 100 / 12;
    const interest = this.balance * monthlyRate * monthsSinceLastCalc;
    this.balance += interest;
    this.transactions.push({
      type: 'deposit',
      amount: interest,
      description: 'Interest earned',
    });
    this.lastInterestCalculation = now;
  }
  return this.save();
};

module.exports = mongoose.model('Savings', savingsSchema);