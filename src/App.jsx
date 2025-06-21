import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ClientesPage from './pages/ClientesPage';
import ProductosPage from './pages/ProductosPage';
import VentasPage from './pages/VentasPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Redirigir la ruta raíz a la página de clientes */}
                <Route index element={<Navigate to="/clientes" replace />} />
                
                <Route path="clientes" element={<ClientesPage />} />
                <Route path="productos" element={<ProductosPage />} />
                <Route path="ventas" element={<VentasPage />} />
                
                {/* Puedes añadir una ruta para páginas no encontradas */}
                <Route path="*" element={<h2>Página no encontrada</h2>} />
            </Route>
        </Routes>
    );
}

export default App;