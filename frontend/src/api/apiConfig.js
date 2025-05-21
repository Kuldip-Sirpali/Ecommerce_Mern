import axios from "axios";
import { store } from "../redux/store";
import { BACKEND_URL } from "../utils/constants";

const api = axios.create({
  baseURL: BACKEND_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().customer?.user?.accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/sign-in";
    } else if (error.response && error.response.status === 402) {
      // Attempt to refresh the token
      const originalRequest = error.config;
      try {
        const refreshToken = store.getState().customer?.user?.refreshToken;

        if (refreshToken) {
          return axios
            .post(`${BACKEND_URL}/user/refresh-token`, {
              refreshToken,
            })
            .then((res) => {
              const newAccessToken = res?.data?.data?.accessToken;
              const newRefreshToken = res?.data?.data?.refreshToken;

              // Optionally update the store with the new token here
              store.dispatch({
                type: "customer/updateAccessToken",
                payload: newAccessToken,
              });
              store.dispatch({
                type: "customer/updateRefreshToken",
                payload: newRefreshToken,
              });
              // Retry the original request with new token
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              return api(originalRequest);
            });
        }
      } catch (refreshError) {
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
