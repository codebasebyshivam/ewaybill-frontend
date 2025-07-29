import { useRef } from 'react';
import api from '../api/axios.instance';
import useAuthStore from '../store/useAuthStore';

const useSession = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const lastCheckedRef = useRef(Date.now());
  const IDLE_LIMIT = 1 * 60 * 1000;

  const checkSession = async () => {
    try {
      const res = await api.get('/api/me');
      setUser(res.data);
      lastCheckedRef.current = Date.now();
    } catch (err) {
      setUser(null);
      throw new Error('Session expired');
    }
  };

  return { checkSession, lastCheckedRef, IDLE_LIMIT };
};

export default useSession;
