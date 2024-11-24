import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ComponentsPage from './pages/ComponentsPage';
import PrivacyNotices from './pages/PrivacyNotices';
import RopaManagement from './pages/RopaManagement';
import PrivacyReview from './pages/PrivacyReview';
import './styles/theme/variables.css';
import './styles/theme/utilities.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/privacy-notices" element={<PrivacyNotices />} />
        <Route path="/ropa" element={<RopaManagement />} />
        <Route path="/privacy-review" element={<PrivacyReview />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
