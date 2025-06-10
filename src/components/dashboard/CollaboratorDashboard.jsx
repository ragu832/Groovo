import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Import the specific content components (we will create these next)
import PatentOfficerContent from './PatentOfficerContent';
import AuditorContent from './AuditorContent';
import MentorContent from './MentorContent';

const CollaboratorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Determine collaborator type configuration
  const collaboratorType = user?.collaboratorType;
  let config = {
      title: 'Collaborator Hub', 
      color: 'blue', 
      features: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'tasks', label: 'Assigned Tasks', icon: '✅' },
        { id: 'projects', label: 'Projects', icon: '📁' },
        { id: 'communication', label: 'Messages', icon: '💬' },
        { id: 'calendar', label: 'Calendar', icon: '📅' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
      ]
  };

  // Override config based on specific type if available
  if (collaboratorType === 'patent-officer') {
      config = { title: 'Patent Officer Portal', color: 'blue', features: [/* Patent officer specific features */ { id: 'dashboard', label: 'Applications', icon: '📜' }, { id: 'review', label: 'Review Schedule', icon: '📅' }, { id: 'settings', label: 'Settings', icon: '⚙️' } ] };
  } else if (collaboratorType === 'auditor') {
      config = { title: 'Auditor Portal', color: 'green', features: [/* Auditor specific features */ { id: 'dashboard', label: 'Audits', icon: '📊' }, { id: 'schedule', label: 'Audit Schedule', icon: '📅' }, { id: 'settings', label: 'Settings', icon: '⚙️' } ] };
  } else if (collaboratorType === 'mentor') {
      config = { title: 'Mentor Portal', color: 'purple', features: [/* Mentor specific features */ { id: 'dashboard', label: 'Mentees', icon: '👨‍🏫' }, { id: 'sessions', label: 'Sessions', icon: '📅' }, { id: 'settings', label: 'Settings', icon: '⚙️' } ] };
  }

  const [activeFeature, setActiveFeature] = useState(config.features[0]?.id || 'dashboard'); // Default to first feature

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (user.role !== 'collaborator') {
      navigate(`/dashboard/${user.role.toLowerCase()}`); 
    }
     // Set active feature based on potentially updated config
    setActiveFeature(config.features[0]?.id || 'dashboard');
  }, [user, navigate, collaboratorType]); // Add collaboratorType dependency


  if (!user || user.role !== 'collaborator') {
    return null; 
  }

  const handleFeatureClick = (featureId) => {
    setActiveFeature(featureId);
  };
    
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  // Function to render content based on active feature and collaborator type
  const renderContent = () => {
    if (!collaboratorType) {
        return <div className="p-6 bg-white rounded-lg shadow"><p>Loading collaborator details...</p></div>; // Or a generic collaborator view
    }
    
    switch (collaboratorType) {
        case 'patent-officer':
            return <PatentOfficerContent activeFeature={activeFeature} />;
        case 'auditor':
            return <AuditorContent activeFeature={activeFeature} />;
        case 'mentor':
            return <MentorContent activeFeature={activeFeature} />;
        default:
            // Fallback to a generic view if type is somehow unknown
            return <div className="p-6 bg-white rounded-lg shadow"><p>Welcome, Collaborator!</p></div>;
    }
  };


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col`}>
        <div className="p-4 border-b flex items-center justify-between">
           <h2 className={`${isSidebarOpen ? 'block' : 'hidden'} text-xl font-bold text-gray-800`}>
             {config.title}
           </h2>
           <button
             onClick={() => setSidebarOpen(!isSidebarOpen)}
             className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
           >
             <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
             </svg>
           </button>
        </div>

        {/* Navigation Links - Use dynamic config */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {config.features.map((item) => (
            <button
              key={item.id}
              onClick={() => handleFeatureClick(item.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                activeFeature === item.id
                  ? `bg-${config.color}-50 text-${config.color}-600 shadow-md`
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
               <div className={`w-10 h-10 rounded-full bg-${config.color}-100 flex items-center justify-center flex-shrink-0`}>
                   {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                  ) : (
                    <span className={`text-${config.color}-600 font-semibold`}>
                      {getInitials(user?.name)}
                    </span>
                  )}
               </div>
               <div className={`${isSidebarOpen ? 'block' : 'hidden'} overflow-hidden`}>
                 <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                 {/* Display specific collaborator type if available */}
                 <p className="text-xs text-gray-500 capitalize truncate">
                    {user?.collaboratorType?.replace('-', ' ') || user?.role}
                 </p>
               </div>
             </div>
         </div>
      </div>

      {/* Main Content - Render dynamically */}
      <div className="flex-1 overflow-auto p-8">
        {renderContent()} 
      </div>
    </div>
  );
};

export default CollaboratorDashboard; 