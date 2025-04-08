import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewsSection = ({ onNewsClick }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const newsItems = [
    {
      id: 1,
      title: 'Startup raises Series A funding',
      date: '2024-03-15',
      category: 'Funding',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      summary: 'Tech startup secures $10M in Series A funding to expand operations...',
    },
    {
      id: 2,
      title: 'New policy for IPR announced',
      date: '2024-03-14',
      category: 'Policy',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      summary: 'Government announces new policies to support startup IPR...',
    },
    {
      id: 3,
      title: 'Tech startup ecosystem grows 25%',
      date: '2024-03-13',
      category: 'Industry',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      summary: 'Startup ecosystem shows significant growth in Q1 2024...',
    },
  ];

  const handleNewsClick = () => {
    setShowLoginModal(true);
  };

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Business News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg 
                     transition-all duration-300 p-6 cursor-pointer transform hover:scale-105"
            onClick={handleNewsClick}
          >
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                {item.category}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{item.date}</p>
            <p className="text-gray-700">{item.summary}</p>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNewsClick();
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read More
              </button>
              <span className="text-gray-400 text-sm">Click to login</span>
            </div>
          </div>
        ))}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">Login to Read Full Article</h3>
            <p className="text-gray-600 mb-6">
              Please login or create an account to access the full article content.
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleLogin}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-all duration-300 transform hover:scale-105 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
              >
                Login
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 
                         rounded-lg hover:bg-blue-50 transition-all duration-300 
                         transform hover:scale-105 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsSection; 