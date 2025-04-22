import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Skillstracker from './Skillstracker';

const CourseComponent = ({ darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract skillLevel from location state, defaulting to 'beginner' if not provided
  const [skillLevel, setSkillLevel] = useState(
    location.state?.skillLevel || 'beginner'
  );
  
  // Handle cases where the page is directly accessed without state
  useEffect(() => {
    if (location.state?.skillLevel) {
      setSkillLevel(location.state.skillLevel);
      // Update the state to ensure it persists during page refreshes
      navigate('/course', { state: { skillLevel: location.state.skillLevel }, replace: true });
    }
  }, [location.state?.skillLevel, navigate]);
  
  // Log to verify the skill level is correctly set
  useEffect(() => {
    console.log('CourseComponent skill level:', skillLevel);
  }, [skillLevel]);
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* You can add course title or other elements here */}
      <div className="container mx-auto px-4">
        <div className="py-6">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)} Level Course
          </h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Track your progress through the skills required for this level
          </p>
        </div>
      </div>
      
      <Skillstracker darkMode={darkMode} initialSkillLevel={skillLevel} />
    </div>
  );
};

export default CourseComponent;