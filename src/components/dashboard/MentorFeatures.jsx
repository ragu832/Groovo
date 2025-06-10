import React, { useState } from 'react';

const MentorFeatures = ({ activeFeature, mentees }) => {
  const [selectedMentee, setSelectedMentee] = useState(null);

  const defaultMentees = [
    {
      id: 1,
      name: 'TechInnovate',
      founder: 'Alex Chen',
      stage: 'Growth',
      progress: 75,
      nextSession: '2024-03-15',
      roadmap: [
        { phase: 'Market Research', status: 'completed' },
        { phase: 'MVP Development', status: 'in-progress' },
        { phase: 'Customer Validation', status: 'pending' }
      ],
      activities: [
        {
          id: 1,
          type: 'Strategy Session',
          date: '2024-03-15',
          duration: '2 hours',
          focus: 'Product Development',
          notes: 'Review MVP features and market feedback'
        }
      ]
    },
    {
      id: 2,
      name: 'BioHealth',
      founder: 'Sarah Wilson',
      stage: 'Early',
      progress: 45,
      nextSession: '2024-03-18',
      roadmap: [
        { phase: 'Business Plan', status: 'completed' },
        { phase: 'Initial Testing', status: 'in-progress' },
        { phase: 'Regulatory Approval', status: 'pending' }
      ],
      activities: [
        {
          id: 1,
          type: 'Review Meeting',
          date: '2024-03-18',
          duration: '1.5 hours',
          focus: 'Regulatory Strategy',
          notes: 'Discuss compliance requirements'
        }
      ]
    }
  ];

  const menteesList = mentees || defaultMentees;

  const renderMenteesList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {menteesList.map((mentee) => (
        <div key={mentee.id} 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          onClick={() => setSelectedMentee(mentee)}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{mentee.name}</h3>
              <p className="text-sm text-gray-600">{mentee.founder}</p>
              <p className="text-sm text-purple-600 font-medium mt-1">{mentee.stage} Stage</p>
            </div>
            <div className="bg-purple-100 px-3 py-1 rounded-full">
              <span className="text-sm text-purple-700">{mentee.progress}% Complete</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Current Roadmap Phase</h4>
              {mentee.roadmap.map((phase, index) => (
                <div key={index} className="flex items-center space-x-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${
                    phase.status === 'completed' ? 'bg-green-500' :
                    phase.status === 'in-progress' ? 'bg-purple-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="text-sm text-gray-600">{phase.phase}</span>
                </div>
              ))}
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Next Session: {mentee.nextSession}</p>
            </div>
          </div>

          <div className="mt-4 flex space-x-2">
            <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
              View Details
            </button>
            <button className="flex-1 px-4 py-2 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200">
              Add Activity
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMenteeDetails = () => {
    if (!selectedMentee) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedMentee.name}</h2>
                <p className="text-gray-600">{selectedMentee.founder}</p>
              </div>
              <button 
                onClick={() => setSelectedMentee(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Roadmap */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Roadmap</h3>
                <div className="space-y-2">
                  {selectedMentee.roadmap.map((phase, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        phase.status === 'completed' ? 'bg-green-500' :
                        phase.status === 'in-progress' ? 'bg-purple-500' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-gray-700">{phase.phase}</span>
                      <span className="text-sm text-gray-500 capitalize ml-auto">{phase.status.replace('-', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Activities</h3>
                <div className="space-y-3">
                  {selectedMentee.activities.map((activity) => (
                    <div key={activity.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{activity.type}</h4>
                        <span className="text-sm text-gray-500">{activity.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Duration: {activity.duration}</p>
                      <p className="text-sm text-gray-600 mb-2">Focus: {activity.focus}</p>
                      <p className="text-sm text-gray-600">{activity.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Activity Form */}
              <div className="mt-6">
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                  Schedule New Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMentoringSchedule = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
        <div className="space-y-4">
          {defaultMentees.map(mentee => 
            mentee.activities.map(activity => (
              <div key={`${mentee.id}-${activity.id}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{mentee.name}</h3>
                  <p className="text-sm text-gray-600">{activity.type}</p>
                  <p className="text-sm text-purple-600">{activity.date} - {activity.duration}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Join
                  </button>
                  <button className="px-4 py-2 text-sm border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50">
                    Reschedule
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderTimeTracking = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Time Allocation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {defaultMentees.map(mentee => (
            <div key={mentee.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{mentee.name}</h3>
                  <p className="text-sm text-gray-600">{mentee.stage} Stage</p>
                </div>
                <span className="text-sm text-purple-600 font-medium">4 hrs/week</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900">{mentee.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 rounded-full h-2" 
                    style={{ width: `${mentee.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProgressTracking = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {defaultMentees.map(mentee => (
            <div key={mentee.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{mentee.name}</h3>
                  <p className="text-sm text-gray-600">{mentee.stage} Stage</p>
                </div>
              </div>
              <div className="space-y-4">
                {mentee.roadmap.map((phase, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-900">{phase.phase}</span>
                      <span className={`capitalize ${
                        phase.status === 'completed' ? 'text-green-600' :
                        phase.status === 'in-progress' ? 'text-purple-600' : 'text-gray-400'
                      }`}>{phase.status.replace('-', ' ')}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`rounded-full h-2 ${
                          phase.status === 'completed' ? 'bg-green-600' :
                          phase.status === 'in-progress' ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                        style={{ width: phase.status === 'completed' ? '100%' : phase.status === 'in-progress' ? '50%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeFeature) {
      case 'startups':
        return (
          <>
            {renderMenteesList()}
            {renderMenteeDetails()}
          </>
        );
      case 'plans':
        return renderMentoringSchedule();
      case 'time':
        return renderTimeTracking();
      case 'analysis':
        return renderProgressTracking();
      default:
        return renderMenteesList();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {activeFeature === 'startups' ? 'My Mentees' :
           activeFeature === 'plans' ? 'Mentoring Schedule' :
           activeFeature === 'time' ? 'Time Tracking' :
           'Progress Tracking'}
        </h1>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border rounded-lg text-gray-700">
            <option>All Stages</option>
            <option>Early</option>
            <option>Growth</option>
            <option>Mature</option>
          </select>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default MentorFeatures; 