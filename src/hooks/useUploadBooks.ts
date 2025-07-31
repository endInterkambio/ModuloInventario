// hooks/useBooks.ts
import { useMutation } from "@tanstack/react-query";
import api from "@/api/axiosInstance";

export const useUploadBooks = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/books/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
  });
};
