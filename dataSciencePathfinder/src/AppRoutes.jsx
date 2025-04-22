// AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BackgroundAnimation from './components/BackgroundAnimation';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/Maincontent';
import SkillLevelPage from './components/SkillLevelPage';

import PowerBi from './components/PowerBI';
import { ProtectedRoute } from './utils/navigation';
import SkillsTracker from './components/Skillstracker';
import ApplyJobs from './components/ApplyJobs';
import AppliedJobs from './components/AppliedJobs';

const AppRoutes = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();

  const isFullPageRoute = location.pathname === '/powerbidashboard';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      
      {!isFullPageRoute && <BackgroundAnimation darkMode={darkMode} />}
      {!isFullPageRoute && <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      
      <Routes>
        <Route path="/" element={<MainContent darkMode={darkMode} />} />
        <Route path="/skill-level" element={
          <ProtectedRoute>
            <SkillLevelPage darkMode={darkMode} />
          </ProtectedRoute>
        } />
        <Route path="/course" element={
          <ProtectedRoute>
            <SkillsTracker darkMode={darkMode} />
            </ProtectedRoute>
          
        } />
        <Route path="/powerbidashboard" element={
          
            <div className="w-screen h-screen">
              <PowerBi />
            </div>
            
        } />
         <Route path="/apply-job" element={
          <ProtectedRoute>
            <ApplyJobs darkMode={darkMode} />
          </ProtectedRoute>
        } />
          <Route path="/applied-jobs" element={
          <ProtectedRoute>
            <AppliedJobs darkMode={darkMode} />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isFullPageRoute && <Footer darkMode={darkMode} />}
    </div>
  );
};

export default AppRoutes;
