import { SideMenu } from "../components";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useBookStore } from "@/stores/useBookStore";

export const DashboardLayout = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const clearFilters = useBookStore((state) => state.clearFilters);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = location.pathname;

    const isPrevInventory =
      prevPath === "/dashboard/inventory" ||
      /^\/dashboard\/inventory\/.+$/.test(prevPath); // lista o detalle

    const isCurrentInventory =
      currentPath === "/dashboard/inventory" ||
      /^\/dashboard\/inventory\/.+$/.test(currentPath);

    // Si antes estábamos en inventory y ahora salimos completamente, limpiamos filtros
    if (isPrevInventory && !isCurrentInventory) {
      clearFilters();
    }

    prevPathRef.current = currentPath;
  }, [location.pathname, clearFilters]);

  return (
    <div className="bg-slate-200 overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
      <div className="flex flex-row relative w-screen">
        <SideMenu />

        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
