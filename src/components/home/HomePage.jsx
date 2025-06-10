import { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const newsItems = [
    {
      id: 1,
      title: 'The Future of Startup Funding',
      excerpt: 'Discover how modern startups are revolutionizing the funding landscape',
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3',
      category: 'Funding',
    },
    {
      id: 2,
      title: 'Innovation in Tech Startups',
      excerpt: 'Latest trends and innovations driving the tech startup ecosystem',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3',
      category: 'Technology',
    },
    {
      id: 3,
      title: 'Sustainable Business Practices',
      excerpt: 'How startups are leading the way in sustainable business practices',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3',
      category: 'Sustainability',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              Welcome to Groovo
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8">
              Your platform for startup success. Connect with mentors, investors, and collaborators.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/login"
                className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-indigo-600 font-medium transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Latest Business News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm font-medium text-indigo-600">
                  {item.category}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.excerpt}</p>
                <Link
                  to="/login"
                  className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
                >
                  Read More
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 