import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const AppliedJobs = ({darkMode}) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
//   const { darkMode, toggleTheme } = useTheme();
  // Get the level from URL query params
  const getSkillLevel = () => {
    const params = new URLSearchParams(location.search);
    const level = params.get('level');
    console.log('Level from URL in AppliedJobs:', level);
    return level || 'beginner';
  };

  const [skillLevel, setSkillLevel] = useState(getSkillLevel());
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Update level when URL changes
  useEffect(() => {
    const newLevel = getSkillLevel();
    console.log('URL changed, updating skill level to:', newLevel);
    setSkillLevel(newLevel);
  }, [location.search]);

  // Handle level button clicks
  const changeLevel = (newLevel) => {
    console.log('Button clicked to change level to:', newLevel);
    
    // Update URL and state
    navigate(`/applied-jobs?level=${newLevel}`, { replace: true });
    setSkillLevel(newLevel);
  };

  // Fetch applied jobs for the current level
  useEffect(() => {
    console.log('Fetching applied jobs for level:', skillLevel);
    setLoading(true);
    
    // Convert skillLevel to proper case for API comparison
    const formattedLevel = skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1);
    
    // Fetch applied jobs
    axios.get(`http://localhost:1616/applications/${skillLevel}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log('Applied jobs data:', response.data);
      // Store the applied jobs data
      setAppliedJobs(response.data);
    })
    .catch(error => {
      console.error('Error fetching applied jobs:', error);
      setAppliedJobs([]);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [skillLevel, token]);

  // Filter applied jobs based on search term
  const filteredAppliedJobs = appliedJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get color based on skill level (reusing from SkillsTracker)
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

  // Format date function
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      console.error('Error parsing date:', e);
      return dateString;
    }
  };

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
            <h2 className={`text-2xl font-bold text-${levelColor}-400`}>
              {skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)} Level Applied Jobs
            </h2>
          </div>
          
          <div className="p-8">
            {/* Navigation and level selection */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
              <button
                onClick={() => navigate('/apply-job')}
                className="flex items-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                Back to Job Search
              </button>
              
              {/* Level selection buttons */}
              <div className="flex space-x-4">
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
            </div>
            
            {/* Stats Card */}
            <div className="mb-8 p-6 rounded-lg shadow-md bg-opacity-80 backdrop-blur-sm border border-gray-700 bg-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold text-${levelColor}-400`}>{appliedJobs.length}</div>
                  <div className="text-sm text-gray-400">Total Applications</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold text-${levelColor}-400`}>
                    {appliedJobs.filter(job => job.company === 'Google' || job.company === 'Microsoft' || job.company === 'Amazon').length}
                  </div>
                  <div className="text-sm text-gray-400">Top Companies</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold text-${levelColor}-400`}>
                    {appliedJobs.filter(job => {
                      const applyDate = new Date(job.createdAt);
                      const now = new Date();
                      const diffTime = Math.abs(now - applyDate);
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      return diffDays <= 7;
                    }).length}
                  </div>
                  <div className="text-sm text-gray-400">Applied This Week</div>
                </div>
              </div>
            </div>

            {/* Search box */}
            <div className="mb-6">
              <div className="relative rounded-lg overflow-hidden border border-gray-700">
                <input
                  type="text"
                  placeholder="Search applied jobs by title or company..."
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
                {/* Applied Jobs table */}
                <div className="overflow-hidden rounded-xl shadow-md border border-gray-700 mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className={`bg-gray-700 text-${levelColor}-400`}>
                        <th className="px-6 py-4 text-left text-sm font-medium">Job Title</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Company</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Applied Date</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Application</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredAppliedJobs.map(job => (
                        <tr
                          key={job.userJobAppliedId}
                          className={`transition-colors duration-300 hover:bg-gray-700 bg-${levelColor}-800/20`}
                        >
                          <td className={`px-6 py-4 text-sm font-medium text-${levelColor}-400`}>
                            {job.title}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {job.company}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {formatDate(job.createdAt)}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <a
                              href={job.jobUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center space-x-1 hover:underline text-${levelColor}-400 hover:text-${levelColor}-300`}
                            >
                              <span>View Job</span>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* No results message */}
                {filteredAppliedJobs.length === 0 && (
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
                    <p className="text-lg font-medium">No applied jobs match your search</p>
                    <p className="mt-2">Try adjusting your search terms or apply to more jobs</p>
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

export default AppliedJobs;