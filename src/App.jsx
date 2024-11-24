import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ComponentsPage from './pages/ComponentsPage';
import PrivacyNotices from './pages/PrivacyNotices';
import RopaManagement from './pages/RopaManagement';
import PrivacyReview from './pages/PrivacyReview';
import AutoAssessment from './pages/AutoAssessment';
import './styles/theme/variables.css';
import './styles/theme/utilities.css';
import { RopaProvider } from './context/RopaContext';

function App() {
  return (
    <RopaProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/privacy-notices" element={<PrivacyNotices />} />
          <Route path="/ropa-management" element={<RopaManagement />} />
          <Route path="/privacy-review" element={<PrivacyReview />} />
          <Route path="/auto-assessment" element={<AutoAssessment />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </RopaProvider>
  );
}

export default App;
