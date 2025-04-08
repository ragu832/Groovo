import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import AboutPage from './components/home/AboutPage';
import ContactPage from './components/home/ContactPage';
import EntrepreneurDashboard from './components/entrepreneur/Dashboard';
import EntrepreneurProfile from './components/entrepreneur/Profile';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/entrepreneur/dashboard" element={<EntrepreneurDashboard />} />
            <Route path="/entrepreneur/profile" element={<EntrepreneurProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
