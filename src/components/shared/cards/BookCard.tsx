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
      <p className="text-xs text-gray-600 mt-1">{book.publisher || ""}</p>
      <p className="text-xs text-gray-600 mt-1">{book.formats || ""}</p>
      <p className="text-sm text-green-600 mt-1">
        Stock: <span className="font-semibold">{book.totalStock} pcs</span>
      </p>
      <p className="text-sm mt-2">
        <span className="text-gray-500">Precio de venta:</span>{" "}
        {book.isOfferActive ? (
          <span className="font-medium inline-flex items-center space-x-2">
            <span className="text-gray-400 line-through">
              S/. {book.sellingPrice.toFixed(2)}
            </span>
            <span className="text-green-600 font-semibold">
              S/. {book.offerPrice.toFixed(2)}
            </span>
            <span className="text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded-full ml-1">
              Oferta
            </span>
          </span>
        ) : (
          <span className="font-medium text-gray-900">
            S/. {book.sellingPrice.toFixed(2)}
          </span>
        )}
      </p>
      <p className="text-sm">
        <span className="text-gray-500">Autor:</span>{" "}
        <span className="font-medium">{book.author}</span>
      </p>
    </div>
  );
};

export default BookCard;
