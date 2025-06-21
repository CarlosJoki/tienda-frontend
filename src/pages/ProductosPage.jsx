import { useState, useEffect } from 'react';
import { getAllProductos, createProducto, updateProducto, deleteProducto } from '../api/productoService';
import ProductoForm from '../components/ProductoForm';
import Modal from '../components/Modal';
import Alert from '../components/Alert';

const ProductosPage = () => {
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [productoActual, setProductoActual] = useState(null);
    const [mensaje, setMensaje] = useState({ text: '', type: '' });
    
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [productoToDelete, setProductoToDelete] = useState(null);

    const fetchProductos = async () => {
        try {
            const response = await getAllProductos();
            setProductos(response.data);
        } catch (error) {
            setMensaje({ text: `Error al cargar productos: ${error.message}`, type: 'error' });
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    useEffect(() => {
        const results = productos.filter(producto =>
            producto.cod_producto.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProductos(results);
    }, [searchTerm, productos]);

    const handleFormSubmit = async (producto) => {
        try {
            if (productoActual) {
                await updateProducto(productoActual.cod_producto, producto);
                setMensaje({ text: 'Producto actualizado con éxito!', type: 'success' });
            } else {
                await createProducto(producto);
                setMensaje({ text: 'Producto creado con éxito!', type: 'success' });
            }
            fetchProductos();
            closeFormModal();
        } catch (error) {
            setMensaje({ text: `Error: ${error.response?.data?.message || error.message}`, type: 'error' });
        }
    };

    const handleOpenCreateForm = () => {
        setProductoActual(null);
        setIsFormModalOpen(true);
    };

    const handleEditar = (producto) => {
        setProductoActual(producto);
        setIsFormModalOpen(true);
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
        setProductoActual(null);
    };

    const handleEliminar = (codigo) => {
        setProductoToDelete(codigo);
        setIsConfirmModalOpen(true);
    };

    const confirmEliminar = async () => {
        if (productoToDelete) {
            try {
                await deleteProducto(productoToDelete);
                setMensaje({ text: 'Producto eliminado con éxito.', type: 'success' });
                fetchProductos();
            } catch (error) {
                setMensaje({ text: `Error al eliminar: ${error.message}`, type: 'error' });
            } finally {
                setIsConfirmModalOpen(false);
                setProductoToDelete(null);
            }
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
                <h1>Gestión de Productos</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar por Código de Producto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="primary" onClick={handleOpenCreateForm}>Crear Producto</button>
            </div>

            <div className="results-container">
                <h2>Listado de Productos</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Detalle</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProductos.map((p) => (
                                <tr key={p.cod_producto}>
                                    <td>{p.cod_producto}</td>
                                    <td>{p.nombre}</td>
                                    <td>{p.detalle}</td>
                                    <td>S/ {p.precio.toFixed(2)}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="primary" onClick={() => handleEditar(p)}>Editar</button>
                                            <button className="danger" onClick={() => handleEliminar(p.cod_producto)}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isFormModalOpen}
                onClose={closeFormModal}
                title={productoActual ? 'Editar Producto' : 'Crear Nuevo Producto'}
            >
                <ProductoForm 
                    onSubmit={handleFormSubmit} 
                    productoActual={productoActual} 
                    onCancel={closeFormModal} 
                />
            </Modal>

            <Modal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                title="Confirmar Eliminación"
            >
                <p>¿Estás seguro de que deseas eliminar este producto?</p>
                <div className="modal-actions">
                    <button onClick={() => setIsConfirmModalOpen(false)} className="secondary">Cancelar</button>
                    <button onClick={confirmEliminar} className="danger">Confirmar</button>
                </div>
            </Modal>
        </div>
    );
};

export default ProductosPage;