import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ReactQueryProvider } from "./providers/QueryClientProvider.tsx";
import { router } from "./router/router.tsx";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ReactQueryProvider>
  </React.StrictMode>
);
