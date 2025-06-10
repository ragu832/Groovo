import React from 'react';
import { Link } from 'react-router-dom';

const NewsSection = ({ onNewsClick }) => {
  const newsItems = [
    {
      id: 1,
      title: 'Startup Funding Trends 2024',
      excerpt: 'Discover the latest trends in startup funding and investment opportunities.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Funding',
    },
    {
      id: 2,
      title: 'Innovation in Tech Startups',
      excerpt: 'Explore how technology is shaping the future of entrepreneurship.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Technology',
    },
    {
      id: 3,
      title: 'Sustainable Business Practices',
      excerpt: 'Learn how to build a sustainable and profitable business model.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Sustainability',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Latest Business News</h2>
        <Link
          to="/news"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          View All News
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">{item.excerpt}</p>
              <button
                onClick={onNewsClick}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection; 