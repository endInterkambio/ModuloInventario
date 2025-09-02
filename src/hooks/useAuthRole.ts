import { useAuthStore } from "@/stores/useAuthStore";

export const useIsAdmin = () => {
  const userRole = useAuthStore(state => state.user?.role?.name ?? "");
  return userRole === "ADMIN";
};
