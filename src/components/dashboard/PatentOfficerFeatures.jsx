import React, { useState } from 'react';

const PatentOfficerFeatures = ({ activeFeature }) => {
  const [selectedPatent, setSelectedPatent] = useState(null);

  const patents = [
    {
      id: 1,
      title: 'AI-Driven Data Analysis System',
      applicationNumber: '2024-001',
      company: 'TechInnovate',
      applicant: 'Alex Chen',
      filingDate: '2024-02-15',
      status: 'Under Review',
      category: 'AI/ML',
      progress: 75,
      documents: [
        { name: 'Patent Application', status: 'submitted', date: '2024-02-15' },
        { name: 'Technical Specifications', status: 'pending', date: '2024-02-20' },
        { name: 'Prior Art Search', status: 'in-progress', date: '2024-03-01' }
      ],
      timeline: [
        { date: '2024-02-15', event: 'Application Submitted', status: 'completed' },
        { date: '2024-03-01', event: 'Initial Review', status: 'in-progress' },
        { date: '2024-03-15', event: 'Technical Assessment', status: 'pending' }
      ]
    },
    {
      id: 2,
      title: 'Biomedical Device for Remote Patient Monitoring',
      applicationNumber: '2024-002',
      company: 'BioHealth',
      applicant: 'Sarah Wilson',
      filingDate: '2024-02-20',
      status: 'Documentation Required',
      category: 'Healthcare',
      progress: 45,
      documents: [
        { name: 'Patent Application', status: 'submitted', date: '2024-02-20' },
        { name: 'Clinical Data', status: 'missing', date: null },
        { name: 'Device Specifications', status: 'submitted', date: '2024-02-25' }
      ],
      timeline: [
        { date: '2024-02-20', event: 'Application Submitted', status: 'completed' },
        { date: '2024-02-25', event: 'Document Review', status: 'completed' },
        { date: '2024-03-10', event: 'Technical Assessment', status: 'blocked' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'submitted': 'green',
      'in-progress': 'blue',
      'pending': 'yellow',
      'missing': 'red',
      'blocked': 'red',
      'completed': 'green'
    };
    return colors[status] || 'gray';
  };

  const renderPatentsList = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {patents.map((patent) => (
        <div key={patent.id} 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          onClick={() => setSelectedPatent(patent)}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{patent.title}</h3>
              <p className="text-sm text-gray-600">Application #{patent.applicationNumber}</p>
              <p className="text-sm text-blue-600 font-medium mt-1">{patent.company}</p>
            </div>
            <div className={`px-3 py-1 rounded-full bg-${
              patent.status === 'Under Review' ? 'yellow' : 'red'
            }-100`}>
              <span className={`text-sm text-${
                patent.status === 'Under Review' ? 'yellow' : 'red'
              }-800`}>
                {patent.status}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Required Documents</h4>
              <div className="space-y-2">
                {patent.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{doc.name}</span>
                    <span className={`text-sm text-${getStatusColor(doc.status)}-600 capitalize`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Filed: {patent.filingDate}</span>
              <span className="text-sm font-medium text-blue-600">{patent.progress}% Complete</span>
            </div>
          </div>

          <div className="mt-4">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Review Application
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPatentDetails = () => {
    if (!selectedPatent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedPatent.title}</h2>
                <p className="text-gray-600">Application #{selectedPatent.applicationNumber}</p>
                <p className="text-blue-600 mt-1">{selectedPatent.company}</p>
              </div>
              <button 
                onClick={() => setSelectedPatent(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Timeline */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Timeline</h3>
                <div className="space-y-4">
                  {selectedPatent.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`mt-1 w-3 h-3 rounded-full bg-${getStatusColor(event.status)}-500`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{event.event}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
                <div className="space-y-3">
                  {selectedPatent.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        {doc.date && <p className="text-sm text-gray-500">Submitted: {doc.date}</p>}
                      </div>
                      <span className={`px-2 py-1 text-sm rounded-full bg-${getStatusColor(doc.status)}-100 text-${getStatusColor(doc.status)}-800 capitalize`}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Update Status
              </button>
              <button className="flex-1 px-4 py-2 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                Request Documents
              </button>
              <button className="flex-1 px-4 py-2 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                Schedule Review
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReviewSchedule = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Reviews</h2>
        <div className="space-y-4">
          {patents.map(patent => (
            <div key={patent.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{patent.title}</h3>
                <p className="text-sm text-gray-600">Application #{patent.applicationNumber}</p>
                <p className="text-sm text-blue-600">{patent.company}</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Start Review
                </button>
                <button className="px-4 py-2 text-sm border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50">
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTimeTracking = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Time Allocation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {patents.map(patent => (
            <div key={patent.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{patent.title}</h3>
                  <p className="text-sm text-gray-600">Application #{patent.applicationNumber}</p>
                </div>
                <span className="text-sm text-blue-600 font-medium">6 hrs allocated</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Review Progress</span>
                  <span className="text-gray-900">{patent.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 rounded-full h-2" 
                    style={{ width: `${patent.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIPAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">IP Analysis Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {patents.map(patent => (
            <div key={patent.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{patent.title}</h3>
                  <p className="text-sm text-gray-600">{patent.category}</p>
                </div>
              </div>
              <div className="space-y-4">
                {patent.timeline.map((event, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-900">{event.event}</span>
                      <span className={`capitalize ${
                        event.status === 'completed' ? 'text-green-600' :
                        event.status === 'in-progress' ? 'text-blue-600' : 'text-gray-400'
                      }`}>{event.status.replace('-', ' ')}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`rounded-full h-2 ${
                          event.status === 'completed' ? 'bg-green-600' :
                          event.status === 'in-progress' ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        style={{ width: event.status === 'completed' ? '100%' : event.status === 'in-progress' ? '50%' : '0%' }}
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
            {renderPatentsList()}
            {renderPatentDetails()}
          </>
        );
      case 'plans':
        return renderReviewSchedule();
      case 'time':
        return renderTimeTracking();
      case 'analysis':
        return renderIPAnalysis();
      default:
        return renderPatentsList();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {activeFeature === 'startups' ? 'Patent Applications' :
           activeFeature === 'plans' ? 'Review Schedule' :
           activeFeature === 'time' ? 'Time Tracking' :
           'IP Analysis'}
        </h1>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border rounded-lg text-gray-700">
            <option>All Categories</option>
            <option>AI/ML</option>
            <option>Healthcare</option>
            <option>Fintech</option>
          </select>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default PatentOfficerFeatures; 