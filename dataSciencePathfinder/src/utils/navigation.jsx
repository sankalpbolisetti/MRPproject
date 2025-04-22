import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Higher-order component for protected routes
export const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !currentUser) {
      // Redirect to home if not authenticated
      navigate('/');
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return currentUser ? children : null;
};

// Navigation handler for Google Auth
export const handleAuthSuccess = (navigate) => {
  // Redirect to skill level page after successful authentication
  navigate('/skill-level');
};

// Update this in your GoogleAuthModal.jsx
/*
const handleGoogleSignIn = async () => {
  try {
    setLoading(true);
    setError('');
    await signInWithGoogle();
    onClose();
    handleAuthSuccess(navigate); // Add this line
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
};
*/