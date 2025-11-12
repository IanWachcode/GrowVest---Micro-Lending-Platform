import { useState, useEffect } from 'react';
import api from '../utils/api';

const Savings = () => {
  const [savings, setSavings] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('deposit'); // 'deposit' or 'withdraw'

  useEffect(() => {
    fetchSavingsData();
  }, []);

  const fetchSavingsData = async () => {
    try {
      const [savingsRes, transactionsRes] = await Promise.all([
        api.get('/savings'),
        api.get('/savings/transactions'),
      ]);

      setSavings(savingsRes.data);
      setTransactions(transactionsRes.data);
    } catch (error) {
      console.error('Error fetching savings data:', error);
      setError('Failed to load savings data');
    } finally {
      setLoading(false);
    }
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = action === 'deposit' ? '/savings/deposit' : '/savings/withdraw';
      const response = await api.post(endpoint, {
        amount: parseFloat(amount),
        description: `${action.charAt(0).toUpperCase() + action.slice(1)} via web app`,
      });

      setSavings(response.data);
      setAmount('');
      setSuccess(`${action.charAt(0).toUpperCase() + action.slice(1)} successful!`);
      fetchSavingsData(); // Refresh transactions
    } catch (error) {
      setError(error.response?.data?.message || `Failed to ${action}`);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Savings Account</h1>
          <p className="text-gray-600">Manage your savings and view transaction history</p>
        </div>

        {/* Balance Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
          <div className="text-4xl font-bold text-primary mb-2">
            ${savings?.balance?.toFixed(2) || '0.00'}
          </div>
          <p className="text-gray-600">Interest Rate: {savings?.interestRate || 5}% per annum</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transaction Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Make a Transaction</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="deposit"
                      checked={action === 'deposit'}
                      onChange={(e) => setAction(e.target.value)}
                      className="mr-2"
                    />
                    Deposit
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="withdraw"
                      checked={action === 'withdraw'}
                      onChange={(e) => setAction(e.target.value)}
                      className="mr-2"
                    />
                    Withdraw
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount ($)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter amount"
                />
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
              >
                {actionLoading ? 'Processing...' : `${action.charAt(0).toUpperCase() + action.slice(1)} Money`}
              </button>
            </form>
          </div>

          {/* Transaction History */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            {transactions.length === 0 ? (
              <p className="text-gray-600">No transactions yet</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactions.slice(0, 10).map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;