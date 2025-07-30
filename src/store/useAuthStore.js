import { create } from 'zustand';
import api from '../api/axios.instance';

const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    hasFetched: false,
    setUser: (user) => set({ user }),
    clearUser: () => (set({ user: null })),
    fetchUser: async () => {
        set({ isLoading: true });
        try {
            const response = await api.get('/api/me');
            set({ user: response.data, isLoading: false, hasFetched: true });
        } catch (error) {
            set({ user: null, isLoading: false, hasFetched: true });
        }
    },
    resetAuth: () => {set({ user: null, isLoading: false, hasFetched: false })}

}));



export default useAuthStore;