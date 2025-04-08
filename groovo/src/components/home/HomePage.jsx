import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsSection from '../common/NewsSection';

const HomePage = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
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
        navigate('/entrepreneur/profile');
      } else {
        // Handle other roles
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Groovo</h1>
            <p className="text-xl mb-8">
              Your platform for startup success. Connect with mentors, investors, and collaborators.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthMode('signup');
                }} 
                className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 
                         transition-all duration-300 transform hover:scale-105 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
              >
                Get Started
              </button>
              <button 
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthMode('login');
                }} 
                className="px-6 py-3 bg-transparent text-white border-2 border-white 
                         rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 
                         transform hover:scale-105 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2 font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="container mx-auto px-4 py-16">
        <NewsSection onNewsClick={handleNewsClick} />
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">
              {authMode === 'login' ? 'Login to Groovo' : 'Create your account'}
            </h3>
            
            {authMode === 'signup' && !selectedRole && (
              <div className="mb-6">
                <p className="text-gray-600 mb-4">Select your role:</p>
                <div className="grid grid-cols-1 gap-4">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedRole === role.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => handleRoleSelect(role.id)}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{role.icon}</span>
                        <div>
                          <h4 className="font-semibold">{role.title}</h4>
                          <p className="text-sm text-gray-600">{role.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(authMode === 'login' || selectedRole) && (
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                               focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                               transition-all duration-300" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input type="password" className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                                  focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                  transition-all duration-300" required />
                </div>
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <input type="password" className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                    transition-all duration-300" required />
                  </div>
                )}
                <div className="flex flex-col space-y-3">
                  <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                                                 transition-all duration-300 transform hover:scale-105 focus:outline-none 
                                                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium">
                    {authMode === 'login' ? 'Login' : 'Create Account'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (authMode === 'signup' && selectedRole) {
                        setSelectedRole('');
                      } else {
                        setShowAuthModal(false);
                      }
                    }}
                    className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 
                             rounded-lg hover:bg-blue-50 transition-all duration-300 
                             transform hover:scale-105 focus:outline-none focus:ring-2 
                             focus:ring-blue-500 focus:ring-offset-2 font-medium"
                  >
                    {authMode === 'signup' && selectedRole ? 'Back' : 'Cancel'}
                  </button>
                </div>
                <p className="text-center text-sm text-gray-600">
                  {authMode === 'login' ? (
                    <>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('signup')}
                        className="text-blue-600 hover:underline"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('login')}
                        className="text-blue-600 hover:underline"
                      >
                        Login
                      </button>
                    </>
                  )}
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage; 