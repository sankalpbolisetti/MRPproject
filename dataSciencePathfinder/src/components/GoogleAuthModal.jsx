import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { signInWithGoogle } from '../services/authService';
import axios from 'axios';
const GoogleAuthModal = ({ isOpen, onClose, darkMode }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setError('');
      setLoading(false);
    }
  }, [isOpen]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await signInWithGoogle();
      console.log("Authentication successful:", result);
      onClose();
      const user = result.user;
      const simplifiedUser = {
        googleId: user.uid,            // from Firebase
        userName: user.displayName,
        userEmail: user.email,
        // photoUrl: user.photoURL
      };
      console.log("body is ",simplifiedUser)
      await axios.post("http://localhost:1616/users", simplifiedUser).then(
        setTimeout(() => {
          window.location.href = '/skill-level';
        }, 500)
      );
      // Force navigation with a slight delay to ensure auth state is updated
    } catch (error) {
      console.error("Sign-in error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className={`relative w-full max-w-lg rounded-xl p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-2xl`}>
        {/* Close button */}
        <button 
          className={`absolute right-4 top-4 p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Sign In to DataSciencePathFinder</h2>
          <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Connect with your Google account to continue
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className={`mb-4 p-3 rounded-lg flex items-start gap-2 ${darkMode ? 'bg-red-900/30 text-red-200' : 'bg-red-50 text-red-600'}`}>
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Google login button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg font-medium 
            ${darkMode 
              ? 'bg-white text-gray-800 hover:bg-gray-100' 
              : 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-300'} 
            transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <img 
            src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" 
            alt="Google" 
            className="w-6 h-6" 
          />
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            By continuing, you agree to our <a href="#" className={darkMode ? 'text-blue-400' : 'text-indigo-600'}>Terms of Service</a> and <a href="#" className={darkMode ? 'text-blue-400' : 'text-indigo-600'}>Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuthModal;