import { create } from "zustand";
import { authApi, LoginResponse } from "@/api/modules/auth";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface AuthState {
  user: LoginResponse["user"] | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  loginUser: (username: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  token: localStorage.getItem("accessToken") || null,
  loading: false,
  error: null,

  loginUser: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await authApi.login(username, password);

      // Guardar tokens y usuario en estado y localStorage
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.user));

      set({
        user: res.user,
        token: res.accessToken,
        loading: false,
      });
    } catch (error) {
      const message = getErrorMessage(error);
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  logoutUser: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    set({ user: null, token: null, error: null });
  },
}));
