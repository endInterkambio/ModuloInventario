import { uploadImage } from "@/api/modules/upload";
import { useEntityMutation } from "@/hooks/useEntityMutation";

export const useUploadImage = () => {
  return useEntityMutation<string, { file: File; sku: string }>({
    mutationFn: ({ file, sku }) => uploadImage(file, sku),
    queryKeyToInvalidate: ["images"], // puedes cambiarlo según lo que quieras refrescar
  });
};
