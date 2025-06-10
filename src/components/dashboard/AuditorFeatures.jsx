import React, { useState } from 'react';

const AuditorFeatures = ({ activeFeature }) => {
  const [selectedStartup, setSelectedStartup] = useState(null);

  const startups = [
    {
      id: 1,
      name: 'TechInnovate Solutions',
      stage: 'Series A',
      lastAudit: '2024-02-15',
      nextAudit: '2024-05-15',
      financials: {
        revenue: '2.5M',
        expenses: '1.8M',
        growth: 32,
        runway: '18 months'
      },
      documents: ['Financial Statements', 'Tax Returns', 'Bank Statements'],
      status: 'In Progress'
    },
    // Add more sample data as needed
  ];

  const getStatusColor = (status) => {
    const colors = {
      'submitted': 'green',
      'pending': 'yellow',
      'warning': 'yellow',
      'success': 'green',
      'info': 'blue'
    };
    return colors[status] || 'gray';
  };

  const renderAuditSchedule = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Audits</h2>
        <div className="space-y-4">
          {startups.map(startup => (
            <div key={startup.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{startup.name}</h3>
                <p className="text-sm text-gray-600">Next Audit: {startup.nextAudit}</p>
                <p className="text-sm text-blue-600">Stage: {startup.stage}</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Start Audit
                </button>
                <button className="px-4 py-2 text-sm border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50">
                  View Documents
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
          {startups.map(startup => (
            <div key={startup.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{startup.name}</h3>
                  <p className="text-sm text-gray-600">Last Audit: {startup.lastAudit}</p>
                </div>
                <span className="text-sm text-blue-600 font-medium">8 hrs allocated</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Documents Reviewed</span>
                  <span className="text-gray-900">
                    {startup.documents.filter(doc => doc.reviewed).length}/{startup.documents.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 rounded-full h-2" 
                    style={{ width: `${(startup.documents.filter(doc => doc.reviewed).length / startup.documents.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFinancialAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Analysis Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {startups.map(startup => (
            <div key={startup.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{startup.name}</h3>
                  <p className="text-sm text-gray-600">Stage: {startup.stage}</p>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  startup.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  startup.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {startup.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-lg font-semibold text-gray-900">{startup.financials.revenue}</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-600">Expenses</p>
                  <p className="text-lg font-semibold text-gray-900">{startup.financials.expenses}</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-600">Growth</p>
                  <p className="text-lg font-semibold text-green-600">+{startup.financials.growth}%</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-600">Runway</p>
                  <p className="text-lg font-semibold text-gray-900">{startup.financials.runway}</p>
                </div>
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
        return renderAuditSchedule();
      case 'plans':
        return renderTimeTracking();
      case 'analysis':
        return renderFinancialAnalysis();
      default:
        return renderAuditSchedule();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {activeFeature === 'startups' ? 'Audit Schedule' :
           activeFeature === 'plans' ? 'Time Tracking' :
           'Financial Analysis'}
        </h1>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border rounded-lg text-gray-700">
            <option>All Stages</option>
            <option>Seed</option>
            <option>Series A</option>
            <option>Series B</option>
            <option>Series C+</option>
          </select>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default AuditorFeatures; 