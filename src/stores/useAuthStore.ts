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
  user: null,
  token: localStorage.getItem("token"), // persistente si ya había login
  loading: false,
  error: null,

  loginUser: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await authApi.login(username, password);

      // Guardar token y usuario en estado y localStorage
      localStorage.setItem("token", res.token);
      set({ user: res.user, token: res.token, loading: false });
    } catch (error) {
      const message = getErrorMessage(error);
      set({ error: message, loading: false });
      throw new Error(message); // permite que LoginPage capture error
    }
  },

  logoutUser: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, error: null });
  },
}));
