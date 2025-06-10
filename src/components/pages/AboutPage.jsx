export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Groovo</h1>
          <p className="text-xl text-gray-600">Connecting Entrepreneurs, Investors, and Collaborators</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            Groovo is dedicated to fostering innovation and entrepreneurship by creating a seamless platform
            where entrepreneurs can connect with investors and industry experts. We believe in the power of
            collaboration and aim to make the startup journey more accessible and successful.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Entrepreneurs</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Connect with potential investors
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Access mentorship from industry experts
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Get guidance on IP protection
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Receive financial audits and advice
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Investors</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Discover promising startups
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Access detailed startup analytics
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Manage your investment portfolio
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Connect with other investors
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p className="text-gray-600 mb-6">
            We are a team of passionate individuals with diverse backgrounds in entrepreneurship,
            technology, and finance. Our collective experience helps us understand the challenges
            faced by startups and create solutions that make a real difference.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200"></div>
              <h3 className="font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200"></div>
              <h3 className="font-semibold text-gray-900">Jane Smith</h3>
              <p className="text-gray-600">Head of Operations</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200"></div>
              <h3 className="font-semibold text-gray-900">Mike Johnson</h3>
              <p className="text-gray-600">Technical Lead</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 