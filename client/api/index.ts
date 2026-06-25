import axios from "axios";

export const protectedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  withCredentials: true,
});

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error?: unknown) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

protectedApi.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => protectedApi(originalRequest));
    }

    isRefreshing = true;

    try {
      await publicApi.put("/auth/refresh-token");

      processQueue();

      return protectedApi(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }    
);