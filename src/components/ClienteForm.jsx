import { useState, useEffect } from 'react';

const ClienteForm = ({ onSubmit, clienteActual, onCancel }) => {
    const [cliente, setCliente] = useState({
        dni: '',
        nombre: '',
        apellidos: '',
        telefono: '',
        direccion: ''
    });

    useEffect(() => {
        if (clienteActual) {
            setCliente(clienteActual);
        } else {
            setCliente({ dni: '', nombre: '', apellidos: '', telefono: '', direccion: '' });
        }
    }, [clienteActual]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(cliente);
    };

    return (
        <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="dni">DNI</label>
                    <input id="dni" type="text" name="dni" placeholder="DNI" value={cliente.dni} onChange={handleChange} required disabled={!!clienteActual} />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input id="nombre" type="text" name="nombre" placeholder="Nombre" value={cliente.nombre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="apellidos">Apellidos</label>
                    <input id="apellidos" type="text" name="apellidos" placeholder="Apellidos" value={cliente.apellidos} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input id="telefono" type="text" name="telefono" placeholder="Teléfono" value={cliente.telefono} onChange={handleChange} />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="direccion">Dirección</label>
                <input id="direccion" type="text" name="direccion" placeholder="Dirección" value={cliente.direccion} onChange={handleChange} />
            </div>
            <div className="modal-actions">
                <button type="button" className="secondary" onClick={onCancel}>Cancelar</button>
                <button type="submit" className="primary">{clienteActual ? 'Actualizar' : 'Guardar'}</button>
            </div>
        </form>
    );
};

export default ClienteForm;