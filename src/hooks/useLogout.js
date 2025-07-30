import { useNavigate } from "react-router-dom";
import api from "../api/axios.instance";
import useAuthStore from "../store/useAuthStore";
import { toast } from 'react-toastify';


const useLogout = () => {
    const { resetAuth } = useAuthStore();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await api.get('/api/logout');
            toast.success('You have been logged out.');
        } catch (error) {
            console.error('logout failed:', error);
            toast.error('Logout failed on server. Please try again.');
        } finally {
            resetAuth();
            navigate("/login", { replace: true });
        }
    }

    return logout;

};


export default useLogout;