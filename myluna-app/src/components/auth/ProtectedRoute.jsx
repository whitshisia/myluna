import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../shared/Loader';

export default function ProtectedRoute({ 
  children, 
  requireOnboarding = false 
}) {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requireOnboarding && userData && !userData.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}