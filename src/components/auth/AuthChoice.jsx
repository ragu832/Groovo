import { Link } from 'react-router-dom';

export default function AuthChoice() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Groovo</h1>
          <p className="text-xl text-gray-600">Choose how you'd like to get started</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Sign In Card */}
          <Link
            to="/login"
            className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
            <div className="relative">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                👋
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In</h2>
              <p className="text-gray-600 mb-6">
                Already have an account? Sign in to access your dashboard and continue your journey.
              </p>
              <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-200">
                Sign in now
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Sign Up Card */}
          <Link
            to="/signup"
            className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
            <div className="relative">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                🚀
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h2>
              <p className="text-gray-600 mb-6">
                New to Groovo? Create an account to get started with your entrepreneurial journey.
              </p>
              <div className="inline-flex items-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors duration-200">
                Create account
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Need help?{' '}
            <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 