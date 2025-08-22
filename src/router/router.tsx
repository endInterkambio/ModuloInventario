import { createBrowserRouter } from "react-router-dom";

import { Root } from "../Root";
import { AuthLayout, DashboardLayout } from "../layouts";
import { Dashboard, LoginPage, PurchasePage, SellingPage } from "../pages";
import BookDetailPage from "@/pages/inventory/BookDetail/BookDetailPage";
import InventoryManagementPage from "@/pages/inventory/InventoryAdjustment/InventoryManagementPage";
import BooksPage from "@/pages/inventory/BooksPage";
import { BookCreationForm } from "@components/BookForm/BookCreationForm";

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
                  path: "new",
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
              element: <SellingPage />,
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
