import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Grow Your Business with GrowVest
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Access micro-loans and manage your savings to fuel your entrepreneurial journey
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-secondary hover:bg-opacity-80 text-white px-8 py-3 rounded-lg font-semibold text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-4">Micro Loans</h3>
              <p className="text-gray-600">
                Apply for loans tailored to small businesses with flexible repayment terms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🏦</div>
              <h3 className="text-xl font-semibold mb-4">Savings Account</h3>
              <p className="text-gray-600">
                Secure your future with our competitive interest-bearing savings accounts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-4">Financial Dashboard</h3>
              <p className="text-gray-600">
                Track your loans, payments, and savings all in one convenient dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl mb-8">
            Join thousands of entrepreneurs who trust GrowVest for their financial needs.
          </p>
          <Link
            to="/register"
            className="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-lg font-semibold text-lg"
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;