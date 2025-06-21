import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li><NavLink to="/clientes">Clientes</NavLink></li>
                    <li><NavLink to="/productos">Productos</NavLink></li>
                    <li><NavLink to="/ventas">Ventas</NavLink></li>
                </ul>
            </nav>
            <main>
                <Outlet /> {/* Aquí se renderizarán las páginas */}
            </main>
        </>
    );
};

export default Layout;