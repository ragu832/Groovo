import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const InvestorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeFeature, setActiveFeature] = useState('dashboard');

  // Redirect if not logged in or not an investor
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (user.role !== 'investor') {
      navigate(`/dashboard/${user.role}`);
    }
  }, [user, navigate]);

  // If not authenticated, don't render the dashboard
  if (!user || user.role !== 'investor') {
    return null;
  }

  // Mock data for proposals
  const proposals = [
    {
      id: 1,
      title: 'AI-Powered Healthcare Platform',
      entrepreneur: 'Dr. Sarah Johnson',
      amount: '$500,000',
      status: 'Pending Review',
      date: '2024-03-15',
    },
    {
      id: 2,
      title: 'Sustainable Energy Solution',
      entrepreneur: 'Michael Chen',
      amount: '$750,000',
      status: 'Under Review',
      date: '2024-03-14',
    },
  ];

  // Mock data for recent activity
  const recentActivity = [
    { 
      id: 1, 
      title: 'New proposal received', 
      time: '2 hours ago' 
    },
    { 
      id: 2, 
      title: 'Meeting scheduled with entrepreneur', 
      time: 'Yesterday' 
    },
    { 
      id: 3, 
      title: 'Investment decision made', 
      time: '2 days ago' 
    },
  ];

  // ADDED: Mock data for Wishlist
  const [wishlistedItems, setWishlistedItems] = useState([
    { id: 'prop_1', type: 'proposal', title: 'AI-Powered Healthcare Platform', entrepreneur: 'Dr. Sarah Johnson', status: 'Pending Review' },
    { id: 'prop_2', type: 'proposal', title: 'Sustainable Energy Solution', entrepreneur: 'Michael Chen', status: 'Under Review' },
    { id: 'ent_3', type: 'entrepreneur', name: 'InnovateX Ventures', focus: 'FinTech', stage: 'Seed' },
  ]);

  // ADDED: Mock data for Business News
  const businessNews = [
    { id: 'news1', title: 'Global Tech Stocks Surge on AI Advancements', source: 'Financial Times', date: '2024-08-15', snippet: 'Major tech companies saw significant gains...' },
    { id: 'news2', title: 'Venture Capital Funding Trends for Q3 2024', source: 'TechCrunch', date: '2024-08-14', snippet: 'Early-stage funding remains robust, particularly in...' },
    { id: 'news3', title: 'Renewable Energy Startups Attract Record Investment', source: 'Bloomberg Green', date: '2024-08-14', snippet: 'Investors are increasingly backing companies focused on...' },
  ];

  const handleFeatureClick = (featureId) => {
    setActiveFeature(featureId);
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };
  
  // ADDED: Placeholder function to remove item from wishlist
  const handleRemoveFromWishlist = (itemId) => {
    console.log("Attempting to remove item:", itemId);
    // Simulate removal - In real app, update state after API call
    setWishlistedItems(prev => prev.filter(item => item.id !== itemId));
    // Optionally add feedback to user
  };

  // Function to render content based on active feature
  const renderMainContent = () => {
    const baseContainerClasses = "bg-white rounded-xl shadow-md p-6 animate-fade-in";
    const cardHoverClasses = "transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]";
    const buttonClasses = "transition-colors duration-200 ease-in-out";
    const listItemHoverClasses = "hover:bg-gray-50 transition-colors duration-200 ease-in-out rounded-lg";
    const tableRowHoverClasses = "hover:bg-gray-50 transition-colors duration-200 ease-in-out";

    switch (activeFeature) {
      case 'dashboard':
        return (
           <>
             {/* Apply hover to grid cards */}
             <div className={`${baseContainerClasses} ${cardHoverClasses}`}>{/* Overview */}</div>
             <div className={`${baseContainerClasses} ${cardHoverClasses}`}>{/* Recent Proposals Card */}</div>
             <div className={`${baseContainerClasses} ${cardHoverClasses}`}>{/* Upcoming Meetings Card */}</div>
           </>
         );
      case 'proposals':
        return (
          <div className={`${baseContainerClasses} overflow-x-auto`}>
            <h2 className="text-xl font-semibold mb-4">Investment Proposals</h2>
             <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrepreneur</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                 {proposals.map((proposal) => (
                   // Add hover to table rows
                   <tr key={proposal.id} className={tableRowHoverClasses}>
                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{proposal.title}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proposal.entrepreneur}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{proposal.amount}</td>
                     <td className="px-6 py-4 whitespace-nowrap">
                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ 
                           proposal.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                           proposal.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                           'bg-gray-100 text-gray-800'
                         }`}>
                         {proposal.status}
                       </span>
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proposal.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {/* Add hover to button */}
                        <button className={`text-indigo-600 hover:text-indigo-900 ${buttonClasses}`}>Review</button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
             {proposals.length === 0 && (
                 <p className="text-center text-gray-500 mt-4">No proposals found.</p>
             )}
          </div>
        );
      case 'portfolio':
        return (
          <div className={baseContainerClasses}>
            <h2 className="text-xl font-semibold mb-4">Investment Portfolio</h2>
            <p className="text-gray-600 mb-6">Overview of your active investments.</p>
            {/* Placeholder - Add more detail, e.g., cards per investment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Apply hover to portfolio cards */}
                <div className={`border rounded-lg p-4 ${cardHoverClasses}`}>
                    <h3 className="font-medium">AI Healthcare Platform</h3>
                    <p className="text-sm text-gray-600">Invested: $500,000</p>
                    <p className="text-xs text-gray-500">Date: 2024-04-01</p>
                    <p className="text-sm mt-1">Status: <span className="font-semibold text-green-600">Active</span></p>
                </div>
                 <div className={`border rounded-lg p-4 ${cardHoverClasses}`}>
                    <h3 className="font-medium">Sustainable Energy</h3>
                    <p className="text-sm text-gray-600">Invested: $750,000</p>
                    <p className="text-xs text-gray-500">Date: 2024-05-10</p>
                     <p className="text-sm mt-1">Status: <span className="font-semibold text-green-600">Active</span></p>
                </div>
                {/* Add more investments */} 
            </div>
          </div>
        );
      case 'meetings':
        return (
          <div className={baseContainerClasses}>
            <h2 className="text-xl font-semibold mb-4">Meetings</h2>
            <p className="text-gray-600 mb-6">Your scheduled meetings with entrepreneurs and teams.</p>
            {/* Placeholder - Add calendar or list view */}
            <div className="space-y-3">
                {/* Add hover to meeting items */}
                 <div className={`p-3 border rounded-lg flex justify-between items-center ${listItemHoverClasses}`}>
                    <div>
                        <p className="font-medium">Pitch Meeting - AI Healthcare</p>
                        <p className="text-sm text-gray-500">Tomorrow, 11:00 AM</p>
                    </div>
                     <button className={`text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 ${buttonClasses}`}>Details</button>
                </div>
                 <div className={`p-3 border rounded-lg flex justify-between items-center ${listItemHoverClasses}`}>
                    <div>
                        <p className="font-medium">Portfolio Review - Sustainable Energy</p>
                        <p className="text-sm text-gray-500">Friday, 3:00 PM</p>
                    </div>
                    <button className={`text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 ${buttonClasses}`}>Details</button>
                </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className={baseContainerClasses}>
            <h2 className="text-xl font-semibold mb-4">Investment Analytics</h2>
            <p className="text-gray-600 mb-6">Performance metrics for your portfolio.</p>
            {/* Placeholder - Add charts or key metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {/* Add hover to stat cards */}
                 <div className={`border rounded-lg p-4 text-center ${cardHoverClasses}`}>
                     <p className="text-sm text-gray-500 mb-1">Total Invested</p>
                     <p className="text-2xl font-bold text-green-600">$1.25M</p>
                 </div>
                  <div className={`border rounded-lg p-4 text-center ${cardHoverClasses}`}>
                     <p className="text-sm text-gray-500 mb-1">Estimated ROI</p>
                     <p className="text-2xl font-bold text-green-600">+8.5%</p>
                 </div>
            </div>
            <div className="mt-6 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                 <span className="text-gray-500">Performance Chart Placeholder</span>
            </div>
          </div>
        );
      case 'wishlist':
        return (
          <div className={baseContainerClasses}>
            <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
            <p className="text-gray-600 mb-6">Proposals and entrepreneurs you've saved for later review.</p>
            {wishlistedItems.length > 0 ? (
              <div className="space-y-4">
                {wishlistedItems.map((item) => (
                  <div key={item.id} className={`p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between ${listItemHoverClasses}`}>
                    {item.type === 'proposal' ? (
                       // Proposal item display
                       <div>
                           <p className="text-xs uppercase text-indigo-600 font-semibold mb-1">Proposal</p>
                           <h3 className="font-medium text-gray-900">{item.title}</h3>
                           <p className="text-sm text-gray-500">By: {item.entrepreneur}</p>
                           <span className={`mt-1 inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${ 
                               item.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                               item.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                               'bg-gray-100 text-gray-800'
                             }`}>
                             {item.status}
                           </span>
                       </div>
                    ) : item.type === 'entrepreneur' ? (
                        // Entrepreneur item display
                       <div>
                           <p className="text-xs uppercase text-purple-600 font-semibold mb-1">Entrepreneur / Startup</p>
                           <h3 className="font-medium text-gray-900">{item.name}</h3>
                           <p className="text-sm text-gray-500">Focus: {item.focus}</p>
                           <span className="mt-1 inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                             Stage: {item.stage}
                           </span>
                       </div>
                    ) : null}
                    {/* Remove Button */}
                    <button 
                       onClick={() => handleRemoveFromWishlist(item.id)}
                       className={`mt-3 md:mt-0 md:ml-4 text-xs text-red-600 hover:text-red-800 px-3 py-1 border border-red-300 hover:bg-red-50 rounded-md ${buttonClasses}`}>
                        Remove
                     </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-4">Your wishlist is empty. Add items from proposals or profiles.</p>
            )}
          </div>
        );
      case 'news':
        return (
          <div className={baseContainerClasses}>
            <h2 className="text-xl font-semibold mb-4">Business & Market News</h2>
            <p className="text-gray-600 mb-6">Latest headlines relevant to the investment landscape.</p>
            {businessNews.length > 0 ? (
              <div className="space-y-4">
                {businessNews.map((newsItem) => (
                  <div key={newsItem.id} className={`p-4 border rounded-lg ${listItemHoverClasses}`}>
                     <h3 className="font-medium text-gray-900 mb-1">{newsItem.title}</h3>
                     <p className="text-sm text-gray-700 mb-2">{newsItem.snippet}</p>
                     <div className="flex justify-between items-center">
                       <span className="text-xs text-gray-500">Source: {newsItem.source}</span>
                       <span className="text-xs text-gray-500">{newsItem.date}</span>
                     </div>
                     {/* Optional: Add a link to the full article */}
                     {/* <a href="#" className={`mt-2 inline-block text-xs text-indigo-600 hover:text-indigo-800 ${buttonClasses}`}>Read More</a> */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-4">No recent news items available.</p>
            )}
          </div>
        );
      case 'settings':
        return (
           <div className={baseContainerClasses}>
                <h2 className="text-xl font-semibold mb-4">Investor Settings</h2>
                <p className="text-gray-600">Manage your profile and investment preferences.</p>
                <Link 
                    to="/profile" 
                    className={`inline-block mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 ${buttonClasses}`}>
                     Go to Main Profile Page
                 </Link>
            </div>
        );
      default:
        return <p className="animate-fade-in">Select a feature from the sidebar.</p>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className={`${isSidebarOpen ? 'block' : 'hidden'} text-xl font-bold text-gray-800`}>
            Investor Portal
          </h2>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isSidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"}
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'proposals', label: 'Investment Proposals', icon: '📝' },
            { id: 'portfolio', label: 'Portfolio', icon: '💼' },
            { id: 'meetings', label: 'Meetings', icon: '📅' },
            { id: 'analytics', label: 'Analytics', icon: '📈' },
            { id: 'wishlist', label: 'Wishlist', icon: '⭐' },
            { id: 'news', label: 'Business News', icon: '📰' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleFeatureClick(item.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                activeFeature === item.id
                  ? 'bg-green-50 text-green-600 shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className={`${isSidebarOpen ? 'block' : 'hidden'} font-medium`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Profile Section Minimal */}
        <div className="p-4 border-t mt-auto">
          <div className={`flex items-center ${isSidebarOpen ? 'space-x-3' : 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
              ) : (
                <span className="text-green-600 font-semibold">
                  {getInitials(user?.name)}
                </span>
              )}
            </div>
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} overflow-hidden`}>
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize truncate">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-gray-600 mt-2">Here's your investment dashboard.</p>
        </div>

        {/* Conditionally render content based on activeFeature */}
        {activeFeature === 'dashboard' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMainContent()} {/* Renders the grid items for dashboard view */}
          </div>
        ) : (
          renderMainContent() /* Renders the single content block for other features */
        )}

        {/* Recent Activity (Shown only on dashboard view) */}
        {activeFeature === 'dashboard' && (
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <div className="w-2 h-2 rounded-full bg-green-600 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-gray-800">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard; 