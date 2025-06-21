import { useState, useEffect } from 'react';
import { getAllClientes, createCliente, updateCliente, deleteCliente } from '../api/clienteService';
import ClienteForm from '../components/ClienteForm';
import Modal from '../components/Modal';
import Alert from '../components/Alert';

const ClientesPage = () => {
    const [clientes, setClientes] = useState([]);
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [clienteActual, setClienteActual] = useState(null);
    const [mensaje, setMensaje] = useState({ text: '', type: '' });

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [clienteToDelete, setClienteToDelete] = useState(null);

    const fetchClientes = async () => {
        try {
            const response = await getAllClientes();
            setClientes(response.data);
        } catch (error) {
            setMensaje({ text: `Error al cargar clientes: ${error.message}`, type: 'error' });
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    useEffect(() => {
        const results = clientes.filter(cliente =>
            cliente.dni.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredClientes(results);
    }, [searchTerm, clientes]);

    const handleFormSubmit = async (cliente) => {
        try {
            if (clienteActual) {
                await updateCliente(clienteActual.dni, cliente);
                setMensaje({ text: 'Cliente actualizado con éxito!', type: 'success' });
            } else {
                await createCliente(cliente);
                setMensaje({ text: 'Cliente creado con éxito!', type: 'success' });
            }
            fetchClientes();
            closeFormModal();
        } catch (error) {
            setMensaje({ text: `Error: ${error.response?.data?.message || error.message}`, type: 'error' });
        }
    };

    const handleOpenCreateForm = () => {
        setClienteActual(null);
        setIsFormModalOpen(true);
    };

    const handleEditar = (cliente) => {
        setClienteActual(cliente);
        setIsFormModalOpen(true);
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
        setClienteActual(null);
    };

    const handleEliminar = (dni) => {
        setClienteToDelete(dni);
        setIsConfirmModalOpen(true);
    };

    const confirmEliminar = async () => {
        if (clienteToDelete) {
            try {
                await deleteCliente(clienteToDelete);
                setMensaje({ text: 'Cliente eliminado con éxito.', type: 'success' });
                fetchClientes();
            } catch (error) {
                setMensaje({ text: `Error al eliminar: ${error.message}`, type: 'error' });
            } finally {
                setIsConfirmModalOpen(false);
                setClienteToDelete(null);
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
                <h1>Gestión de Clientes</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar por DNI..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="primary" onClick={handleOpenCreateForm}>Crear Cliente</button>
            </div>

            <div className="results-container">
                <h2>Listado de Clientes</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>DNI</th>
                                <th>Nombre Completo</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClientes.map((c) => (
                                <tr key={c.dni}>
                                    <td>{c.dni}</td>
                                    <td>{`${c.nombre} ${c.apellidos}`}</td>
                                    <td>{c.telefono}</td>
                                    <td>{c.direccion}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="primary" onClick={() => handleEditar(c)}>Editar</button>
                                            <button className="danger" onClick={() => handleEliminar(c.dni)}>Eliminar</button>
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
                title={clienteActual ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
            >
                <ClienteForm 
                    onSubmit={handleFormSubmit} 
                    clienteActual={clienteActual} 
                    onCancel={closeFormModal} 
                />
            </Modal>

            <Modal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                title="Confirmar Eliminación"
            >
                <p>¿Estás seguro de que deseas eliminar este cliente?</p>
                <div className="modal-actions">
                    <button onClick={() => setIsConfirmModalOpen(false)} className="secondary">Cancelar</button>
                    <button onClick={confirmEliminar} className="danger">Confirmar</button>
                </div>
            </Modal>
        </div>
    );
};

export default ClientesPage;