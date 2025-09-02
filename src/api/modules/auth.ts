import axiosInstance from "../axiosInstance";

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: {
      id: number,
      name: string,
    } | null;
  };
}

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>("/auth/login", {
      username,
      password,
    });
    return data;
  },

  logout: async () => {
    return axiosInstance.post("/auth/logout");
  },
};
