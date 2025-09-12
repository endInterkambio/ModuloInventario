import { createBrowserRouter } from "react-router-dom";

import { Root } from "../Root";
import { AuthLayout, DashboardLayout } from "../layouts";
import { Dashboard, LoginPage, PurchasePage } from "../pages";
import BookDetailPage from "@/pages/inventory/BookDetail/BookDetailPage";
import InventoryManagementPage from "@/pages/inventory/InventoryAdjustment/InventoryManagementPage";
import BooksPage from "@/pages/inventory/BooksPage";
import { BookCreationForm } from "@components/BookForm/BookCreationForm";
import { SaleOrdersPage } from "@/pages/sales/SaleOrders";
import { PaymentReceivedPage } from "@/pages/sales/PaymentReceivedPage";
import { CustomerPage } from "@/pages/sales/CustomerPage";
import CustomerCreationForm from "@components/CustomerForm/CustomerCreationForm";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SalesOrderForm } from "@components/SalesOrderForm";
import { PaymentReceivedCreationForm } from "@components/PaymentReceivedCreationForm";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        // Rutas privadas protegidas
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "dashboard",
              element: <DashboardLayout />,
              children: [
                { path: "", element: <Dashboard /> },
                {
                  path: "inventory",
                  element: <BooksPage />,
                  children: [
                    { path: ":sku", element: <BookDetailPage /> }, // dinámica
                    { path: "newBook", element: <BookCreationForm /> },
                  ],
                },
                {
                  path: "inventoryAdjust",
                  element: <InventoryManagementPage />,
                },
                { path: "purchase", element: <PurchasePage /> },
                {
                  path: "selling",
                  element: <SaleOrdersPage />,
                  children: [
                    { path: "newSaleOrder", element: <SalesOrderForm /> },
                  ],
                },
                {
                  path: "paymentReceived",
                  element: <PaymentReceivedPage />,
                  children: [
                    {
                      path: "newPaymentReceived",
                      element: <PaymentReceivedCreationForm />,
                    },
                  ],
                },
                {
                  path: "customer",
                  element: <CustomerPage />,
                  children: [
                    { path: "newCustomer", element: <CustomerCreationForm /> },
                  ],
                },
              ],
            },
          ],
        },

        // Rutas públicas
        {
          path: "auth",
          element: <AuthLayout />,
          children: [{ path: "login", element: <LoginPage /> }],
        },
      ],
    },
  ],
  { basename: "/app" }
);
