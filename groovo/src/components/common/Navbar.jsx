import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
    // In a real app, you would trigger the login modal here
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Groovo
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
            <button onClick={handleLogin} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                                                  transition-all duration-300 transform hover:scale-105 focus:outline-none 
                                                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium">
              Login
            </button>
            <button 
              onClick={handleLogin} 
              className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 
                       rounded-lg hover:bg-blue-50 transition-all duration-300 
                       transform hover:scale-105 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2 font-medium"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <button
                onClick={() => {
                  handleLogin();
                  setIsMenuOpen(false);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-all duration-300 transform hover:scale-105 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
              >
                Login
              </button>
              <button
                onClick={() => {
                  handleLogin();
                  setIsMenuOpen(false);
                }}
                className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 
                         rounded-lg hover:bg-blue-50 transition-all duration-300 
                         transform hover:scale-105 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2 font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 