import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const EntrepreneurDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeFeature, setActiveFeature] = useState('dashboard');

  // Chatbot State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
      { sender: 'bot', text: "Hello! I'm your AI assistant. How can I help with your venture today?" }
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef(null); // Ref to scroll to bottom

  // Redirect if not logged in or not an entrepreneur
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (user.role !== 'entrepreneur') {
      navigate(`/dashboard/${user.role}`);
    }
  }, [user, navigate]);

  // If not authenticated, don't render the dashboard
  if (!user || user.role !== 'entrepreneur') {
    return null;
  }

  const roadmapSteps = [
    { id: 1, title: 'Business Plan', completed: true },
    { id: 2, title: 'Market Research', completed: true },
    { id: 3, title: 'MVP Development', completed: false },
    { id: 4, title: 'Patent Research', completed: false },
    { id: 5, title: 'IPR Filing', completed: false },
    { id: 6, title: 'Mentor Connection', completed: false },
    { id: 7, title: 'Funding Preparation', completed: false },
  ];

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      expertise: 'Patent Law & IPR',
      availability: 'Available',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1',
    },
    {
      id: 2,
      name: 'Michael Chen',
      expertise: 'Tech Startups',
      availability: 'Busy',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1',
    },
  ];

  // Recent activity data
  const recentActivity = [
    { 
      id: 1, 
      title: 'New investor viewed your pitch', 
      time: '2 hours ago' 
    },
    { 
      id: 2, 
      title: 'Mentor feedback received', 
      time: 'Yesterday' 
    },
    { 
      id: 3, 
      title: 'Updated company profile', 
      time: '2 days ago' 
    },
  ];

  // ADDED: Mock data for Business News
  const businessNews = [
    { id: 'news1', title: 'New Government Grants Available for Tech Startups', source: 'Gov. Gazette', date: '2024-08-15', snippet: 'Funding opportunities announced for early-stage tech companies...' },
    { id: 'news2', title: 'Emerging Trends in Sustainable Packaging Solutions', source: 'Industry Insights', date: '2024-08-14', snippet: 'Consumer demand and regulations are driving innovation in...' },
    { id: 'news3', title: 'Tips for Perfecting Your Elevator Pitch for Investors', source: 'Startup Weekly', date: '2024-08-13', snippet: 'Crafting a compelling and concise pitch is key to...' },
  ];

  const handleFeatureClick = (featureId) => {
    setActiveFeature(featureId);
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };
  
  // Effect to scroll chat to bottom when new message added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Placeholder function for sending chat message (replace with API call)
  const handleSendMessage = async () => {
    const userMessage = chatInput.trim();
    if (!userMessage) return; // Don't send empty messages

    // Add user message to history
    setChatHistory(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput(''); // Clear input
    setIsBotTyping(true);

    // --- API Integration Point --- 
    // Replace setTimeout with your actual API call
    try {
      console.log("Simulating API call for message:", userMessage);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      // Simulate a response based on input (very basic example)
      let botResponseText = "Thanks for your message! I'm still learning how to respond properly.";
      if (userMessage.toLowerCase().includes('funding')) {
          botResponseText = "Funding can be challenging! Have you explored the Funding section of the dashboard? I can also look up potential investor matches based on your profile.";
      } else if (userMessage.toLowerCase().includes('roadmap')) {
           botResponseText = "Let's check your roadmap progress. Which specific step are you working on or need help with?";
      } else if (userMessage.toLowerCase().includes('ipr')) {
            botResponseText = "Intellectual Property is crucial. The IPR Support section has resources, and I can connect you with patent experts if needed.";
      }

      // Add bot response to history
      setChatHistory(prev => [...prev, { sender: 'bot', text: botResponseText }]);

    } catch (error) {
      console.error("Chatbot API error (simulation):", error);
      setChatHistory(prev => [...prev, { sender: 'bot', text: "Sorry, I encountered an error trying to respond." }]);
    } finally {
      setIsBotTyping(false);
    }
    // --- End API Integration Point ---
  };
  
  // Handle Enter key press in chat input
  const handleChatInputKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); // Prevent newline
          handleSendMessage();
      }
  };

  // Function to render content based on active feature
  const renderMainContent = () => {
    const baseContainerClasses = "bg-white rounded-xl shadow-md p-6 animate-fade-in"; 
    const cardHoverClasses = "transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]";
    const buttonClasses = "transition-colors duration-200 ease-in-out";
    const listItemHoverClasses = "hover:bg-gray-50 transition-colors duration-200 ease-in-out rounded-lg";

    switch (activeFeature) {
      case 'dashboard':
        return (
           <>
             {/* Apply hover to grid cards */}
             <div className={`${baseContainerClasses} ${cardHoverClasses}`}>{/* Overview */}</div>
             <div className={`${baseContainerClasses} ${cardHoverClasses}`}>{/* Pending Tasks */}</div>
             <div className={`${baseContainerClasses} ${cardHoverClasses}`}>{/* Upcoming Meetings */}</div>
           </>
         );
      case 'startups':
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">My Startups</h2>
            <p className="text-gray-600">List of startups you are managing will appear here.</p>
            {/* Placeholder for startup list */}
          </div>
        );
      case 'plans':
         return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Business Plans</h2>
            <p className="text-gray-600">Submitted business plans will appear here.</p>
            {/* Placeholder for business plan list */}
          </div>
        );
       case 'funding':
         return (
          <div className={baseContainerClasses}>
            <h2 className="text-xl font-semibold mb-4">Funding Status</h2>
            <p className="text-gray-600 mb-6">Track your funding applications and milestones.</p>
             <div className={`border rounded-lg p-4 ${cardHoverClasses}`}>
                <h3 className="font-medium mb-2">Seed Round Application</h3>
                <p className="text-sm text-gray-600 mb-1">Status: <span className="font-semibold text-yellow-600">Under Review</span></p>
                <p className="text-xs text-gray-500">Submitted: 2024-07-15</p>
                 <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden"> {/* Added overflow-hidden */}
                   <div className={`bg-yellow-500 h-2.5 rounded-full transition-width duration-500 ease-in-out`} style={{ width: '50%' }}></div>
                 </div>
             </div>
             {/* Add more application examples or history */}
          </div>
        );
        case 'investors':
         return (
          <div className={baseContainerClasses}>
            <h2 className="text-xl font-semibold mb-4">Find Mentors & Investors</h2>
            <p className="text-gray-600 mb-6">Connect with experienced mentors and potential investors.</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 border rounded-lg ${cardHoverClasses}`}>
                    <h3 className="font-semibold mb-2 text-indigo-700">Available Mentors</h3>
                     {mentors.map(mentor => (
                         <div key={mentor.id} className={`flex items-center space-x-3 p-2 border-b last:border-b-0 ${listItemHoverClasses}`}>
                             <img src={mentor.image} alt={mentor.name} className="w-10 h-10 rounded-full"/>
                             <div>
                                <p className="font-medium text-sm">{mentor.name}</p>
                                <p className="text-xs text-gray-500">{mentor.expertise}</p>
                             </div>
                              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${mentor.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{mentor.availability}</span>
                         </div>
                     ))}
                 </div>
                 <div className={`p-4 border rounded-lg ${cardHoverClasses}`}>
                     <h3 className="font-semibold mb-2 text-indigo-700">Potential Investors</h3>
                     <p className="text-sm text-gray-500">(Investor matching feature coming soon)</p>
                     {/* Placeholder for investor list/matching */}
                 </div>
             </div>
          </div>
        );
       case 'roadmap':
        return (
          <div className={baseContainerClasses}>
            <h2 className="text-xl font-semibold mb-4">Startup Roadmap</h2>
            <p className="text-gray-600 mb-6">Track your progress through the key stages of building your venture.</p>
            <div className="space-y-4">
              {roadmapSteps.map((step, index) => (
                <div key={step.id} className={`flex items-center p-3 border border-gray-200 ${listItemHoverClasses}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${step.completed ? 'bg-indigo-600 text-white' : 'border-2 border-indigo-300 text-indigo-600'}`}>
                    {step.completed ? 
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> 
                       : 
                       <span>{index + 1}</span>
                    }
                  </div>
                  <span className={`font-medium ${step.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{step.title}</span>
                   {/* Add completion toggle or link if needed */}
                </div>
              ))}
            </div>
          </div>
        );
       case 'ipr':
        return (
          <div className={baseContainerClasses}>
            <h2 className="text-xl font-semibold mb-4">IPR Support</h2>
            <p className="text-gray-600 mb-6">Connect with experts and access resources for your Intellectual Property.</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 border rounded-lg ${cardHoverClasses}`}>
                    <h3 className="font-semibold mb-2 text-indigo-700">IP Resources</h3>
                     <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Patent search databases</li>
                        <li>Trademark filing guides</li>
                        <li>IP strategy templates</li>
                        <li>Understanding NDAs</li>
                     </ul>
                </div>
                <div className={`p-4 border rounded-lg ${cardHoverClasses}`}>
                    <h3 className="font-semibold mb-2 text-indigo-700">Connect with Patent Experts</h3>
                    <p className="text-sm text-gray-600 mb-3">Schedule a consultation with available patent officers or IPR mentors.</p>
                    {/* Example Mentor/Officer card - reuse mentor data or specific patent officer data */}
                    {mentors.filter(m => m.expertise.includes('IPR')).map(expert => (
                         <div key={expert.id} className={`flex items-center space-x-3 p-2 border-b last:border-b-0 ${listItemHoverClasses}`}>
                             <img src={expert.image} alt={expert.name} className="w-10 h-10 rounded-full"/>
                             <div>
                                <p className="font-medium text-sm">{expert.name}</p>
                                <p className="text-xs text-gray-500">{expert.expertise}</p>
                             </div>
                              <button className={`ml-auto text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 ${buttonClasses}`}>Connect</button>
                         </div>
                    ))}
                     {mentors.filter(m => m.expertise.includes('IPR')).length === 0 && (
                        <p className="text-sm text-gray-500">No specific IPR experts currently listed.</p>
                    )}
                </div>
             </div>
          </div>
        );
      case 'chatbot':
        return (
          <div className={`${baseContainerClasses.replace('p-6', '')} p-0 flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)]`}> 
            <h2 className="text-xl font-semibold mb-4 px-6 pt-6 flex-shrink-0">AI Assistant Chat</h2>

             {/* Chat History Area: Scrolls vertically */}
             <div className="flex-grow overflow-y-auto mb-4 px-6 space-y-4">
                 {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                       {/* Message Bubble Styling */}
                       <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow ${ 
                           msg.sender === 'user' 
                             ? 'bg-indigo-500 text-white' 
                             : 'bg-gray-100 text-gray-800' 
                       }`}>
                          {msg.text}
                       </div>
                    </div>
                 ))}
                 
                 {/* Typing Indicator */}
                 {isBotTyping && (
                    <div className="flex justify-start">
                       <div className="px-4 py-2 rounded-lg shadow bg-gray-100 text-gray-500 animate-pulse">
                           Typing...
                       </div>
                    </div>
                 )}

                 {/* Empty div at the end to scroll to */}
                 <div ref={chatEndRef} /> 
             </div>
             
             {/* Input Area: Fixed at the bottom */}
             <div className="mt-auto p-6 border-t bg-white rounded-b-xl flex items-center space-x-2 flex-shrink-0">
                 <textarea
                     value={chatInput}
                     onChange={(e) => setChatInput(e.target.value)}
                     onKeyPress={handleChatInputKeyPress}
                     placeholder="Ask your AI assistant..."
                     className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                     rows={1} // Start with 1 row, can expand
                 />
                 <button 
                    onClick={handleSendMessage}
                    disabled={isBotTyping || !chatInput.trim()}
                    className={`px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed ${buttonClasses}`}
                 >
                    Send
                 </button>
             </div>
          </div>
        );
      case 'news':
        return (
          <div className={baseContainerClasses}>
            <h2 className="text-xl font-semibold mb-4">Relevant Business News</h2>
            <p className="text-gray-600 mb-6">Stay updated with news affecting your industry and the startup ecosystem.</p>
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
                <h2 className="text-xl font-semibold mb-4">Entrepreneur Settings</h2>
                <p className="text-gray-600">Manage your profile and settings.</p>
                 <Link 
                    to="/profile" 
                    className={`inline-block mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 ${buttonClasses}`}>
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
                Entrepreneur Hub
             </h2>
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                 <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} /></svg>
              </button>
         </div>
         
         <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'roadmap', label: 'Startup Roadmap', icon: '🗺️' },
              { id: 'ipr', label: 'IPR Support', icon: '📜' },
              { id: 'funding', label: 'Funding', icon: '💰' },
              { id: 'investors', label: 'Mentors/Investors', icon: '🤝' },
              { id: 'chatbot', label: 'AI Assistant', icon: '🤖' },
              { id: 'news', label: 'Business News', icon: '📰' },
              { id: 'settings', label: 'Settings', icon: '⚙️' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleFeatureClick(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                  activeFeature === item.id
                    ? 'bg-indigo-50 text-indigo-600 shadow-md'
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
                 <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                     {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                    ) : (
                      <span className="text-indigo-600 font-semibold">
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
          <p className="text-gray-600 mt-2">Here's what's happening with your venture.</p>
        </div>

        {/* Conditionally render content based on activeFeature */}
        {activeFeature === 'dashboard' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderMainContent()} { /* Renders the grid items for dashboard view */}
            </div>
         ) : (
             renderMainContent() /* Renders the single content block for other features */
         )}
         
         {/* Recent Activity (Shown only on dashboard view) */}
         {activeFeature === 'dashboard' && (
             <div className="mt-8 bg-white rounded-xl shadow-md p-6">
                 <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                 <div className="space-y-4">
                    <p className="text-gray-700">Funding round closed successfully.</p>
                    <p className="text-gray-700">New team member joined.</p>
                 </div>
             </div>
         )}

      </div>
    </div>
  );
};

export default EntrepreneurDashboard; 