import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ApplyJobs = ({ darkMode }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getSkillLevel = () => {
    const params = new URLSearchParams(location.search);
    const level = params.get('level');
    return level || 'beginner';
  };

  const [skillLevel, setSkillLevel] = useState(getSkillLevel());
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyFailed, setApplyFailed] = useState(false);
  const [savingApplication, setSavingApplication] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setApplySuccess(false);
      setApplyFailed(false);

      try {
        const appliedRes = await axios.get(`http://localhost:1616/applications/${skillLevel}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        const appliedData = appliedRes.data;

        const searchParams = getSearchParams(skillLevel);
        const options = {
          method: 'GET',
          url: 'https://linkedin-job-search-api.p.rapidapi.com/active-jb-24h',
          params: {
            limit: '30',
            offset: '0',
            ...searchParams
          },
          headers: {
            'x-rapidapi-key': '6e49f2e8b4msh3ec8bafc4c44e23p19f43ejsn63205c61c0a3',
            'x-rapidapi-host': 'linkedin-job-search-api.p.rapidapi.com'
          }
        };

        const response = await axios.request(options);
        const dataArray = Array.isArray(response.data) ? response.data :
          (response.data?.data && Array.isArray(response.data.data) ? response.data.data : []);

        const jobsArray = dataArray.map((item, index) => {
          const jobId = item.id || `job-${index}`;
          const isApplied = appliedData.some(applied => applied.jobIdApplied === jobId || applied.jobIdApplied?.toString() === jobId);
          return {
            id: jobId,
            title: item.title || 'Untitled Position',
            company: item.organization || 'Unknown Company',
            location: item.locations_derived?.[0] || 'Remote',
            salary: item.salary_raw || 'Not specified',
            applicationLink: item.url || '#',
            applied: isApplied,
            postedDate: new Date(item.date_posted || '').toLocaleDateString() || 'Unknown',
          };
        });

        setJobs(jobsArray);
      } catch (error) {
        console.error("Error in fetching jobs:", error);
        setJobs(getFallbackJobs(skillLevel));
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [skillLevel, token]);

  const getSearchParams = (level) => {
    switch(level) {
      case 'beginner': return { title_filter: '"Data Engineer"', location_filter: '"United States"', ai_experience_level_filter: '0-2' };
      case 'Mid Level': return { title_filter: '"Data Engineer"', location_filter: '"United States"', ai_experience_level_filter: '2-5' };
      case 'Professional': return { title_filter: '"Data Engineer"', location_filter: '"United States"', ai_experience_level_filter: '5-10' };
      default: return { title_filter: '"Data Engineer"', location_filter: '"United States"', ai_experience_level_filter: '0-2' };
    }
  };

  const getFallbackJobs = (level) => {
    // return fallback jobs similar to your original logic
    return [];
  };

  const handleAppliedChange = (id) => {
    setApplySuccess(false);
    setApplyFailed(false);
    setJobs(prev => prev.map(job => job.id === id ? { ...job, applied: !job.applied } : job));
  };

  const saveApplications = () => {
    setSavingApplication(true);
    setApplySuccess(false);
    setApplyFailed(false);

    const appliedJobsData = jobs.filter(job => job.applied).map(job => ({
      jobId: job.id,
      title: job.title,
      company: job.company,
      applicationUrl: job.applicationLink,
    }));

    axios.post(`http://localhost:1616/applications/${skillLevel}`, appliedJobsData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(() => setApplySuccess(true))
    .catch(() => setApplyFailed(true))
    .finally(() => setSavingApplication(false));
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count applied jobs
  const appliedCount = jobs.filter(job => job.applied).length;
  const applicationPercentage = jobs.length > 0 ? Math.round((appliedCount / jobs.length) * 100) : 0;

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
              {skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)} Level Job Opportunities
            </h2>
          </div>
          
          <div className="p-8">
            {/* Navigation and level selection */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
              <button
                onClick={() => navigate('/course')}
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
                Back to Skills
              </button>
              
              {/* Level selection buttons */}
              {/* <div className="flex space-x-4">
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
              </div> */}
            </div>
            
            {/* Progress bar */}
            <div className="mb-8 p-6 rounded-lg shadow-md bg-opacity-80 backdrop-blur-sm border border-gray-700 bg-gray-800">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">
                  Application Progress
                </span>
                <span className={`text-sm font-medium text-${levelColor}-400`}>
                  {applicationPercentage}%
                </span>
              </div>
              <div className="bg-gray-700 w-full rounded-full h-2.5">
                <div
                  className={`bg-${levelColor}-500 h-2.5 rounded-full transition-all duration-700 ease-in-out`}
                  style={{ width: `${applicationPercentage}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                {appliedCount} of {jobs.length} jobs applied
              </div>
            </div>

            {/* Search box */}
            <div className="mb-6">
              <div className="relative rounded-lg overflow-hidden border border-gray-700">
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or location..."
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
                {/* Jobs table */}
                <div className="overflow-hidden rounded-xl shadow-md border border-gray-700 mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className={`bg-gray-700 text-${levelColor}-400`}>
                        <th className="px-6 py-4 text-left text-sm font-medium">Job Title</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Company</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Location</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Posted Date</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Application</th>
                        <th className="px-6 py-4 text-center text-sm font-medium">Applied</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredJobs.map(job => (
                        <tr
                          key={job.id}
                          className={`transition-colors duration-300 hover:bg-gray-700 ${
                            job.applied ? `bg-${levelColor}-800/20` : ''
                          }`}
                        >
                          <td className={`px-6 py-4 text-sm font-medium text-${levelColor}-400`}>
                            {job.title}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {job.company}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {job.location}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {job.postedDate}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <a
                              href={job.applicationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center space-x-1 hover:underline text-${levelColor}-400 hover:text-${levelColor}-300`}
                            >
                              <span>Apply</span>
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
                                checked={job.applied}
                                onChange={() => handleAppliedChange(job.id)}
                                className={`rounded-sm w-5 h-5 focus:ring-0 cursor-pointer transition-colors text-${levelColor}-500 bg-gray-700 border-gray-600`}
                              />
                            </label>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Save Applications Button */}
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={saveApplications}
                    disabled={savingApplication}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      savingApplication
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        : `bg-${levelColor}-600 hover:bg-${levelColor}-700 text-white`
                    }`}
                  >
                    {savingApplication ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving Applications...
                      </span>
                    ) : (
                      'Save Applications'
                    )}
                  </button>
                  
                  {/* Success/Error Messages */}
                  <div>
                    {applySuccess && (
                      <div className="text-green-400 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Applications saved successfully!
                      </div>
                    )}
                    {applyFailed && (
                      <div className="text-red-400 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Failed to save applications. Please try again.
                      </div>
                    )}
                  </div>
                </div>

                {/* No results message */}
                {filteredJobs.length === 0 && (
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
                    <p className="text-lg font-medium">No jobs match your search</p>
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

export default ApplyJobs;