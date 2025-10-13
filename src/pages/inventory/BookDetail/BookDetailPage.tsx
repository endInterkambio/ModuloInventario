import { useParams } from "react-router-dom";
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
import { useBook } from "@/hooks/useBooks";
import NewButton from "@components/NewButton";
import { useIsAdmin } from "@/hooks/useAuthRole";

const BookDetailPage = () => {
  const { sku } = useParams<{ sku: string }>();
  const [activeTab, setActiveTab] = useState<TabId>("general");

  // Obtener el libro por SKU desde el backend para persistencia de datos
  const { data: book, isLoading, error } = useBook(sku);

  const isAdmin = useIsAdmin();

  if (isLoading) {
    return <div className="p-10 text-center">Cargando libro...</div>;
  }

  if (error) {
    return <div className="p-10 text-center">Error al cargar libro.</div>;
  }

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
      <div className="flex justify-between items-start px-4 pt-4">
        <BackButton />
        {isAdmin && (
          <NewButton to={"/dashboard/inventory/newBook"} label={"Nuevo"} className="flex items-center gap-2 bg-primary hover:bg-green-700 text-white px-4 py-2" />
        )}
      </div>
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
