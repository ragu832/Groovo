import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'entrepreneur',
      title: 'Entrepreneur',
      description: 'Start and grow your business with our support',
      icon: '🚀',
    },
    {
      id: 'investor',
      title: 'Investor',
      description: 'Find and invest in promising startups',
      icon: '💰',
    },
    {
      id: 'collaborator',
      title: 'Collaborator',
      description: 'Share your expertise and mentor startups',
      icon: '🤝',
    },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    if (roleId === 'entrepreneur') {
      navigate('/entrepreneur/profile');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Groovo</h1>
      <p className="text-xl text-gray-600 text-center mb-12">
        Select your role to get started
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`card cursor-pointer transition-transform hover:scale-105 ${
              selectedRole === role.id ? 'ring-2 ring-primary-500' : ''
            }`}
            onClick={() => handleRoleSelect(role.id)}
          >
            <div className="text-4xl mb-4">{role.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{role.title}</h2>
            <p className="text-gray-600">{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection; 