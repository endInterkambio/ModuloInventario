import { WhiteCard } from "../../components";
import { MdOutlineInventory, MdPointOfSale } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { GrCatalog } from "react-icons/gr";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <p>
        Visualiza y gestiona de manera centralizada el inventario, compras y
        ventas de tu librería, obteniendo información clara y en tiempo real
      </p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Link to={"inventory"}>
          <WhiteCard centered className="hover:bg-amber-200">
            <MdOutlineInventory size={50} className="text-[--color-primary]" />
            <h2>Listado y detalle de libros</h2>
            <p className="pt-4">
              Visualiza los libros existentes y su detalle, edita y elimina
              información relacionada al libro asi como sus precios, reemplaza
              su portada y realiza búsquedas personalizadas .
            </p>
          </WhiteCard>
        </Link>

        <Link to={"selling"}>
          <WhiteCard centered className="hover:bg-amber-200">
            <MdPointOfSale size={50} className="text-[--color-primary]" />
            <h2>Ventas</h2>
            <p className="pt-4">
              Supervisa las ventas realizadas, analiza tendencias y mantén un
              registro completo de transacciones y clientes.
            </p>
          </WhiteCard>
        </Link>

        <Link to={"purchase"}>
          <WhiteCard centered className="hover:bg-amber-200">
            <BiPurchaseTag size={50} className="text-[--color-primary]" />
            <h2>Compras</h2>
            <p className="pt-4">
              Gestiona las adquisiciones de libros, registra proveedores,
              ordenes de compra y controla costos de manera eficiente.
            </p>
          </WhiteCard>
        </Link>
        <Link to={"https://gusanitolector.pe/catalog-generator/"} target="_blank" >
          <WhiteCard centered className="hover:bg-amber-200">
            <GrCatalog size={50} className="text-[--color-primary]" />
            <h2>Generador de catálogo de libros</h2>
            <p className="pt-4">
              Accede al generador de catálogo de libros con stock existente con
              búsqueda y filtrado personalizado
            </p>
          </WhiteCard>
        </Link>
      </div>
    </>
  );
};
