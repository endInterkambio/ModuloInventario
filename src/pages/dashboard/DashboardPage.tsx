import { IoAccessibilityOutline, IoListOutline, IoPawOutline } from 'react-icons/io5';
import { WhiteCard } from '../../components';

export const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <p>Información colectiva de varios stores de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <WhiteCard centered>
          <IoPawOutline size={ 50 } className="text-indigo-600" />
          <h2>Inventario</h2>
          <p>Información</p>
        </WhiteCard>


        <WhiteCard centered>
          <IoAccessibilityOutline size={ 50 } className="text-indigo-600" />
          <h2>Compras</h2>
          <p>Información</p>
        </WhiteCard>


        <WhiteCard centered>
          <IoListOutline size={ 50 } className="text-indigo-600" />
          <h2>Ventas</h2>
          <p>Información</p>
        </WhiteCard>

      </div>

    </>
  );
};