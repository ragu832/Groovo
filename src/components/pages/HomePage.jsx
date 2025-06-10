import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Mock data for Business News (can be fetched later)
const businessNewsPreview = [
    { id: 'news1', title: 'Global Tech Stocks Surge on AI Advancements', source: 'Financial Times', date: '2024-08-15', snippet: 'Major tech companies saw significant gains following breakthroughs...' },
    { id: 'news2', title: 'Venture Capital Funding Trends for Q3 2024', source: 'TechCrunch', date: '2024-08-14', snippet: 'Early-stage funding remains robust, particularly in...' },
    { id: 'news3', title: 'Renewable Energy Startups Attract Record Investment', source: 'Bloomberg Green', date: '2024-08-14', snippet: 'Investors are increasingly backing companies focused on...' },
  ];

const HomePage = () => {
  const { user } = useAuth(); // Get user status

  const features = [
    {
      title: 'Entrepreneurs',
      description: 'Get guidance, resources, and connect with investors to launch and scale your venture.',
      icon: '🚀',
      color: 'border-purple-500 bg-purple-50'
    },
    {
      title: 'Investors',
      description: 'Discover promising startups, manage your portfolio, and access analytics.',
      icon: '💰',
      color: 'border-green-500 bg-green-50'
    },
    {
      title: 'Collaborators',
      description: 'Lend your expertise as a mentor, patent officer, or auditor to support the ecosystem.',
      icon: '🤝',
      color: 'border-blue-500 bg-blue-50'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in-down">
            Welcome to <span className="text-blue-600">Groovo</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up">
            Your platform for connecting entrepreneurs, investors, and collaborators. Start 
            your journey today and bring your ideas to life.
          </p>
          <Link
            to="/auth" // Link directs to auth choice page
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up animation-delay-300"
          >
            Get Started
            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Why Choose Groovo?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Everything you need to succeed, whether you're building, investing, or supporting.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-xl border-2 text-center ${feature.color} transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105`}
              >
                <div className="text-5xl mb-4 inline-block">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business News Section - Modified */}
      <section className="py-16 md:py-24 bg-gray-100">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Latest Business News</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Stay informed with the latest market trends and insights.
            </p>
            
            {/* Always render the news grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
                {businessNewsPreview.map((newsItem) => {
                    const newsCardContent = (
                        // The visual card content remains the same
                        <div key={newsItem.id} className="p-6 h-full flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg">
                            <h3 className="font-semibold text-lg text-gray-900 mb-2 leading-tight flex-grow">{newsItem.title}</h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-3">{newsItem.snippet}</p>
                            <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100">
                                <span>{newsItem.source}</span>
                                <span>{newsItem.date}</span>
                            </div>
                             {/* Optional "Read More" prompt only for logged out users, if desired */}
                             {!user && (
                                 <span className="block text-center mt-4 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">Sign in to read more</span>
                             )}
                        </div>
                    );

                    // Conditionally wrap the card
                    return user ? (
                        // Logged-in: Render card directly (can add link later if needed)
                        <div key={newsItem.id} className="cursor-default group">
                           {newsCardContent}
                        </div>
                    ) : (
                        // Logged-out: Wrap card in a Link to /auth
                        <Link key={newsItem.id} to="/auth" className="block group">
                           {newsCardContent}
                        </Link>
                    );
                })}
            </div>

            {/* Optional: Button to dashboard news section for logged-in users */}
            {user && (
                 <div className="text-center mt-12">
                    <Link 
                        to={user ? `/dashboard/${user.role.toLowerCase()}#news` : '/auth'} // Example link to news section
                        className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        View More News in Dashboard
                    </Link>
                </div>
            )}
         </div>
      </section>

      {/* Footer (Optional - Add if needed) */}
      {/* <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          Groovo &copy; {new Date().getFullYear()}
        </div>
      </footer> */}
    </div>
  );
};

export default HomePage; 