// src/api/axiosInstance.ts
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

// Crear instancia
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://el.gusanitolector.pe/api/",
});

// ---- Interceptor de request: Adjuntar accessToken ----
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ---- Manejo de expiración de accessToken ----
let isRefreshing = false;

// Tipado para requests en espera mientras se refresca token
type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ---- Interceptor de response ----
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Caso: AccessToken expirado
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Esperar a que se resuelva el refresh en progreso
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        // Llamada al backend para refrescar
        const { data } = await axios.post<{ accessToken: string }>(
          "http://localhost:8080/api/auth/refresh",
          { refreshToken }
        );

        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Actualizar el default header
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        // Reintentar la request original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // Cerrar sesión forzadamente
        const { logoutUser } = useAuthStore.getState();
        logoutUser();

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
