import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

// Animated Card Component
export const AnimatedCard = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

AnimatedCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  delay: PropTypes.number,
};

// Glassmorphism Card
export const GlassCard = ({ children, className = '' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 ${className}`}
    >
      {children}
    </motion.div>
  );
};

GlassCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// Gradient Button
export const GradientButton = ({ children, onClick, className = '', variant = 'primary' }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800',
    secondary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${variants[variant]} text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 ${className}`}
    >
      {children}
    </motion.button>
  );
};

GradientButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
};

// Stat Card with Animation
export const StatCard = ({ icon, title, value, trend, delay = 0 }) => {
  return (
    <AnimatedCard delay={delay} className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <motion.h3
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: 'spring' }}
            className="text-3xl font-bold text-gray-900"
          >
            {value}
          </motion.h3>
          {trend && (
            <p className={`text-sm mt-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </p>
          )}
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-4xl text-primary-500"
        >
          {icon}
        </motion.div>
      </div>
    </AnimatedCard>
  );
};

StatCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.number,
  delay: PropTypes.number,
};

// Progress Bar
export const ProgressBar = ({ progress, className = '' }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-3 overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full"
      />
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  className: PropTypes.string,
};

// Loading Skeleton
export const Skeleton = ({ className = '', count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gray-300 rounded ${className}`}
        />
      ))}
    </>
  );
};

Skeleton.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number,
};

// Status Badge
export const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: <FiAlertCircle /> },
    approved: { color: 'bg-blue-100 text-blue-800', icon: <FiCheckCircle /> },
    disbursed: { color: 'bg-green-100 text-green-800', icon: <FiCheckCircle /> },
    rejected: { color: 'bg-red-100 text-red-800', icon: <FiXCircle /> },
    repaid: { color: 'bg-gray-100 text-gray-800', icon: <FiCheckCircle /> },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
      {config.icon}
      {status}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

// Floating Action Button
export const FloatingButton = ({ icon, onClick, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl z-50 ${className}`}
    >
      {icon}
    </motion.button>
  );
};

FloatingButton.propTypes = {
  icon: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

// Modal Component
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};
