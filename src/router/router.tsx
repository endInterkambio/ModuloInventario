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
import SalesOrderForm from "@components/SalesOrderForm/SalesOrderForm";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        /// Dashboard Routes
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
            {
              path: "inventory",
              element: <BooksPage />,
              children: [
                {
                  path: ":sku",
                  element: <BookDetailPage />,
                },
                {
                  path: "newBook",
                  element: <BookCreationForm />,
                },
              ],
            },
            {
              path: "inventoryAdjust",
              element: <InventoryManagementPage />,
            },
            {
              path: "purchase",
              element: <PurchasePage />,
            },
            {
              path: "selling",
              element: <SaleOrdersPage />,
              children: [
                {
                  path: "newSaleOrder",
                  element: <SalesOrderForm />,
                },
              ],
            },
            {
              path: "paymentReceived",
              element: <PaymentReceivedPage />,
            },
            {
              path: "customer",
              element: <CustomerPage />,
            },
          ],
        },

        /// Auth Routes
        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            {
              path: "login",
              element: <LoginPage />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/app",
  }
);
