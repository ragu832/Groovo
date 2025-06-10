import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const roles = [
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    description: 'Start and grow your business with expert guidance',
    icon: '💡',
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'hover:from-blue-600 hover:to-blue-700',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'investor',
    title: 'Investor',
    description: 'Discover and invest in promising startups',
    icon: '💰',
    color: 'from-green-500 to-green-600',
    hoverColor: 'hover:from-green-600 hover:to-green-700',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-50'
  },
  {
    id: 'collaborator',
    title: 'Collaborator',
    description: 'Support startups with your expertise',
    icon: '🤝',
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'hover:from-purple-600 hover:to-purple-700',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-50'
  }
];

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleSelect = (role) => {
    if (role.id === 'collaborator') {
      // Navigate to the specific collaborator signup page
      navigate('/signup/collaborator');
    } else {
      // For other roles, proceed to the signup form
      setSelectedRole(role);
      setStep(2);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setIsSubmitting(true);
    setError(''); // Clear previous errors
    try {
      // Simulate API call for basic account creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const basicUserData = {
        name: formData.fullName,
        email: formData.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&background=0D8ABC&color=fff`
      };
      
      if (selectedRole.id === 'entrepreneur') {
         // Store basic details temporarily in case state fails
         sessionStorage.setItem('signup_basic_details', JSON.stringify(basicUserData));
         sessionStorage.setItem('signup_selected_role', selectedRole.id);
         
         // Navigate to details page and STOP further execution here
         const navigationState = { basicDetails: basicUserData, selectedRole: selectedRole.id };
         console.log("SignupPage: Navigating to /signup/entrepreneur/details with state:", navigationState);
         navigate('/signup/entrepreneur/details', { 
            state: navigationState 
         });
         return; 
      } 
      
      if (selectedRole.id === 'investor') {
          // For Investor, add role and login directly
          const investorData = { ...basicUserData, role: 'investor' };
          login(investorData);
          // Redirect investor directly - Also add return for clarity
          navigate(`/dashboard/investor`, { replace: true }); 
          return;
      } 
      
      // If we reach here, the role wasn't entrepreneur or investor
      setError('Invalid role selected for signup.');
      
    } catch (err) {
      console.error("Signup error:", err);
      setError('An error occurred during signup. Please try again.');
    } finally {
      // This will only run if an error occurred or if the role was invalid,
      // because we returned early after successful navigation.
      setIsSubmitting(false);
    }
  };

  const renderRoleSelection = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Choose your role</h2>
        <p className="mt-2 text-lg text-gray-600">Select the role that best describes you</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleSelect(role)}
            className={`group relative p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${role.bgColor} ${role.borderColor} hover:shadow-lg`}
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${role.color} rounded-xl"></div>
            <div className="relative">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {role.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{role.title}</h3>
              <p className="text-gray-600">{role.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderSignupForm = () => (
    <div className="max-w-md mx-auto animate-slide-up">
      <div className="text-center mb-8">
        <button
          onClick={() => setStep(1)}
          className="text-gray-600 hover:text-gray-900 mb-4 inline-flex items-center transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Change Role
        </button>
        <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
        <p className="mt-2 text-lg text-gray-600">Sign up as {selectedRole?.title}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 animate-shake">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r ${selectedRole?.color} ${selectedRole?.hoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
          Sign in
        </Link>
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 ? renderRoleSelection() : (selectedRole && selectedRole.id !== 'collaborator' ? renderSignupForm() : null)}
        </div>
      </div>
    </div>
  );
} 