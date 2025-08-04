import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useBookStore } from "@/stores/useBookStore";
import DOMPurify from "dompurify";

import {
  BookOpen,
  User,
  Tag,
  FileText,
  DollarSign,
  Package,
  Eye,
  Download,
  Settings,
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";
import placeholder from "@assets/no-image.jpg";

// Tipos internos para UI (puedes moverlos a otro archivo si lo deseas)
type TabId = "general" | "attributes" | "transactions" | "history";

interface TabButtonProps {
  id: TabId;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

interface InfoRowProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

interface StatCardProps {
  title: string;
  stats: Record<string, number>;
  type: "physical" | "digital";
}

// Componentes auxiliares
const TabButton = ({ id, label, isActive, onClick }: TabButtonProps) => (
  <button
    key={id}
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      isActive
        ? "border-blue-500 text-blue-600 bg-blue-50"
        : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
    }`}
  >
    {label}
  </button>
);

const InfoRow = ({ label, value, icon }: InfoRowProps) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100">
    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
      {icon}
      {label}
    </div>
    <div className="text-sm text-gray-800 max-w-xs text-right">
      {typeof value === "string" && value.length > 50
        ? `${value.substring(0, 50)}...`
        : value}
    </div>
  </div>
);

const StatCard = ({ title, stats, type }: StatCardProps) => {
  const getStatLabel = (key: string): string => {
    const labels: Record<string, string> = {
      total: "Total",
      available: "Disponible",
      reserved: "Reservado",
      loaned: "Prestado",
      downloads: "Descargas",
    };
    return labels[key] || key;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        {type === "physical" ? (
          <Package className="w-4 h-4" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {title}
      </h3>
      <div className="space-y-2">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center text-sm">
            <span className="text-gray-600 capitalize">
              {getStatLabel(key)}
            </span>
            <span className="font-medium text-gray-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BookDetailPage = () => {
  const { sku } = useParams();
  const { books } = useBookStore();
  const book = books.find((b) => b.sku === sku);
  const [activeTab, setActiveTab] = useState<TabId>("general");

  if (!book) {
    return (
      <div className="p-10 text-center text-gray-600">
        Libro no encontrado con SKU <strong>{sku}</strong>.
      </div>
    );
  }

  const statsData = {
    physicalExistences: {
      total: book.stock ?? 0,
      available: book.stock ?? 0,
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
        return (
          <div className="space-y-1">
            <InfoRow
              label="Tipo de artículo"
              value="Artículo de inventario"
              icon={<Package className="w-4 h-4" />}
            />
            <InfoRow
              label="SKU/Código de artículo"
              value={book.sku}
              icon={<Tag className="w-4 h-4" />}
            />
            <InfoRow
              label="Título"
              value={book.title}
              icon={<BookOpen className="w-4 h-4" />}
            />
            <InfoRow
              label="ISBN"
              value={book.isbn ?? "N/A"}
              icon={<FileText className="w-4 h-4" />}
            />
            <InfoRow
              label="Autor"
              value={book.author ?? "N/A"}
              icon={<User className="w-4 h-4" />}
            />
            <InfoRow
              label="Editorial"
              value={book.publisher ?? "N/A"}
              icon={<FileText className="w-4 h-4" />}
            />
            <InfoRow
              label="Categoría"
              value={book.category ?? "N/A"}
              icon={<Tag className="w-4 h-4" />}
            />
            <InfoRow
              label="Formato"
              value={book.format ?? "N/A"}
              icon={<FileText className="w-4 h-4" />}
            />
            <InfoRow
              label="Idioma"
              value={book.language ?? "N/A"}
              icon={<FileText className="w-4 h-4" />}
            />
            <InfoRow
              label="Descripción"
              value={book.description ?? "N/A"}
              icon={<FileText className="w-4 h-4" />}
            />
            <InfoRow
              label="Precio de venta"
              value={`S/. ${book.sellingPrice.toFixed(2)}`}
              icon={<DollarSign className="w-4 h-4" />}
            />
          </div>
        );

      case "attributes":
        return (
          <div className="space-y-1">
            <InfoRow label="Condición" value={book.bookCondition ?? "N/A"} />
            <InfoRow label="Estante" value={book.bookcase ?? "N/A"} />
            <InfoRow label="Piso" value={book.bookcaseFloor ?? "N/A"} />
          </div>
        );

      case "transactions":
        return (
          <div className="space-y-1">
            <InfoRow
              label="Precio de compra"
              value={`S/. ${book.purchasePrice?.toFixed(2) ?? "0.00"}`}
              icon={<DollarSign className="w-4 h-4" />}
            />
            <InfoRow
              label="Precio de venta"
              value={`S/. ${book.sellingPrice?.toFixed(2) ?? "0.00"}`}
              icon={<DollarSign className="w-4 h-4" />}
            />
          </div>
        );

      case "history":
        return (
          <div className="text-sm text-gray-600">
            <p>No hay historial disponible para este libro.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-800">
                Detalle del Libro
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Book Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <img
                  src={book.imageUrl || placeholder}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-md border border-gray-200"
                  onError={(e) => (e.currentTarget.src = placeholder)}
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {book.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {book.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {book.category}
                    </span>
                  </div>
                  <p
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        book.description || "Sin descripción"
                      ),
                    }}
                  />

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Disponible
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {book.format}
                    </span>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <TabButton
                    id="general"
                    label="Información general"
                    isActive={activeTab === "general"}
                    onClick={() => setActiveTab("general")}
                  />
                  <TabButton
                    id="attributes"
                    label="Atributos"
                    isActive={activeTab === "attributes"}
                    onClick={() => setActiveTab("attributes")}
                  />
                  <TabButton
                    id="transactions"
                    label="Transacciones"
                    isActive={activeTab === "transactions"}
                    onClick={() => setActiveTab("transactions")}
                  />
                  <TabButton
                    id="history"
                    label="Historial"
                    isActive={activeTab === "history"}
                    onClick={() => setActiveTab("history")}
                  />
                </nav>
              </div>
              <div className="p-6">{renderTabContent()}</div>
            </div>
          </div>

          {/* Sidebar */}
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
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-800">0</span>
                </div>
              </div>
            </div>

            <StatCard
              title="Existencias físicas"
              stats={statsData.physicalExistences}
              type="physical"
            />
            <StatCard
              title="Existencias digitales"
              stats={statsData.digitalExistences}
              type="digital"
            />

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-3">
                Acciones rápidas
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
                  Ver estadísticas
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-md transition-colors">
                  Editar información
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-3">
                Resumen de operación
              </h3>
              <div className="text-center py-4">
                <div className="text-2xl font-bold text-gray-400">0</div>
                <div className="text-sm text-gray-500">Sin actividad</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-400">0</div>
                  <div className="text-xs text-gray-500">Compras</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-400">0</div>
                  <div className="text-xs text-gray-500">Ventas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
