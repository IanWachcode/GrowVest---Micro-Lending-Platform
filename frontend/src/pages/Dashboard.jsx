import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext.js';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [loans, setLoans] = useState([]);
  const [savings, setSavings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [loansRes, savingsRes] = await Promise.all([
        api.get('/loans'),
        api.get('/savings'),
      ]);

      setLoans(loansRes.data);
      setSavings(savingsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const activeLoans = loans.filter(loan => loan.status === 'active' || loan.status === 'approved');
  const totalLoanBalance = activeLoans.reduce((sum, loan) => sum + loan.remainingBalance, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Here's your financial overview</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Savings Balance</h3>
            <p className="text-3xl font-bold text-primary">
              ${savings?.balance?.toFixed(2) || '0.00'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Loans</h3>
            <p className="text-3xl font-bold text-secondary">{activeLoans.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Loan Balance</h3>
            <p className="text-3xl font-bold text-red-600">
              ${totalLoanBalance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/apply-loan"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
            >
              Apply for Loan
            </Link>
            <Link
              to="/savings"
              className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition-colors"
            >
              Manage Savings
            </Link>
          </div>
        </div>

        {/* Recent Loans */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Loans</h2>
          {loans.length === 0 ? (
            <p className="text-gray-600">No loans found. <Link to="/apply-loan" className="text-primary">Apply for your first loan</Link></p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Purpose</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Remaining Balance</th>
                    <th className="px-4 py-2 text-left">Monthly Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan._id} className="border-t">
                      <td className="px-4 py-2">${loan.amount}</td>
                      <td className="px-4 py-2">{loan.purpose}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-sm ${
                          loan.status === 'approved' ? 'bg-green-100 text-green-800' :
                          loan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          loan.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          loan.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {loan.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">${loan.remainingBalance?.toFixed(2)}</td>
                      <td className="px-4 py-2">${loan.monthlyPayment?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;