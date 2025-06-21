import { useState } from 'react';

const VentaForm = ({ onSubmit, onCancel }) => {
    const [venta, setVenta] = useState({
        dni: '',
        cod_producto: '',
        cantidad: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVenta({ ...venta, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...venta, cantidad: parseInt(venta.cantidad, 10) });
    };

    return (
        <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
                <label htmlFor="dni">DNI del Cliente</label>
                <input id="dni" type="text" name="dni" placeholder="DNI del Cliente" value={venta.dni} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="cod_producto">Código del Producto</label>
                <input id="cod_producto" type="text" name="cod_producto" placeholder="Código del Producto" value={venta.cod_producto} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="cantidad">Cantidad</label>
                <input id="cantidad" type="number" name="cantidad" placeholder="Cantidad" value={venta.cantidad} onChange={handleChange} required min="1" />
            </div>
            <div className="modal-actions">
                 <button type="button" className="secondary" onClick={onCancel}>Cancelar</button>
                 <button type="submit" className="primary">Registrar Venta</button>
            </div>
        </form>
    );
};

export default VentaForm;