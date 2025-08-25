import { useUpdateBook } from "@/hooks/useUpdateBooks";
import { useUploadImage } from "@/hooks/useUploadImage";
import { useBookStore } from "@/stores/useBookStore";

import { ChangeEvent } from "react";

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

  const updateBookMutation = useUpdateBook();

  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5173/app"
      : "https://el.gusanitolector.pe/app/isbn/";

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file || !editedBook?.sku || editedBook.id == null) return; // early return

    const bookId = editedBook.id; // ahora es seguro usarlo como number

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

      <input
        id="file_input"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      />

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
