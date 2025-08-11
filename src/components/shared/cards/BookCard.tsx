import { BookDTO } from "@/types/BookDTO";
import placeholder from "@assets/no-image.jpg";
import { useNavigate } from "react-router-dom";

type BookCardProps = {
  book: BookDTO;
};

const BookCard = ({ book }: BookCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/inventory/${book.sku}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white shadow rounded-2xl p-4 flex flex-col items-center text-center"
    >
      <img
        src={book.imageUrl || placeholder}
        alt={book.title}
        className="w-24 h-32 object-cover mb-2 rounded"
        onError={(e) => (e.currentTarget.src = placeholder)}
      />
      <h3 className="font-bold text-sm uppercase">{book.title}</h3>
      <p className="text-xs text-gray-600 mt-1">SKU: {book.sku || "N/A"}</p>
      <p className="text-sm text-green-600 mt-1">
        Stock: <span className="font-semibold">{book.totalStock} pcs</span>
      </p>
      <p className="text-sm mt-2">
        <span className="text-gray-500">Precio de venta:</span>{" "}
        <span className="font-medium">S/. {book.sellingPrice.toFixed(2)}</span>
      </p>
      <p className="text-sm">
        <span className="text-gray-500">Autor:</span>{" "}
        <span className="font-medium">{book.author}</span>
      </p>
    </div>
  );
};

export default BookCard;
