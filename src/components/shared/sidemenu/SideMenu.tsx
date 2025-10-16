import { useState } from "react";
import { SideMenuItem } from "./SideMenuItem";
import { LogoutButton } from "@components/LogoutButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { useIsAdmin } from "@/hooks/useAuthRole";
import { IoSpeedometerOutline, IoPawOutline } from "react-icons/io5";
import { MdOutlineInventory, MdPointOfSale } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { IconType } from "react-icons";

interface MenuItem {
  title: string;
  subTitle: string;
  href?: string;
  Icon: IconType;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    subTitle: "Visualizar data",
    href: "/dashboard",
    Icon: IoSpeedometerOutline,
  },
  {
    title: "Inventario",
    subTitle: "Módulo de inventario",
    Icon: MdOutlineInventory,
    children: [
      {
        title: "Artículos",
        subTitle: "Catálogo",
        href: "/dashboard/inventory",
        Icon: IoPawOutline,
      },
      {
        title: "Ajuste de inventario",
        subTitle: "Mantenimiento",
        href: "/dashboard/inventoryAdjust",
        Icon: IoPawOutline,
      },
    ],
  },
  {
    title: "Compras",
    subTitle: "Módulo de compras",
    href: "/dashboard/purchase",
    Icon: BiPurchaseTag,
    children: [
      {
        title: "Ordenes de compra",
        subTitle: "Detalles y estado",
        href: "/dashboard/purchase",
        Icon: IoPawOutline,
      },
      {
        title: "Pagos realizados",
        subTitle: "Detalles",
        href: "/dashboard/paymentMade",
        Icon: IoPawOutline,
      },
      {
        title: "Proveedores",
        subTitle: "Consultar y crear nuevos",
        href: "/dashboard/suppliers",
        Icon: IoPawOutline,
      },
    ],
  },
  {
    title: "Ventas",
    subTitle: "Módulo de ventas",
    Icon: MdPointOfSale,
    children: [
      {
        title: "Clientes",
        subTitle: "Registrar y consultar",
        href: "/dashboard/customer",
        Icon: CiUser,
      },
      {
        title: "Ordenes de venta",
        subTitle: "Detalles y estado",
        href: "/dashboard/selling",
        Icon: IoPawOutline,
      },
      {
        title: "Pagos recibidos",
        subTitle: "Detalles",
        href: "/dashboard/paymentReceived",
        Icon: IoPawOutline,
      },
      {
        title: "Envíos",
        subTitle: "Seguimiento de envíos",
        href: "/dashboard/shipments",
        Icon: IoPawOutline,
      },
    ],
  },
];

export const SideMenu = () => {
  const loginUser = useAuthStore((state) => state.user?.username);
  const isAdmin = useIsAdmin();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón para móvil/tablet */}
      {!open && (
        <button
          className="md:hidden fixed top-5 right-5 z-50 inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-secondary"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Abrir menú</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-primary text-white overflow-y-auto transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:block`}
      >
        <div className="my-4 px-6">
          <h1 className="text-lg md:text-2xl font-bold text-white">
            GusanitoLector
            <span className="text-secondary text-xs">
              {" "}
              Sistema de inventario
            </span>
            .
          </h1>
          <p className="text-white/90 text-sm">
            Gestión de inventario, compra y venta
          </p>
        </div>

        <div className="px-6 py-10">
          <p className="text-secondary">Bienvenido,</p>
          <div className="inline-flex space-x-2 items-center">
            <img
              className="rounded-full w-8 h-8"
              src={
                isAdmin
                  ? "https://avatar.iran.liara.run/public/4"
                  : "https://avatar.iran.liara.run/public/100"
              }
            />
            <span className="text-sm md:text-base font-bold">{loginUser}</span>
          </div>
        </div>

        <nav className="w-full px-6">
          {menuItems.map((item, index) => (
            <SideMenuItem
              key={`${item.href ?? item.title}-${index}`}
              {...item}
            />
          ))}
          <LogoutButton />
        </nav>
      </aside>

      {/* Overlay para cerrar menú en móvil */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-30 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};
