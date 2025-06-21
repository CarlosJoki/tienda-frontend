import { useState, useEffect } from 'react';
import { registerVenta, getAllVentas } from '../api/ventaService';
import VentaForm from '../components/VentaForm';
import Alert from '../components/Alert';
import Modal from '../components/Modal';

const VentasPage = () => {
    const [ventas, setVentas] = useState([]);
    const [filteredVentas, setFilteredVentas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [mensaje, setMensaje] = useState({ text: '', type: '' });
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const fetchVentas = async () => {
        try {
            const response = await getAllVentas();
            setVentas(response.data);
        } catch (error) {
            setMensaje({ text: `Error al cargar las ventas: ${error.message}`, type: 'error' });
        }
    };

    useEffect(() => {
        fetchVentas();
    }, []);

    useEffect(() => {
        const results = ventas.filter(venta =>
            String(venta.cod_venta).toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVentas(results);
    }, [searchTerm, ventas]);

    const handleFormSubmit = async (venta) => {
        try {
            await registerVenta(venta);
            setMensaje({ text: 'Venta registrada con éxito!', type: 'success' });
            fetchVentas();
            setIsFormModalOpen(false);
        } catch (error) {
            setMensaje({ text: `Error al registrar la venta: ${error.response?.data?.message || error.message}`, type: 'error' });
        }
    };

    return (
        <div>
            <Alert 
                message={mensaje.text} 
                type={mensaje.type} 
                onClose={() => setMensaje({ text: '', type: '' })} 
            />
            <div className="page-header">
                <h1>Gestión de Ventas</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar por Código de Venta..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="primary" onClick={() => setIsFormModalOpen(true)}>Registrar Venta</button>
            </div>

            <div className="results-container">
                <h2>Historial de Ventas</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Código Venta</th>
                                <th>DNI Cliente</th>
                                <th>Código Producto</th>
                                <th>Cantidad</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVentas.map((venta) => (
                                <tr key={venta.cod_venta}>
                                    <td>{venta.cod_venta}</td>
                                    <td>{venta.dni}</td>
                                    <td>{venta.cod_producto}</td>
                                    <td>{venta.cantidad}</td>
                                    <td>{new Date(venta.fecha).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                title="Registrar Nueva Venta"
            >
                <VentaForm 
                    onSubmit={handleFormSubmit} 
                    onCancel={() => setIsFormModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default VentasPage;