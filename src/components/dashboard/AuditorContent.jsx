import React from 'react';
import { Link } from 'react-router-dom';

const AuditorContent = ({ activeFeature }) => {
  // Mock data specific to Auditor
  const audits = [
    { id: 1, company: 'Startup Y', type: 'Financial Q3', status: 'In Progress', deadline: '2024-08-30' },
    { id: 2, company: 'InnovateX', type: 'Compliance Check', status: 'Scheduled', deadline: '2024-09-15' },
    { id: 3, company: 'BioScan Ltd.', type: 'Pre-Investment Due Diligence', status: 'Completed', deadline: '2024-07-31' },
  ];
  
   const auditSchedule = [
      { id: 1, title: 'Kick-off Meeting - Startup Y', time: 'Tomorrow, 2:00 PM', type: 'meeting'},
      { id: 2, title: 'Report Deadline - InnovateX', time: 'Next Monday', type: 'deadline'},
  ];

  const baseContainerClasses = "bg-white rounded-xl shadow-md p-6 animate-fade-in";
  const buttonClasses = "transition-colors duration-200 ease-in-out";
  const tableRowHoverClasses = "hover:bg-gray-50 transition-colors duration-200 ease-in-out";
  const listItemHoverClasses = "hover:bg-gray-50 transition-colors duration-200 ease-in-out rounded-lg";

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'dashboard': // Audits
        return (
          <div className={baseContainerClasses.replace('animate-fade-in', '')}>
            <h2 className="text-xl font-semibold mb-4">Assigned Audits</h2>
             <p className="text-gray-600 mb-6">Manage and track your assigned audits.</p>
             {audits.length > 0 ? (
                 <table className="min-w-full divide-y divide-gray-200">
                   <thead className="bg-gray-50">
                     <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit Type</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                     {audits.map((audit) => (
                       <tr key={audit.id} className={tableRowHoverClasses}>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{audit.company}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{audit.type}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{audit.deadline}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ 
                               audit.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                               audit.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                               'bg-green-100 text-green-800' // Completed etc.
                             }`}>
                                 {audit.status}
                             </span>
                         </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className={`text-indigo-600 hover:text-indigo-900 ${buttonClasses}`}>View Audit</button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
             ) : (
                 <p className="text-gray-500">No audits assigned.</p>
             )}
          </div>
        );
      case 'schedule': // Audit Schedule
        return (
          <div className={baseContainerClasses.replace('animate-fade-in', '')}>
            <h2 className="text-xl font-semibold mb-4">Audit Schedule & Deadlines</h2>
            <p className="text-gray-600 mb-6">Upcoming meetings and reporting deadlines.</p>
             <div className="space-y-3">
                 {auditSchedule.map(item => (
                     <div key={item.id} className={`p-3 border rounded-lg flex justify-between items-center ${listItemHoverClasses}`}>
                         <div>
                             <p className="font-medium">{item.title}</p>
                             <p className={`text-sm ${item.type === 'meeting' ? 'text-blue-600' : 'text-red-600'}`}>{item.time}</p>
                         </div>
                          <button className={`text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 ${buttonClasses}`}>View</button>
                     </div>
                 ))}
                 {auditSchedule.length === 0 && (
                      <p className="text-gray-500">No scheduled items.</p>
                 )}
             </div>
          </div>
        );
        case 'settings':
             return (
                 <div className={baseContainerClasses.replace('animate-fade-in', '')}>
                    <h2 className="text-xl font-semibold mb-4">Auditor Settings</h2>
                     <p className="text-gray-600">Manage notification preferences and account details.</p>
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
    <>{renderFeatureContent()}</>
  );
};

export default AuditorContent; 