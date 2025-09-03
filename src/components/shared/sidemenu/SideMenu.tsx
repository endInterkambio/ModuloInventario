import type { IconType } from "react-icons";
import { IoSpeedometerOutline, IoPawOutline } from "react-icons/io5";
import { MdOutlineInventory, MdPointOfSale } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import "./SideMenu.css";
import { SideMenuItem } from "./SideMenuItem";
import { LogoutButton } from "@components/LogoutButton";

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
    ],
  },
];

export const SideMenu = () => {
  return (
    <div
      id="menu"
      className="bg-gray-900 min-h-screen z-10 text-slate-300 w-80 left-0 overflow-y-scroll"
    >
      <div id="logo" className="my-4 px-6">
        {/* Title */}
        <h1 className="text-lg md:text-2xl font-bold text-white">
          GusanitoLector
          <span className="text-blue-500 text-xs"> Sistema de inventario</span>.
        </h1>
        <p className="text-slate-500 text-sm">
          Gestión de inventario, compra y venta
        </p>
      </div>

      {/*  Profile */}
      <div id="profile" className="px-6 py-10">
        <p className="text-slate-500">Bienvenido,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            <img
              className="rounded-full w-8 h-8"
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
              alt=""
            />
          </span>
          <span className="text-sm md:text-base font-bold">Enmanuel Nava</span>
        </a>
      </div>

      {/* Menu Items */}
      <nav id="nav" className="w-full px-6">
        {menuItems.map((item, index) => (
          <SideMenuItem
            key={`${item.href ?? item.title}-${index}`} // key única
            {...item}
          />
        ))}

        {/* Logout */}
        <LogoutButton />
      </nav>
    </div>
  );
};
