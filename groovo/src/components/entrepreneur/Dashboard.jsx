import { useState } from 'react';
import NewsSection from '../common/NewsSection';

const EntrepreneurDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const domains = [
    'HealthTech',
    'EdTech',
    'FinTech',
    'E-commerce',
    'AI/ML',
    'IoT',
    'Other',
  ];

  const roadmapSteps = {
    HealthTech: [
      {
        title: 'Market Research',
        tasks: [
          'Analyze healthcare industry trends',
          'Identify target market segments',
          'Study competitor solutions',
          'Research regulatory requirements',
        ],
      },
      {
        title: 'Business Planning',
        tasks: [
          'Define value proposition',
          'Create business model canvas',
          'Develop financial projections',
          'Write business plan',
        ],
      },
      {
        title: 'Product Development',
        tasks: [
          'Design MVP features',
          'Develop prototype',
          'Conduct user testing',
          'Iterate based on feedback',
        ],
      },
      {
        title: 'Regulatory Compliance',
        tasks: [
          'Obtain necessary licenses',
          'Ensure HIPAA compliance',
          'Implement security measures',
          'Document compliance procedures',
        ],
      },
      {
        title: 'Launch & Growth',
        tasks: [
          'Develop marketing strategy',
          'Build partnerships',
          'Launch MVP',
          'Gather user feedback',
        ],
      },
    ],
    // Add similar roadmaps for other domains
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: 'This is a placeholder AI response. In production, this would be connected to an AI service.', sender: 'ai' },
        ]);
      }, 1000);
    }
  };

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    setCurrentStep(0);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Entrepreneur Dashboard</h1>
        <div className="flex space-x-4">
          <button className="btn-primary">Request Mentor</button>
          <button className="btn-secondary">Get IPR Support</button>
        </div>
      </div>

      {/* Domain Selection */}
      <div className="card">
        <h2 className="section-title">Select Your Domain</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => handleDomainSelect(domain)}
              className={`p-4 rounded-lg text-center transition-all duration-300 ${
                selectedDomain === domain
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Roadmap Section */}
      {selectedDomain && (
        <div className="card">
          <h2 className="section-title">Your Startup Journey</h2>
          <div className="space-y-6">
            {roadmapSteps[selectedDomain]?.map((step, index) => (
              <div
                key={index}
                className={`roadmap-step ${
                  index === currentStep ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <span className="text-primary-600 font-medium">
                    Step {index + 1}
                  </span>
                </div>
                <ul className="space-y-2">
                  {step.tasks.map((task, taskIndex) => (
                    <li
                      key={taskIndex}
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      <input
                        type="checkbox"
                        className="rounded text-primary-600 focus:ring-primary-500"
                      />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-end space-x-4">
                  {index > 0 && (
                    <button
                      onClick={() => setCurrentStep(index - 1)}
                      className="btn-secondary"
                    >
                      Previous
                    </button>
                  )}
                  {index < roadmapSteps[selectedDomain].length - 1 && (
                    <button
                      onClick={() => setCurrentStep(index + 1)}
                      className="btn-primary"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chatbot Section */}
      <div className="card">
        <h2 className="section-title">Ask your doubts here</h2>
        <div className="h-64 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary-100 ml-auto'
                  : 'bg-gray-200'
              } max-w-[80%]`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="input-field flex-1"
            placeholder="Type your question..."
          />
          <button type="submit" className="btn-primary">
            Send
          </button>
        </form>
      </div>

      {/* News Section */}
      <NewsSection />
    </div>
  );
};

export default EntrepreneurDashboard; 