import { BookDTO } from "@/types/BookDTO";
import StatCard from "./StatCard";
import placeholder from "@assets/no-image.jpg";
import BookQuickActions from "./BookQuickActions";
import { UploadButton } from "@components/shared/UploadButton";

type Props = {
  book: BookDTO;
  statsData: {
    physicalExistences: Record<string, number>;
  };
};

const BookSidebar = ({ book, statsData }: Props) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <img
        src={book.imageUrl || placeholder}
        alt={book.title}
        className="w-full h-64 object-contain rounded-md mb-4"
        onError={(e) => (e.currentTarget.src = placeholder)}
      />
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <UploadButton />
        </div>
      </div>
    </div>

    <StatCard title="Existencias físicas" stats={statsData.physicalExistences} type="physical" />

    <BookQuickActions />
    {/*TODO: Resumen de operaciones */}
    {/* <BookSummary /> */}
  </div>
);

export default BookSidebar;
