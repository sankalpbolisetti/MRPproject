import React from 'react';
import { Brain, LineChart, Code } from 'lucide-react';
import BackgroundAnimation from './BackgroundAnimation';
import { useNavigate } from 'react-router-dom';  

const SkillLevelPage = ({ darkMode }) => {
  const navigate = useNavigate();
  
  // Function to handle level selection - use simple query parameter
  const handleLevelSelect = (level) => {
    console.log('SkillLevelPage selected level:', level);
    // Use window.location directly as a last resort
    window.location.href = `/course?level=${level}`;
    
    // Alternative approach using navigate
    // navigate(`/course?level=${level}`);
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* Background Animation */}
      <BackgroundAnimation darkMode={darkMode} />
      
      {/* Main Content */}
      <main className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Choose Your Skill Level
            </h1>
            <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Select the option that best matches your current data science expertise to get personalized recommendations and skill matching.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Beginner Card */}
            <div className={`rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
              <div className={`h-3 w-full ${darkMode ? 'bg-green-500' : 'bg-green-400'}`}></div>
              <div className="p-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
                  <Brain className="w-8 h-8" />
                </div>
                <h2 className={`text-2xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Beginner</h2>
                <ul className={`space-y-3 mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>New to data science or just starting your journey</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Familiar with basic programming concepts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Looking to build fundamental skills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Interested in learning data analysis basics</span>
                  </li>
                </ul>
                <button 
                  onClick={() => handleLevelSelect('beginner')} 
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${darkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                >
                  Select Beginner
                </button>
              </div>
            </div>
            
            {/* Intermediate Card */}
            <div className={`rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
              <div className={`h-3 w-full ${darkMode ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
              <div className="p-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <LineChart className="w-8 h-8" />
                </div>
                <h2 className={`text-2xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mid Level</h2>
                <ul className={`space-y-3 mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Comfortable with programming languages like Python or R</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Experience with data analysis and visualization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Familiar with basic machine learning concepts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Seeking to advance to more complex techniques</span>
                  </li>
                </ul>
                <button 
                  onClick={() => handleLevelSelect('Mid Level')} 
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                  Select Mid Level
                </button>
              </div>
            </div>
            
            {/* Professional Card */}
            <div className={`rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
              <div className={`h-3 w-full ${darkMode ? 'bg-purple-500' : 'bg-purple-400'}`}></div>
              <div className="p-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                  <Code className="w-8 h-8" />
                </div>
                <h2 className={`text-2xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Professional</h2>
                <ul className={`space-y-3 mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Proficient in multiple data science tools and languages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Strong background in advanced algorithms and models</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Experience with deploying models to production</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Looking for specialized or cutting-edge applications</span>
                  </li>
                </ul>
                <button 
                  onClick={() => handleLevelSelect('Professional')} 
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${darkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}
                >
                  Select Professional
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkillLevelPage;