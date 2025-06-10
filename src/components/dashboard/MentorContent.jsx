import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MentorContent = ({ activeFeature }) => {
  // State to track selected mentee for detail view
  const [selectedMenteeId, setSelectedMenteeId] = useState(null);

  // Enhanced Mock data specific to Mentor with more details
  const mentees = [
    {
      id: 1, 
      name: 'Alice (Startup A)', 
      lastSession: '2024-08-01', 
      nextSession: '2024-08-15', 
      progress: 75, 
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd5ca6c36b?ixlib=rb-1.2.1', 
      // Detailed data
      objectives: ['Finalize pitch deck', 'User testing round 1', 'Develop marketing plan'],
      roadmapSteps: [ {id: 'r1', title: 'Market Research', completed: true}, {id: 'r2', title: 'MVP Development', completed: true}, {id: 'r3', title: 'User Testing', completed: false}, {id: 'r4', title: 'Pitch Deck Refinement', completed: false} ],
      meetings: [{id: 'm1', date:'2024-08-01', duration: '1hr', notes: 'Discussed pitch deck feedback.'}, {id: 'm2', date:'2024-07-15', duration: '45min', notes: 'Reviewed MVP progress.'}],
      performance: { growth: '+15% User Signups', challenges: 'Conversion rate optimization' }
    },
    {
       id: 2, 
       name: 'Bob (Startup B)', 
       lastSession: '2024-08-05', 
       nextSession: '2024-08-19', 
       progress: 50, 
       avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1',
       objectives: ['Secure seed funding', 'Hire lead developer'],
       roadmapSteps: [ {id: 'r1', title: 'Seed Funding Prep', completed: true}, {id: 'r2', title: 'Investor Outreach', completed: false}, {id: 'r3', title: 'Team Expansion', completed: false} ],
       meetings: [{id: 'm1', date:'2024-08-05', duration: '1hr', notes: 'Investor pitch practice.'}, {id: 'm2', date:'2024-07-20', duration: '1hr', notes: 'Funding strategy discussion.'}],
       performance: { growth: '+5 Investor Meetings Scheduled', challenges: 'Technical hiring pipeline' }
    },
     { 
      id: 3, 
      name: 'Charlie (Startup C)', 
      lastSession: '2024-07-28', 
      nextSession: '2024-08-12', 
      progress: 90, 
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1',
      objectives: ['Scale marketing efforts', 'Improve user retention'],
      roadmapSteps: [ {id: 'r1', title: 'Initial Launch', completed: true}, {id: 'r2', title: 'Growth Marketing Phase 1', completed: true}, {id: 'r3', title: 'Retention Analysis', completed: true}, {id: 'r4', title: 'Scaling Strategy', completed: false} ],
       meetings: [{id: 'm1', date:'2024-07-28', duration: '1hr', notes: 'Reviewed marketing campaign results.'}],
       performance: { growth: '+30% Monthly Active Users', challenges: 'Infrastructure scaling' }
     },
  ];
  
  const sessions = [
      { id: 1, title: 'Session with Alice', time: 'Next Monday, 11:00 AM', type: 'upcoming' },
      { id: 2, title: 'Session with Bob', time: 'Next Wednesday, 3:00 PM', type: 'upcoming' },
      { id: 3, title: 'Feedback for Charlie', time: 'Due Today', type: 'task' },
  ];

  const baseContainerClasses = "bg-white rounded-xl shadow-md p-6 animate-fade-in";
  const cardHoverClasses = "transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]";
  const buttonClasses = "transition-colors duration-200 ease-in-out";
  const listItemHoverClasses = "hover:bg-gray-50 transition-colors duration-200 ease-in-out rounded-lg";

  // Find the selected mentee data
  const selectedMentee = selectedMenteeId ? mentees.find(m => m.id === selectedMenteeId) : null;

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'dashboard': // Mentees Grid or Detail View
        
        if (selectedMentee) {
           // --- RENDER MENTEE DETAIL VIEW --- 
           return (
              <div className={baseContainerClasses.replace('animate-fade-in', '')}>
                 <button 
                    onClick={() => setSelectedMenteeId(null)}
                    className={`mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-800 ${buttonClasses}`}
                  >
                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                     Back to Mentees
                 </button>

                 {/* Mentee Header */}
                 <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
                     <img src={selectedMentee.avatar} alt={selectedMentee.name} className="w-16 h-16 rounded-full shadow-md"/>
                     <div>
                         <h2 className="text-2xl font-bold text-gray-900">{selectedMentee.name}</h2>
                         <p className="text-sm text-gray-500">Next Session: {selectedMentee.nextSession}</p>
                     </div>
                 </div>
                 
                 {/* Details Grid */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Column 1 */}
                    <div className="space-y-6">
                       {/* Plans/Objectives */}
                       <div>
                           <h3 className="text-lg font-semibold text-gray-800 mb-3">Current Objectives (Plans)</h3>
                           <ul className="list-disc list-inside space-y-1 text-gray-700 pl-2">
                               {selectedMentee.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                           </ul>
                       </div>

                       {/* Allocated Time / Meetings */}
                        <div>
                           <h3 className="text-lg font-semibold text-gray-800 mb-3">Session History (Time)</h3>
                           <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                              {selectedMentee.meetings.map(meet => (
                                 <div key={meet.id} className="text-sm p-2 border rounded-md bg-gray-50">
                                     <p className="font-medium">{meet.date} ({meet.duration})</p>
                                     <p className="text-gray-600 text-xs">Notes: {meet.notes}</p>
                                 </div>
                              ))}
                           </div>
                       </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6">
                        {/* Analysis (Growth/Loss) */}
                       <div>
                           <h3 className="text-lg font-semibold text-gray-800 mb-3">Performance Analysis</h3>
                           <div className="p-4 border rounded-lg bg-indigo-50">
                              <p className="text-sm font-medium text-indigo-800">Key Growth:</p>
                              <p className="text-indigo-700 mb-2">{selectedMentee.performance.growth}</p>
                              <p className="text-sm font-medium text-red-800">Key Challenges:</p>
                              <p className="text-red-700">{selectedMentee.performance.challenges}</p>
                           </div>
                       </div>
                        
                       {/* Roadmap / Personalized Roadmap */}
                        <div>
                           <h3 className="text-lg font-semibold text-gray-800 mb-3">Personalized Roadmap</h3>
                            <div className="space-y-2">
                              {selectedMentee.roadmapSteps.map((step, index) => (
                                <div key={step.id} className="flex items-center p-2 rounded-md border bg-white">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs flex-shrink-0 ${step.completed ? 'bg-purple-600 text-white' : 'border-2 border-purple-300 text-purple-600'}`}>
                                    {step.completed ? '✓' : index + 1}
                                  </div>
                                  <span className={`text-sm ${step.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{step.title}</span>
                                </div>
                              ))}
                            </div>
                       </div>
                    </div>
                 </div>
              </div>
           );
        }
        
        // --- RENDER MENTEES GRID (Default View) --- 
        return (
          <div className={baseContainerClasses.replace('animate-fade-in', '')}>
            <h2 className="text-xl font-semibold mb-4">Your Mentees</h2>
             <p className="text-gray-600 mb-6">Overview of your current mentees and their progress.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mentees.map(mentee => (
                    <div key={mentee.id} className={`p-4 bg-white rounded-lg border border-gray-200 shadow-sm ${cardHoverClasses}`}>
                         <div className="flex items-center space-x-3 mb-3">
                             <img src={mentee.avatar} alt={mentee.name} className="w-12 h-12 rounded-full"/>
                             <div>
                                 <h3 className="font-medium text-gray-900">{mentee.name}</h3>
                                 <p className="text-xs text-gray-500">Next Session: {mentee.nextSession}</p>
                             </div>
                         </div>
                          <p className="text-sm text-gray-600 mb-1">Progress:</p>
                         <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div className={`bg-purple-600 h-2.5 rounded-full transition-width duration-500 ease-in-out`} style={{ width: `${mentee.progress}%` }}></div>
                         </div>
                         <button 
                            onClick={() => setSelectedMenteeId(mentee.id)} // Set selected mentee on click
                            className={`mt-3 text-xs text-purple-700 hover:text-purple-900 font-medium ${buttonClasses}`}
                          >
                             View Details
                          </button>
                    </div>
                  ))}
                  {mentees.length === 0 && (
                       <p className="text-gray-500 md:col-span-2 lg:col-span-3">No mentees assigned yet.</p>
                  )}
              </div>
          </div>
        );

      case 'sessions': // Sessions Schedule
        return (
          <div className={baseContainerClasses.replace('animate-fade-in', '')}>
            <h2 className="text-xl font-semibold mb-4">Mentoring Sessions & Tasks</h2>
            <p className="text-gray-600 mb-6">Upcoming sessions and pending tasks.</p>
             <div className="space-y-3">
                 {sessions.map(item => (
                     <div key={item.id} className={`p-3 border rounded-lg flex justify-between items-center ${listItemHoverClasses}`}>
                         <div>
                             <p className="font-medium">{item.title}</p>
                             <p className={`text-sm ${item.type === 'upcoming' ? 'text-blue-600' : 'text-red-600'}`}>{item.time}</p>
                         </div>
                          <button className={`text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 ${buttonClasses}`}>View</button>
                     </div>
                 ))}
                 {sessions.length === 0 && (
                      <p className="text-gray-500">No scheduled items or tasks.</p>
                 )}
             </div>
          </div>
        );
        case 'settings':
             return (
                 <div className={baseContainerClasses.replace('animate-fade-in', '')}>
                    <h2 className="text-xl font-semibold mb-4">Mentor Settings</h2>
                     <p className="text-gray-600">Manage availability, expertise, and account details.</p>
                      <Link 
                        to="/profile" 
                        className={`inline-block mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-105 ${buttonClasses}`}>
                         Go to Main Profile Page
                     </Link>
                 </div>
            );
      default:
        return <p className="animate-fade-in">Select a feature from the sidebar.</p>;
    }
  };

  return (
    <>{renderFeatureContent()}</>
  );
};

export default MentorContent; 