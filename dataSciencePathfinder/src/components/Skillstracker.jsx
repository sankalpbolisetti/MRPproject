import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Skillstracker = ({ darkMode }) => {
  const { token } = useAuth()
  const location = useLocation();
  const navigate = useNavigate();

  // Get the level directly from the URL
  function getSkillLevel() {
    // Try to get from query string first
    const params = new URLSearchParams(location.search);
    const level = params.get('level');
    
    console.log('Current URL:', window.location.href);
    console.log('Search params:', location.search);
    console.log('Level from URL:', level);
    
    // Default to beginner if no level is found
    return level || 'beginner';
  }

  // Initialize with the level from URL
  const [skillLevel, setSkillLevel] = useState(getSkillLevel());
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [savingProgress, setSavingProgress] = useState(false);

  // Update when URL changes
  useEffect(() => {
    const newLevel = getSkillLevel();
    console.log('URL changed, updating skill level to:', newLevel);
    setSkillLevel(newLevel);
  }, [location.search]);

  // Handle level button clicks
  const changeLevel = (newLevel) => {
    console.log('Button clicked to change level to:', newLevel);
    
    // Reset save status when changing levels
    setSaveSuccess(false);
    setSaveFailed(false);
    
    // Update URL and state
    navigate(`/course?level=${newLevel}`, { replace: true });
    setSkillLevel(newLevel);
  };

  // Fetch skills based on level
  useEffect(() => {
    console.log('Fetching skills for level:', skillLevel);
    setLoading(true);
    
    // Reset save status
    setSaveSuccess(false);
    setSaveFailed(false);
  
    // Make the API call
    axios.get(`http://localhost:1616/skills/${skillLevel}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log('API response:', response.data);
  
      // Ensure consistent boolean type for completed property
      const skillsArray = response.data.map((item, index) => {
        // Log each item to debug
        console.log('Processing item:', item);
        
        // Check for either isChecked or checked property
        const isCompleted = 
          (item.isChecked === true || item.isChecked === "true") || 
          (item.checked === true || item.checked === "true");
        
        console.log(`Item ${item.skillName} completed status:`, isCompleted);
        
        return {
          id: index + 1,
          name: item.skillName,
          resource: item.skillUrl,
          completed: isCompleted
        };
      });
  
      console.log('Processed skills array:', skillsArray);
      fetchUserProgress(skillLevel, skillsArray);
    })
    .catch(error => {
      console.log("Error fetching skills:", error);
      const fallbackData = getFallbackSkills(skillLevel);
      fetchUserProgress(skillLevel, fallbackData);
    });
  }, [skillLevel, token]);
  
  
  // Fetch user progress for the current skill level
  const fetchUserProgress = (level, skillsList) => {
    // Make an API call to fetch user's progress
    axios.get(`http://localhost:1616/progress/${level}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Progress data:', response.data);
        
        // If we get a list of completed skill names
        if (response.data && Array.isArray(response.data)) {
          const completedSkillNames = response.data;
          
          // Update the skills array with completed status
          const updatedSkills = skillsList.map(skill => ({
            ...skill,
            // Keep existing completion OR check if in the progress list
            completed: skill.completed || completedSkillNames.includes(skill.name)
          }));
          
          console.log('Skills with progress applied:', updatedSkills);
          setSkills(updatedSkills);
        } else {
          // If no progress data, just use the skills as is
          setSkills(skillsList);
        }
      })
      .catch(error => {
        console.log("Error fetching user progress:", error);
        // If error fetching progress, just use the skills as is
        setSkills(skillsList);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fallback data for different levels
  const getFallbackSkills = (level) => {
    console.log('Using fallback data for level:', level);
    
    if (level === 'beginner') {
      return [
        { id: 1, name: 'JavaScript Fundamentals', resource: 'https://javascript.info/', completed: false },
        { id: 2, name: 'React Basics', resource: 'https://reactjs.org/tutorial/tutorial.html', completed: false },
        { id: 3, name: 'CSS Grid Layout', resource: 'https://css-tricks.com/snippets/css/complete-guide-grid/', completed: false },
        { id: 4, name: 'Responsive Web Design', resource: 'https://web.dev/responsive-web-design-basics/', completed: false },
        { id: 5, name: 'Git Version Control', resource: 'https://git-scm.com/book/en/v2', completed: false },
      ];
    } else if (level === 'Mid Level') {
      return [
        { id: 1, name: 'React Hooks Deep Dive', resource: 'https://reactjs.org/docs/hooks-intro.html', completed: false },
        { id: 2, name: 'State Management with Redux', resource: 'https://redux.js.org/introduction/getting-started', completed: false },
        { id: 3, name: 'API Integration', resource: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', completed: false },
        { id: 4, name: 'CSS-in-JS Solutions', resource: 'https://css-tricks.com/a-thorough-analysis-of-css-in-js/', completed: false },
        { id: 5, name: 'Unit Testing with Jest', resource: 'https://jestjs.io/docs/getting-started', completed: false },
      ];
    } else if (level === 'Professional') {
      return [
        { id: 1, name: 'Advanced React Patterns', resource: 'https://kentcdodds.com/blog/advanced-react-patterns', completed: false },
        { id: 2, name: 'Performance Optimization', resource: 'https://reactjs.org/docs/optimizing-performance.html', completed: false },
        { id: 3, name: 'Server-Side Rendering', resource: 'https://nextjs.org/docs/basic-features/pages', completed: false },
        { id: 4, name: 'GraphQL Implementation', resource: 'https://graphql.org/learn/', completed: false },
        { id: 5, name: 'Micro-Frontend Architecture', resource: 'https://micro-frontends.org/', completed: false },
      ];
    }
    return [];
  };

  // This will recalculate whenever skills change
  const completedCount = skills.filter(skill => skill.completed).length;
  const completionPercentage = skills.length > 0 ? Math.round((completedCount / skills.length) * 100) : 0;

  useEffect(() => {
    // Log when completed count updates
    console.log('Updated completed count:', completedCount, 'out of', skills.length);
    console.log('Completion percentage:', completionPercentage);
  }, [completedCount, skills.length, completionPercentage]);

  const handleCheckboxChange = (id) => {
    // Reset save status when changing checkboxes
    setSaveSuccess(false);
    setSaveFailed(false);
    
    setSkills(prevSkills => {
      // Find the skill that's being updated
      const skillToUpdate = prevSkills.find(skill => skill.id === id);
      console.log('Toggling completion for skill:', skillToUpdate?.name);
      console.log('Current completion status:', skillToUpdate?.completed);
      
      // Create updated skills array
      const updatedSkills = prevSkills.map(skill =>
        skill.id === id ? { ...skill, completed: !skill.completed } : skill
      );
      
      // Find the updated skill to log its new state
      const updatedSkill = updatedSkills.find(skill => skill.id === id);
      console.log('New completion status:', updatedSkill?.completed);
      
      // Log all completed skills for debugging
      const completedSkills = updatedSkills.filter(skill => skill.completed);
      console.log('Currently completed skills:', completedSkills.map(s => s.name));
      console.log('Total completed skills:', completedSkills.length);
      
      return updatedSkills;
    });
  };
  
  // Save progress to backend
  const saveProgress = () => {
    setSavingProgress(true);
    setSaveSuccess(false);
    setSaveFailed(false);
  
    // Get list of completed skill names
    const completedSkillNames = skills
      .filter(skill => skill.completed)
      .map(skill => skill.name);
  
    console.log('Saving progress:', completedSkillNames);
  
    // Make API call to save progress
    console.log('Sending progress save request with data:', completedSkillNames);
    
    axios.post(`http://localhost:1616/progress/${skillLevel}`, completedSkillNames, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('Progress saved successfully:', response.data);
      setSaveSuccess(true);
      
      // Force a refresh of the skills list to ensure UI is in sync with server
      // This is optional but can help ensure everything is consistent
      const currentSkills = [...skills];
      setSkills(currentSkills);
    })
    .catch(error => {
      console.error('Error saving progress:', error);
      console.error('Error details:', error.response ? error.response.data : 'No response data');
      setSaveFailed(true);
    })
    .finally(() => {
      setSavingProgress(false);
    });
  };
  
  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get color based on skill level
  const getLevelColor = () => {
    switch(skillLevel) {
      case 'beginner':
        return darkMode ? 'green' : 'emerald';
      case 'Mid Level':
        return 'blue';
      case 'Professional':
        return 'purple';
      default:
        return darkMode ? 'green' : 'emerald';
    }
  };
  
  const levelColor = getLevelColor();

  return (
    <div className={`pt-20 min-h-screen flex flex-col transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
    }`}>
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className={`rounded-xl shadow-xl overflow-hidden ${
          darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-800 text-gray-100'
        }`}>
          {/* Card header with title */}
          <div className={`w-full py-6 px-8 ${
            darkMode 
              ? `bg-${levelColor}-600/20 border-b border-${levelColor}-600/30` 
              : `bg-${levelColor}-600/20 border-b border-${levelColor}-600/30`
          }`}>
            <h2 className={`text-2xl font-bold ${
              darkMode ? `text-${levelColor}-400` : `text-${levelColor}-400`
            }`}>
              {skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)} Level Skills
            </h2>
          </div>
          
          <div className="p-8">
            {/* Level selection buttons */}
            <div className="flex mb-8 space-x-4">
              <button
                onClick={() => changeLevel('beginner')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  skillLevel === 'beginner' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => changeLevel('Mid Level')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  skillLevel === 'Mid Level' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Mid Level
              </button>
              <button
                onClick={() => changeLevel('Professional')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  skillLevel === 'Professional' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Professional
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="mb-8 p-6 rounded-lg shadow-md bg-opacity-80 backdrop-blur-sm border border-gray-700 bg-gray-800">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">
                  Overall Progress
                </span>
                <span className={`text-sm font-medium text-${levelColor}-400`}>
                  {completionPercentage}%
                </span>
              </div>
              <div className="bg-gray-700 w-full rounded-full h-2.5">
              <div
    className={`h-2.5 rounded-full transition-all duration-700 ease-in-out ${
      darkMode 
        ? `bg-${levelColor}-500` // Keep dynamic for dark mode
        : skillLevel === 'beginner'
          ? 'bg-emerald-500' // Explicit class for beginner in light mode
          : `bg-${levelColor}-500` // Keep dynamic for other levels
    }`}
    style={{ width: `${completionPercentage}%` }}
  ></div>
              </div>  
              <div className="mt-2 text-sm text-gray-400">
                {completedCount} of {skills.length} skills completed
              </div>
            </div>

            {/* Search box */}
            <div className="mb-6">
              <div className="relative rounded-lg overflow-hidden border border-gray-700">
                <input
                  type="text"
                  placeholder="Search skills..."
                  className={`w-full p-4 pl-12 rounded-lg transition-colors bg-gray-700 text-white placeholder-gray-400 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-${levelColor}-500`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg 
                    className="w-5 h-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Loading state */}
            {loading ? (
              <div className="flex justify-center py-12">
                <div className={`animate-spin rounded-full h-12 w-12 border-b-2 border-${levelColor}-400`}></div>
              </div>
            ) : (
              <>
                {/* Skills table */}
                <div className="overflow-hidden rounded-xl shadow-md border border-gray-700 mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className={`bg-gray-700 text-${levelColor}-400`}>
                        <th className="px-6 py-4 text-left text-sm font-medium">Skill</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Learning Resource</th>
                        <th className="px-6 py-4 text-center text-sm font-medium">Completed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredSkills.map(skill => (
                        <tr
                          key={skill.id}
                          className={`transition-colors duration-300 hover:bg-gray-700 ${
                            skill.completed ? `bg-${levelColor}-800/20` : ''
                          }`}
                        >
                          <td className={`px-6 py-4 text-sm font-medium text-${levelColor}-400`}>
                            {skill.name}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <a
                              href={skill.resource}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center space-x-1 hover:underline text-${levelColor}-400 hover:text-${levelColor}-300`}
                            >
                              <span>Learning Resource</span>
                              <svg 
                                className="w-4 h-4 ml-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth="2" 
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                                />
                              </svg>
                            </a>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={skill.completed}
                                onChange={() => handleCheckboxChange(skill.id)}
                                className={`rounded-sm w-5 h-5 focus:ring-0 cursor-pointer transition-colors text-${levelColor}-500 bg-gray-700 border-gray-600`}
                              />
                            </label>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Save Progress Button and Apply Job Button */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex space-x-4">
                    <button
                      onClick={saveProgress}
                      disabled={savingProgress}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        savingProgress
                          ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                          : `bg-${levelColor}-600 hover:bg-${levelColor}-700 text-white`
                      }`}
                    >
                      {savingProgress ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving Progress...
                        </span>
                      ) : (
                        'Save Progress'
                      )}
                    </button>
                    
                    <button
                      title="Complete all the skills first to apply for jobs"
                      disabled={completionPercentage < 100}
                      onClick={() => navigate(`/apply-job?level=${skillLevel}`)}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        completionPercentage < 100
                          ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                          : `bg-green-600 hover:bg-green-700 text-white`
                      }`}
                    >
                      {completionPercentage < 100 ? (
                        <span className="flex items-center">
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Complete Skills First
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          Apply for Job
                        </span>
                      )}
                    </button>
                  </div>
                  
                  {/* Success/Error Messages */}
                  <div>
                    {saveSuccess && (
                      <div className="text-green-400 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Progress saved successfully!
                      </div>
                    )}
                    {saveFailed && (
                      <div className="text-red-400 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Failed to save progress. Please try again.
                      </div>
                    )}
                  </div>
                </div>

                {/* No results message */}
                {filteredSkills.length === 0 && (
                  <div className="text-center py-12 rounded-lg border bg-gray-800/50 border-gray-700 text-gray-400">
                    <svg 
                      className="w-16 h-16 mx-auto mb-4 text-gray-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <p className="text-lg font-medium">No skills match your search</p>
                    <p className="mt-2">Try adjusting your search terms</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skillstracker;