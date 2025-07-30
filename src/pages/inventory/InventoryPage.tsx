import BookCard from "@/components/shared/cards/BookCard";
import { useBookStore } from "@/stores/useBookStore";

const InventoryPage = () => {
  const { filteredBooks } = useBookStore();

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Todos los artículos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.SKU ?? book.ItemName} book={book} />
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
