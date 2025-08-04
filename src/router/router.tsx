import { createBrowserRouter } from "react-router-dom";

import { Root } from "../Root";
import { AuthLayout, DashboardLayout } from "../layouts";
import { Dashboard, LoginPage, PurchasePage, SellingPage } from "../pages";
import InventoryPage from "@/pages/inventory/InventoryPage";
import { InventoryAdjust } from "@/pages/inventory/InventoryAdjust";
import BookDetailPage from "@/pages/inventory/BookDetail/BookDetailPage";

export const router = createBrowserRouter([
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
            element: <InventoryPage />,
          },
          {
            path: "inventory/:sku",
            element: <BookDetailPage />,
          },
          {
            path: "inventoryAdjust",
            element: <InventoryAdjust />,
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
]);
