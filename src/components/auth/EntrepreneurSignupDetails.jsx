import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Example list of domains - replace with actual data if available
const domains = [
  { value: 'tech', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'education', label: 'Education' },
  { value: 'energy', label: 'Energy' },
  { value: 'other', label: 'Other' },
];

export default function EntrepreneurSignupDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Function to safely retrieve state or fallback to sessionStorage
  const getInitialState = () => {
    let details = location.state?.basicDetails;
    let role = location.state?.selectedRole;

    if (!details || !role) {
      console.warn('EntrepreneurSignupDetails: Location state missing, attempting sessionStorage fallback.');
      try {
        const storedDetails = sessionStorage.getItem('signup_basic_details');
        const storedRole = sessionStorage.getItem('signup_selected_role');
        if (storedDetails && storedRole) {
          details = JSON.parse(storedDetails);
          role = storedRole;
        }
      } catch (error) {
        console.error('Error parsing sessionStorage data:', error);
      }
    }
    // Clear storage immediately after attempting to read
    sessionStorage.removeItem('signup_basic_details');
    sessionStorage.removeItem('signup_selected_role');
    
    return { initialBasicDetails: details, initialRole: role };
  };

  // Attempt to get state immediately using the function
  const { initialBasicDetails, initialRole } = getInitialState();

  const [domain, setDomain] = useState('');
  const [pitchDeckUrl, setPitchDeckUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [otherProofUrl, setOtherProofUrl] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState(true); // Track if state check is done

  // Check state validity on mount
  useEffect(() => {
    if (!initialBasicDetails || initialRole !== 'entrepreneur') {
      console.error('EntrepreneurSignupDetails: Missing or invalid state after checking location and sessionStorage. Redirecting.');
      navigate('/signup', { replace: true }); 
    } else {
       console.log('EntrepreneurSignupDetails: Valid state confirmed. Details:', initialBasicDetails);
       setIsLoadingState(false); // State is valid
    }
    // Run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!domain) {
        setError('Please select your business domain.');
        return;
    }
    setError('');
    setIsSubmitting(true);

    try {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!initialBasicDetails) {
            throw new Error("Session data lost. Cannot complete signup.");
        }
        
        const finalUserData = {
            ...initialBasicDetails,
            role: 'entrepreneur', 
            domain: domain,
            proofs: {
                pitchDeck: pitchDeckUrl || null,
                website: websiteUrl || null,
                other: otherProofUrl || null,
            },
        };
        
        console.log('EntrepreneurSignupDetails: Finalizing signup with:', finalUserData);
        login(finalUserData);
        navigate('/dashboard/entrepreneur', { replace: true });

    } catch (err) {
        setError(err.message || 'Failed to save details. Please try again.');
        console.error("Signup details error:", err);
    } finally {
        setIsSubmitting(false);
    }
  };

  // Show loading indicator while checking state
  if (isLoadingState) {
      return <div className="min-h-screen flex items-center justify-center">Verifying signup step...</div>;
  }
  
  // If state was invalid, the useEffect would have navigated away, 
  // but as a fallback, we can render nothing or a Navigate component.
  // This check might be redundant due to the useEffect but adds safety.
  if (!initialBasicDetails || initialRole !== 'entrepreneur') {
      console.warn("EntrepreneurSignupDetails: Render reached with invalid state.")
      return <Navigate to="/signup" replace />;
  }

  // Render the form if state is valid and loading is done
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
           <div className="text-center mb-8">
             <h2 className="text-3xl font-bold text-gray-900">Entrepreneur Details</h2>
             <p className="mt-2 text-lg text-gray-600">Welcome, {initialBasicDetails.name}! Tell us more about your venture.</p>
           </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Domain Selection */}
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
                Business Domain <span className="text-red-500">*</span>
              </label>
              <select
                id="domain"
                name="domain"
                required
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 py-2 px-3"
              >
                <option value="" disabled>Select your domain...</option>
                {domains.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>

            {/* Proof Links (Optional) */}
            <div className="space-y-4 pt-4 border-t">
               <h3 className="text-lg font-medium text-gray-800">Supporting Links (Optional)</h3>
                <div>
                  <label htmlFor="pitchDeckUrl" className="block text-sm font-medium text-gray-700">
                    Pitch Deck URL
                  </label>
                  <input
                    type="url"
                    id="pitchDeckUrl"
                    name="pitchDeckUrl"
                    value={pitchDeckUrl}
                    onChange={(e) => setPitchDeckUrl(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                    placeholder="https://example.com/pitchdeck"
                  />
                </div>
                 <div>
                  <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700">
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="websiteUrl"
                    name="websiteUrl"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                    placeholder="https://my-startup.com"
                  />
                </div>
                 <div>
                  <label htmlFor="otherProofUrl" className="block text-sm font-medium text-gray-700">
                    Other Proof/Demo URL
                  </label>
                  <input
                    type="url"
                    id="otherProofUrl"
                    name="otherProofUrl"
                    value={otherProofUrl}
                    onChange={(e) => setOtherProofUrl(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                    placeholder="Link to demo, prototype, etc."
                  />
                </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-4 animate-shake">
                 {/* ... (Error display) ... */}
                  <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving & Signing Up...' : 'Complete Signup'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 