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
      /^\/dashboard\/inventory\/.+$/.test(prevPath);

    const isCurrentInventory =
      currentPath === "/dashboard/inventory" ||
      /^\/dashboard\/inventory\/.+$/.test(currentPath);

    if (isPrevInventory && !isCurrentInventory) {
      clearFilters();
    }

    prevPathRef.current = currentPath;
  }, [location.pathname, clearFilters]);

  return (
    <div className="flex h-screen w-screen bg-slate-200 antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
      {/* Sidebar fijo */}
      <SideMenu />

      {/* Contenido con scroll */}
      <div className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

