import axios from 'axios';
import store from '../store';
import * as actions from '../store/modules/auth/actions';
import { toast } from 'react-toastify';
const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: baseURL
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      const { isLoggedIn } = store.getState().auth;

      if (isLoggedIn) {
        store.dispatch(actions.loginFailure());
        toast.error('Sessão expirada. Faça login novamente.');
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
