import { useUpdateBook } from "@/hooks/useUpdateBooks";
import { useUploadImage } from "@/hooks/useUploadImage";
import { useBookStore } from "@/stores/useBookStore";
import { Upload } from "lucide-react";

import { ChangeEvent, useState } from "react";

export const UploadButton = () => {
  const {
    mutate: uploadImage,
    isPending,
    isError,
    isSuccess,
    data,
    error,
  } = useUploadImage();

  const editedBook = useBookStore((state) => state.editedBook);
  const setEditedBook = useBookStore((state) => state.setEditedBook);
  const updateBookLocally = useBookStore((state) => state.updateBookLocally);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const updateBookMutation = useUpdateBook();

  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:8080/app/public/uploads/books"
      : "https://el.gusanitolector.pe/app/isbn";

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file || !editedBook?.sku || editedBook.id == null) return; // early return

    setSelectedFile(file);

    const bookId = editedBook.id;

    uploadImage(
      { file, sku: editedBook.sku },
      {
        onSuccess: (newUrl) => {
          const fullUrl = newUrl.startsWith("http")
            ? newUrl
            : `${BASE_URL}${newUrl}`;

          updateBookMutation.mutate(
            { id: bookId, data: { imageUrl: fullUrl } },
            {
              onSuccess: (updatedBook) => {
                setEditedBook(updatedBook);
                updateBookLocally(updatedBook);
              },
              onError: (err) =>
                console.error("Error al guardar imagen en backend:", err),
            }
          );
        },
      }
    );
  };

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        {isPending ? "Subiendo..." : "Subir imagen"}
      </label>

      <label
        htmlFor="file_input"
        className={`cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition
        ${
          isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[--color-button] hover:bg-green-700 text-white"
        }`}
      >
        <Upload className="w-4 h-4" />
        {isPending ? "Subiendo..." : "Seleccionar imagen"}
      </label>

      <input
        id="file_input"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {selectedFile && (
        <p className="text-gray-600 text-sm mt-1">
          📁 Archivo seleccionado: <span className="font-medium">{selectedFile.name}</span>
        </p>
      )}

      {isError && (
        <p className="text-red-500 text-sm mt-2">
          Error: {(error as Error).message}
        </p>
      )}
      {isSuccess && (
        <p className="text-green-500 text-sm mt-2">
          Imagen subida correctamente: {data}
        </p>
      )}
    </div>
  );
};
