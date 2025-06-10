import { Link } from 'react-router-dom';

const AboutPage = () => {
  const features = [
    {
      id: 1,
      title: 'Connect with Investors',
      description: 'Find the right investors who believe in your vision and can help take your startup to the next level.',
      icon: '💰',
    },
    {
      id: 2,
      title: 'Expert Mentorship',
      description: 'Get guidance from experienced entrepreneurs and industry experts who have been there before.',
      icon: '🎯',
    },
    {
      id: 3,
      title: 'Startup Resources',
      description: 'Access a wealth of resources, tools, and knowledge to help you build and grow your startup.',
      icon: '📚',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Groovo
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              We're building the future of startup collaboration and growth. Our platform connects entrepreneurs with the resources, mentors, and investors they need to succeed.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              At Groovo, we believe that great ideas deserve the chance to thrive. Our mission is to break down the barriers between innovative entrepreneurs and the resources they need to succeed. We're creating an ecosystem where startups can flourish, investors can discover promising opportunities, and mentors can share their expertise.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Ready to Start Your Journey?
            </h2>
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              Join Groovo Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 