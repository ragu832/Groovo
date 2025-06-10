import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // Don't render anything if the user is not yet loaded or authenticated
  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Profile Settings</h1>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col items-center sm:flex-row sm:items-start">
              {/* Avatar */}
              <div className="flex-shrink-0 mb-6 sm:mb-0 sm:mr-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-md">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={`${user.name}'s avatar`}
                      className="w-full h-full rounded-full object-cover" 
                    />
                  ) : (
                    user.name?.split(' ').map(word => word[0]).join('').toUpperCase()
                  )}
                </div>
              </div>
              
              {/* User Details */}
              <div className="text-center sm:text-left flex-grow">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{user.name}</h2>
                <p className="text-md text-gray-600 mb-1">{user.email}</p>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full capitalize">
                  {user.role}
                </span>
              </div>
            </div>
            
            {/* Additional Sections (Optional) */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Account Information</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p><span className="font-medium">Member Since:</span> January 2024 (Example)</p> 
                 <p><span className="font-medium">Last Login:</span> Today (Example)</p>
                 {/* Add more details or settings options here */}
              </div>
            </div>
             
            <div className="mt-6 text-center">
               <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                    Edit Profile (Coming Soon)
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 