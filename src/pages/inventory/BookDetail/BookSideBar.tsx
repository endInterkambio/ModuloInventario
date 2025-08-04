import { BookDTO } from "@/types/BookDTO";
import StatCard from "./StatCard";
import placeholder from "@assets/no-image.jpg";
import BookQuickActions from "./BookQuickActions";
import BookSummary from "./BookSummary";

type Props = {
  book: BookDTO;
  statsData: {
    physicalExistences: Record<string, number>;
    digitalExistences: Record<string, number>;
  };
};

const BookSidebar = ({ book, statsData }: Props) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <img
        src={book.imageUrl || placeholder}
        alt={book.title}
        className="w-full h-64 object-cover rounded-md border border-gray-200 mb-4"
        onError={(e) => (e.currentTarget.src = placeholder)}
      />
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Portada</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">👁️</span>
          <span className="text-gray-800">0</span>
        </div>
      </div>
    </div>

    <StatCard title="Existencias físicas" stats={statsData.physicalExistences} type="physical" />
    <StatCard title="Existencias digitales" stats={statsData.digitalExistences} type="digital" />

    <BookQuickActions />
    <BookSummary />
  </div>
);

export default BookSidebar;
