import { memo, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const ProtectedRoute = ({ children, redirect_route }) => {
  const { user, isLoading, hasFetched, fetchUser } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!hasFetched && !isLoading) {
      fetchUser();
    }
  }, [hasFetched, isLoading, fetchUser]);

  // ⏳ Wait for fetch to complete before making any decision
  if (!hasFetched || isLoading) {
    return <div>Checking authentication...</div>;
  }

  // ❌ After fetching, still no user → redirect
  if (!user) {
    return <Navigate to={redirect_route} state={{ from: location }} replace />;
  }

  // ✅ Authenticated → render child
  return children;
};

export default memo(ProtectedRoute);
