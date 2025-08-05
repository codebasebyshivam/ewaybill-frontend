import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSession from '../../hooks/useSession';

const SessionWrapper = ({ children }) => {
  const { checkSession, lastCheckedRef, IDLE_LIMIT } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const handleVisibility = async () => {
      const now = Date.now();
      if (document.visibilityState === 'visible') {
        if (now - lastCheckedRef.current > IDLE_LIMIT) {
          try {
            console.log(
              'Session expired, checking session for inactive tab...'
            );
            await checkSession();
          } catch {
            toast.error('Session expired. Please login again.');
            navigate('/login');
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return children;
};

export default SessionWrapper;
