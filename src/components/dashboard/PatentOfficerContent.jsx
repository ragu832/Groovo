import React from 'react';
import { Link } from 'react-router-dom';

const PatentOfficerContent = ({ activeFeature }) => {
  // Mock data specific to Patent Officer
  const applications = [
    { id: 1, title: 'App #123 - AI Drone', status: 'Under Review', submitted: '2024-08-01', entrepreneur: 'InnovateX' },
    { id: 2, title: 'App #124 - Biotech Sensor', status: 'Initial Review', submitted: '2024-08-05', entrepreneur: 'BioScan Ltd.' },
    { id: 3, title: 'App #125 - Quantum Algo', status: 'Pending Assignment', submitted: '2024-08-10', entrepreneur: 'QuantumLeap' },
  ];
  
  const reviewSchedule = [
      { id: 1, title: 'Review Meeting - App #123', time: 'Tomorrow, 10:00 AM', type: 'meeting'},
      { id: 2, title: 'Submit Report - App #120', time: 'Friday EOD', type: 'deadline'},
  ];

  const baseContainerClasses = "bg-white rounded-xl shadow-md p-6 animate-fade-in";
  const buttonClasses = "transition-colors duration-200 ease-in-out";
  const tableRowHoverClasses = "hover:bg-gray-50 transition-colors duration-200 ease-in-out";
  const listItemHoverClasses = "hover:bg-gray-50 transition-colors duration-200 ease-in-out rounded-lg";

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'dashboard': // Applications
        return (
          <div className={baseContainerClasses.replace('animate-fade-in', '')}>
            <h2 className="text-xl font-semibold mb-4">Patent Applications</h2>
            <p className="text-gray-600 mb-6">Manage and review assigned patent applications.</p>
             {applications.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                   <thead className="bg-gray-50">
                     <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrepreneur</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                     {applications.map((app) => (
                       <tr key={app.id} className={tableRowHoverClasses}>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.title}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.entrepreneur}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.submitted}</td>
                         <td className="px-6 py-4 whitespace-nowrap">
                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ 
                               app.status === 'Pending Assignment' ? 'bg-gray-100 text-gray-800' :
                               app.status === 'Initial Review' ? 'bg-blue-100 text-blue-800' :
                               'bg-yellow-100 text-yellow-800' // Under Review etc.
                             }`}>
                                 {app.status}
                             </span>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className={`text-indigo-600 hover:text-indigo-900 ${buttonClasses}`}>View Details</button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
             ) : (
                  <p className="text-gray-500">No applications assigned.</p>
             )}
          </div>
        );
      case 'review': // Review Schedule
        return (
          <div className={baseContainerClasses.replace('animate-fade-in', '')}>
            <h2 className="text-xl font-semibold mb-4">Review Schedule & Deadlines</h2>
            <p className="text-gray-600 mb-6">Upcoming meetings and reporting deadlines.</p>
             <div className="space-y-3">
                 {reviewSchedule.map(item => (
                     <div key={item.id} className={`p-3 border rounded-lg flex justify-between items-center ${listItemHoverClasses}`}>
                         <div>
                             <p className="font-medium">{item.title}</p>
                             <p className={`text-sm ${item.type === 'meeting' ? 'text-blue-600' : 'text-red-600'}`}>{item.time}</p>
                         </div>
                          <button className={`text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 ${buttonClasses}`}>View</button>
                     </div>
                 ))}
                 {reviewSchedule.length === 0 && (
                      <p className="text-gray-500">No scheduled items.</p>
                 )}
             </div>
          </div>
        );
        case 'settings':
            return (
                 <div className={baseContainerClasses.replace('animate-fade-in', '')}>
                    <h2 className="text-xl font-semibold mb-4">Patent Officer Settings</h2>
                     <p className="text-gray-600">Manage notification preferences and account details.</p>
                     {/* Add specific settings form or link to main profile */}
                      <Link 
                        to="/profile" 
                        className={`inline-block mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 ${buttonClasses}`}>
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

export default PatentOfficerContent; 