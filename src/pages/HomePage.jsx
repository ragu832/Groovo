import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsSection from '../components/common/NewsSection';

const HomePage = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    {
      id: 'entrepreneur',
      title: 'Entrepreneur',
      description: 'Start and grow your business with our support',
      icon: '🚀',
    },
    {
      id: 'investor',
      title: 'Investor',
      description: 'Find and invest in promising startups',
      icon: '💰',
    },
    {
      id: 'collaborator',
      title: 'Collaborator',
      description: 'Share your expertise and mentor startups',
      icon: '🤝',
    },
  ];

  const handleNewsClick = () => {
    setShowAuthModal(true);
    setAuthMode('login');
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      if (selectedRole === 'entrepreneur') {
        navigate('/dashboard/entrepreneur');
      } else if (selectedRole === 'investor') {
        navigate('/dashboard/investor');
      } else if (selectedRole === 'collaborator') {
        navigate('/dashboard/collaborator');
      }
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Welcome to Groovo</h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8">
              Your platform for startup success. Connect with mentors, investors, and collaborators.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthMode('signup');
                }} 
                className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </button>
              <button 
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthMode('login');
                }} 
                className="px-6 py-3 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-indigo-600 font-medium transition-all duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <NewsSection onNewsClick={handleNewsClick} />
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 md:p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              {authMode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h3>
            
            {authMode === 'signup' && !selectedRole && (
              <div className="space-y-4">
                <p className="text-gray-600">Choose your role to get started:</p>
                <div className="grid grid-cols-1 gap-4">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedRole === role.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{role.icon}</span>
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-900">{role.title}</h4>
                          <p className="text-sm text-gray-600">{role.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(authMode === 'login' || selectedRole) && (
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>
            )}

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  if (authMode === 'signup' && selectedRole) {
                    setSelectedRole('');
                  } else {
                    setAuthMode(authMode === 'login' ? 'signup' : 'login');
                  }
                }}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                {authMode === 'login'
                  ? "Don't have an account? Sign up"
                  : selectedRole
                  ? '← Back to role selection'
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage; 