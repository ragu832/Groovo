import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import CollaboratorLogin from './components/auth/CollaboratorLogin';
import CollaboratorSignupPage from './components/auth/CollaboratorSignupPage';
import EntrepreneurSignupDetails from './components/auth/EntrepreneurSignupDetails';
import AuthChoice from './components/auth/AuthChoice';
import ProfilePage from './components/pages/ProfilePage';
import EntrepreneurDashboard from './components/dashboard/EntrepreneurDashboard';
import InvestorDashboard from './components/dashboard/InvestorDashboard';
import CollaboratorDashboard from './components/dashboard/CollaboratorDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/auth" element={<AuthChoice />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/collaborator" element={<CollaboratorLogin />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signup/collaborator" element={<CollaboratorSignupPage />} />
            <Route path="/signup/entrepreneur/details" element={<EntrepreneurSignupDetails />} />
            <Route path="/dashboard/entrepreneur" element={<EntrepreneurDashboard />} />
            <Route path="/dashboard/investor" element={<InvestorDashboard />} />
            <Route path="/dashboard/collaborator" element={<CollaboratorDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
