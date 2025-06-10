const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Groovo</h1>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            Groovo is dedicated to empowering entrepreneurs, connecting them with investors, 
            and providing access to expert collaborators. We believe in fostering innovation 
            and supporting the growth of promising startups.
          </p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-primary-50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">For Entrepreneurs</h3>
              <p className="text-gray-600">
                Personalized roadmaps, mentor connections, and resources to help you build and scale your startup.
              </p>
            </div>
            <div className="p-4 bg-primary-50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">For Investors</h3>
              <p className="text-gray-600">
                Access to curated startup opportunities and tools to evaluate potential investments.
              </p>
            </div>
            <div className="p-4 bg-primary-50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">For Collaborators</h3>
              <p className="text-gray-600">
                Opportunities to share expertise, mentor startups, and connect with innovative teams.
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-600 mb-4">
            Groovo is built by a team of entrepreneurs, investors, and industry experts 
            who understand the challenges of building and scaling startups. We're committed 
            to providing the resources and connections you need to succeed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 