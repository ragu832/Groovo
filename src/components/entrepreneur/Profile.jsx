import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EntrepreneurProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startupName: '',
    projectIdea: '',
    location: '',
    domain: '',
    documents: null,
  });

  const domains = [
    'HealthTech',
    'EdTech',
    'FinTech',
    'E-commerce',
    'AI/ML',
    'IoT',
    'Other',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    navigate('/entrepreneur/dashboard');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Complete Your Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Startup Name
          </label>
          <input
            type="text"
            name="startupName"
            value={formData.startupName}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Idea
          </label>
          <textarea
            name="projectIdea"
            value={formData.projectIdea}
            onChange={handleChange}
            className="input-field h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Domain
          </label>
          <select
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select a domain</option>
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Documents
          </label>
          <input
            type="file"
            name="documents"
            onChange={handleChange}
            className="input-field"
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Complete Profile
        </button>
      </form>
    </div>
  );
};

export default EntrepreneurProfile; 