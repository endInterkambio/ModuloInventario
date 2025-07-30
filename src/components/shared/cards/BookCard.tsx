import {type Book} from '@/data/bookData'
import placeholder from '@assets/no-image.jpg'

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="bg-white shadow rounded-2xl p-4 flex flex-col items-center text-center">
      <img
        src={book.ImageUrl || placeholder}
        alt={book.ItemName}
        className="w-24 h-32 object-cover mb-2 rounded"
        onError={(e) => (e.currentTarget.src = placeholder)}
      />
      <h3 className="font-bold text-sm uppercase">{book.ItemName}</h3>
      <p className="text-xs text-gray-600 mt-1">SKU: {book.SKU || "N/A"}</p>
      <p className="text-sm text-green-600 mt-1">
        Existencias a mano: <span className="font-semibold">{book.StockOnHand} pcs</span>
      </p>
      <p className="text-sm mt-2">
        <span className="text-gray-500">Precio de venta:</span>{" "}
        <span className="font-medium">S/. {book.SellingPrice.toFixed(2)}</span>
      </p>
      <p className="text-sm">
        <span className="text-gray-500">Autor:</span>{" "}
        <span className="font-medium">{book.Author}</span>
      </p>
    </div>
  );
};

export default BookCard;
