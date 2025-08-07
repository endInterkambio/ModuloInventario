import { updateBook } from "@/api/modules/books";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookDTO } from "@/types/BookDTO";

export function useUpdateBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: {id: number; data: Partial<BookDTO>}) =>
            updateBook(id, data),
        onSuccess: (updatedBook) => {
            queryClient.invalidateQueries({queryKey: ["books"]});
            queryClient.invalidateQueries({queryKey: ["books", updatedBook.id]});
        }
    })
}