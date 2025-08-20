import { useParams } from "react-router-dom";
import { useBookStore } from "@/stores/useBookStore";
import { useState } from "react";
import BookHeader from "./BookHeader";
import BookTabs from "./BookTabs";
import BookGeneralInfo from "./BookGeneralInfo";
import BookAttributes from "./BookLocations";
import BookTransactions from "./BookTransactions";
import BookHistory from "./BookHistory";
import type { TabId } from "@/types/ui/BookDetailUI";
import BookSidebar from "./BookSideBar";
import BackButton from "@components/shared/BackButton";

const BookDetailPage = () => {
  const { sku } = useParams();
  const { books } = useBookStore();
  const book = books.find((b) => b.sku === sku);
  const [activeTab, setActiveTab] = useState<TabId>("general");

  if (!book) {
    return <div className="p-10 text-center">Libro no encontrado.</div>;
  }

  const statsData = {
    physicalExistences: {
      total: book.totalStock ?? 0,
      available: book.totalStock ?? 0,
      reserved: 0,
      loaned: 0,
    },
    digitalExistences: {
      total: 0,
      available: 0,
      reserved: 0,
      downloads: 0,
    },
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <BookGeneralInfo book={book} />;
      case "locations":
        return <BookAttributes book={book} />;
      case "transactions":
        return <BookTransactions book={book} />;
      case "history":
        return <BookHistory book={book} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BookHeader book={book} />
            <BookTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {renderTabContent()}
            </div>
          </div>
          <BookSidebar book={book} statsData={statsData} />
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
