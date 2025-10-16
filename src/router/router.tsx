import { createBrowserRouter } from "react-router-dom";

import { Root } from "../Root";
import { AuthLayout, DashboardLayout } from "../layouts";
import { Dashboard, LoginPage } from "../pages";
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
import { ShipmentPage } from "@/pages/sales/Shipments";
import { ShipmentCreationForm } from "@components/ShipmentForm";
import { PurchaseOrdersPage } from "@/pages/purchases/PurchaseOrdersPage";
import { PurchaseOrderForm } from "@components/PurchaseOrderForm";
import { PaymentMadePage } from "@/pages/purchases/PaymentMadePage";
import { SuppliersPage } from "@/pages/purchases/SuppliersPage";

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
                {
                  path: "purchase",
                  element: <PurchaseOrdersPage />,
                  children: [
                    {
                      path: "newPurchaseOrder",
                      element: <PurchaseOrderForm />,
                    },
                  ],
                },
                {
                  path: "paymentMade",
                  element: <PaymentMadePage/>,
                  children: [
                    {
                      path: "newPaymentMade",
                      element: <PaymentMadePage/>
                    }
                  ]
                },
                {
                  path: "suppliers",
                  element: <SuppliersPage/>,
                },
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
                {
                  path: "shipments",
                  element: <ShipmentPage />,
                  children: [
                    {
                      path: "newShipment",
                      element: <ShipmentCreationForm />,
                    },
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
